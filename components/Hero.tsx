export default function Hero() {
  return (
    <section
      className="relative pt-40 pb-28 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="absolute inset-0 bg-bg-dark/80" />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-6">
          Solo Built. Multi Product.
        </p>

        <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight max-w-3xl text-ink-invert">
          Building the technology of tomorrow.
        </h1>

        <p className="mt-6 max-w-xl text-dim-invert text-lg leading-relaxed">
          Yakimel Empire LLC designs, builds, and operates a portfolio of SaaS and marketplace platforms, end to end, from a single desk in USA, New York.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#products" className="bg-brand text-white font-medium px-7 py-3 rounded-full hover:bg-brand-dark transition-colors">
            Explore Our Products
          </a>
          <a href="#about" className="border border-white/20 text-ink-invert px-7 py-3 rounded-full hover:border-white/40 transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}