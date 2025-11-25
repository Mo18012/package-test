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
  const scrollPositionRef = useRef<number>(0)

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
    const scrollY = window.scrollY
    
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    // Add touch event listeners to prevent scroll
    const preventScroll = (e: TouchEvent) => {
      // Allow scrolling within the drawer
      if (divRef.current && divRef.current.contains(e.target as Node)) {
        return
      }
      // Prevent scrolling on background
      e.preventDefault()
    }

    // Use passive: false to allow preventDefault
    document.addEventListener('touchmove', preventScroll, { passive: false })
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    const openDrawer = async () => {
      await new Promise(res => setTimeout(res, 10))
      setIsOpen(true)
    }
    openDrawer()

    return () => {
      // Restore scroll position and body styles
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.style.overflow = ''
      window.scrollTo(0, scrollPositionRef.current)

      document.removeEventListener('touchmove', preventScroll)
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
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
        }}
      ></div>

      <div
        ref={divRef}
        className={`fixed inset-x-0 bottom-0 transition-transform duration-300 ${
          Open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          zIndex: zIndex || 30,
        }}
      >
        <div
          className={`bg-white rounded-t-2xl shadow-lg pb-4 overflow-auto ${drawerBodyContainerClassName || ''}`}
        >
          {!hideHeader && (
            <div
              className={`flex justify-between gap-2 items-start border-b px-4 py-4 sticky top-0 bg-white ${
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
            className={`px-4 mt-4 max-h-[80dvh] overflow-auto ${drawerBodyClassName || ''}`}
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Bottom Drawer iOS Fix Demo</h1>
        <p className="mb-4 text-gray-600">
          This drawer prevents background scrolling on iOS when the keyboard is open.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Open Drawer
        </button>

        {/* Background content to demonstrate scroll prevention */}
        <div className="mt-8 space-y-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Content Block {i + 1}</h3>
              <p className="text-gray-600">
                This is background content that should not scroll when the drawer is open and
                keyboard is visible on iOS.
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
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
              placeholder="Enter your message"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              alert('Form submitted!')
              setIsOpen(false)
            }}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </BottomDrawer>
    </div>
  )
}