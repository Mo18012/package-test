export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background/60 text-foreground transition-colors">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-6">Webtonative Package Testing</h1>
        <p className="text-lg max-w-2xl mb-8 text-gray-400">
          A modern web experience designed with React + Tailwind CSS. Fast,
          responsive, and beautiful by default.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-foreground text-foreground font-semibold hover:bg-foreground hover:text-background transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
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
        <button className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold shadow-md hover:opacity-80 transition">
          Start Free Trial
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-700">
        <p className="text-gray-500">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
