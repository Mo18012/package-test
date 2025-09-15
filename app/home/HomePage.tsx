export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background/60 text-foreground transition-colors">
      <header className="w-full border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="text-xl font-bold">
            <img
              src="https://assets.orufy.com/Frame_3_1_9d0fda8f93_66e90516bc.svg"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-6 text-gray-400">
            <a href="/test" className="hover:text-foreground transition">
              Test
            </a>
            <a href="/frontend" className="hover:text-foreground transition">
              Frontend
            </a>
            <a href="/test" className="hover:text-foreground transition">
              Pricing
            </a>
            <a href="/test" className="hover:text-foreground transition">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <button className="px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-80 transition">
            Sign Up
          </button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-24 pb-16 px-6">
        <h1 className="text-5xl font-bold mb-6">Webtonative Package Testing</h1>
        <p className="text-lg max-w-2xl mb-8 text-gray-400">
          A modern web experience designed with React + Tailwind CSS. Fast,
          responsive, and beautiful by default.
        </p>
        <div className="flex gap-4 justify-center flex-col">
          <div className="flex gap-4 justify-center">
            <a href="/test">
              <button className="px-10 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
                Get Started
              </button>
            </a>
            <a href="/frontend">
              <button className="px-10 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:opacity-80 transition">
                Frontend Demo
              </button>
            </a>
          </div>
          <a target="_blank" href="https://webtonetive.netlify.app">
            <button className="px-10 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:opacity-80 transition">
              Go to html website Demo
            </button>
          </a>
        </div>
        {/* <div className="pt-10">
          <img
            src="/sad-crying-cat-meme.gif"
            alt="Logo"
            width={120}
            height={120}
          />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
        {[
          {
            title: 'Fast Performance',
            desc: 'Optimized for speed and responsiveness.',
          },
          {
            title: 'Modern Stack',
            desc: 'Built with React, Next.js & Tailwind CSS.',
          },
          {
            title: 'Easy Customization',
            desc: 'Flexible and reusable components.',
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-background border border-gray-700 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Call-to-Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 text-gray-400">
          Join thousands of developers building with modern tools.
        </p>
        <div className="flex gap-4 items-center">
          <a href="/Orientation" className=" gap-4">
            <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
              Orientation
            </button>
          </a>
          <a href="/app-open" className=" gap-4">
            <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
              AppOpen
            </button>
          </a>
          <a href="/date" className=" gap-4">
            <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
              Date
            </button>
          </a>
          <a href="/beacon-icon" className=" gap-4">
            <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
              Beacon Icon
            </button>
          </a>
          <a href="/beacon-android" className=" gap-4">
            <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
              Beacon android
            </button>
          </a>
        </div>
        {/* <a href="/test" className=" gap-4">
          <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
            Get Started
          </button>
        </a> */}
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-700">
        <p className="text-gray-500">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
}
