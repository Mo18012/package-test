"use client"
import { FC, useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

export interface IProfileProps {
  children: React.ReactNode
  isOpen: boolean
  label: string | React.ReactNode
  labelClassName?: string
  onHide: () => void
  hideZindex?: boolean
  hideCross?: boolean
  isHideOnOutsideClick?: boolean
  drawerBodyClassName?: string
  drawerBodyContainerClassName?: string
  zIndex?: number
  headerContainerClassName?: string
  hideHeader?: boolean
}

const BottomDrawer: FC<IProfileProps> = ({
  children,
  isOpen,
  onHide,
  label,
  hideZindex,
  labelClassName,
  hideCross,
  isHideOnOutsideClick,
  drawerBodyClassName,
  drawerBodyContainerClassName,
  zIndex,
  headerContainerClassName,
  hideHeader = false,
}) => {
  const [Open, setIsOpen] = useState<boolean>(false)
  const divRef = useRef<HTMLDivElement>(null)
  const drawerContentRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef<number>(0)
  const isScrollingRef = useRef<boolean>(false)

  const close = async () => {
    setIsOpen(false)
    setTimeout(() => onHide(), 500)
  }

  const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
    if (isHideOnOutsideClick && divRef.current && !divRef.current.contains(e.target as Node)) {
      close()
    }
  }

  useEffect(() => {
    if (!isOpen) return

    // Store current scroll position
    scrollPositionRef.current = window.scrollY

    // Lock body scroll - iOS specific approach
    const body = document.body
    const html = document.documentElement
    const scrollY = window.scrollY
   
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.height = '100vh'
   
    html.style.overflow = 'hidden'
    html.style.height = '100vh'

    // Prevent all scrolling on background
    const preventBackgroundScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement
     
      // If touch is inside the drawer content area, allow it
      if (drawerContentRef.current && drawerContentRef.current.contains(target)) {
        // Check if the content is scrollable
        const scrollableParent = findScrollableParent(target)
        if (scrollableParent) {
          return // Allow scroll within drawer
        }
      }
     
      // Prevent all other scrolling
      e.preventDefault()
      e.stopPropagation()
    }

    // Find if element or its parent is scrollable
    const findScrollableParent = (element: HTMLElement): HTMLElement | null => {
      let current: HTMLElement | null = element
      while (current && current !== document.body) {
        const hasScroll = current.scrollHeight > current.clientHeight
        const overflowY = window.getComputedStyle(current).overflowY
        if (hasScroll && (overflowY === 'auto' || overflowY === 'scroll')) {
          return current
        }
        current = current.parentElement
      }
      return null
    }

    // Handle touch start to track scrolling
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (drawerContentRef.current && drawerContentRef.current.contains(target)) {
        isScrollingRef.current = false
      }
    }

    // Handle touch move to detect scrolling
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (drawerContentRef.current && drawerContentRef.current.contains(target)) {
        isScrollingRef.current = true
      }
    }

    // Use passive: false to allow preventDefault
    document.addEventListener('touchmove', preventBackgroundScroll, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick, { passive: true })

    // Prevent wheel events on background
    const preventWheel = (e: WheelEvent) => {
      if (drawerContentRef.current && !drawerContentRef.current.contains(e.target as Node)) {
        e.preventDefault()
      }
    }
    document.addEventListener('wheel', preventWheel, { passive: false })

    const openDrawer = async () => {
      await new Promise(res => setTimeout(res, 10))
      setIsOpen(true)
    }
    openDrawer()

    return () => {
      // Restore scroll position and body styles
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      body.style.overflow = ''
      body.style.height = ''
     
      html.style.overflow = ''
      html.style.height = ''
     
      window.scrollTo(0, scrollPositionRef.current)

      document.removeEventListener('touchmove', preventBackgroundScroll)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('wheel', preventWheel)
    }
  }, [isOpen, isHideOnOutsideClick])

  if (!isOpen) return null

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          Open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          zIndex: zIndex || 30,
          touchAction: 'none',
        }}
      ></div>

      <div
        ref={divRef}
        className={`fixed inset-x-0 bottom-0 transition-transform duration-300 ${
          Open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          zIndex: zIndex || 30,
          touchAction: 'none',
        }}
      >
        <div
          className={`bg-white rounded-t-2xl shadow-lg ${drawerBodyContainerClassName || ''}`}
          style={{
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!hideHeader && (
            <div
              className={`flex justify-between gap-2 items-start border-b px-4 py-4 flex-shrink-0 bg-white ${
                hideZindex ? "" : "z-50"
              } ${headerContainerClassName || ''}`}
              style={{
                zIndex: zIndex ? zIndex + 20 : hideZindex ? 0 : 50,
              }}
            >
              <div></div>
              <h2 className={`font-medium text-base md:text-2xl ${labelClassName || ''}`}>
                {label}
              </h2>
              {!hideCross ? (
                <button onClick={close} className="p-1">
                  <X size={20} />
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div
            ref={drawerContentRef}
            className={`px-4 py-4 overflow-y-auto flex-1 ${drawerBodyClassName || ''}`}
            style={{
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
              touchAction: 'pan-y',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

// Demo component
export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })

  const handleSubmit = () => {
    alert('Form submitted!\n' + JSON.stringify(formData, null, 2))
    setIsOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">iOS Drawer Fix Demo</h1>
          <p className="mb-4 text-gray-600">
            This drawer prevents background scrolling on iOS when keyboard is open.
            The input fields will stay focused and background won't scroll.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Open Contact Form
          </button>
        </div>

        {/* Background content to demonstrate scroll prevention */}
        <div className="space-y-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Content Block {i + 1}</h3>
              <p className="text-gray-600">
                This is background content that should NOT scroll when the drawer is open
                and keyboard is visible on iOS. Try opening the drawer and clicking on
                any input field - the background should remain fixed.
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomDrawer
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        label="Contact Form"
        isHideOnOutsideClick={true}
      >
        <div className="space-y-4 pb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main St, City, State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Tell us about your inquiry..."
              rows={5}
            />
          </div>
          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
            💡 Tip: On iOS, try clicking any input field. The background should stay fixed
            and your input should remain focused even when the keyboard appears.
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Submit Form
          </button>
        </div>
      </BottomDrawer>
    </div>
  )
}
