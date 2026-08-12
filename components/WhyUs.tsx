const reasons = [
  { title: "An Ambitious Vision", description: "We think long-term and seek to build solutions that can evolve with their environment." },
  { title: "A Technology-Driven Culture", description: "Technology is at the heart of our strategy, innovation, and growth." },
  { title: "A Results-Oriented Approach", description: "We focus on turning ideas into tangible and measurable solutions." },
  { title: "A Global Perspective", description: "Our ambition goes beyond borders and is built around the global technology market." },
  { title: "Built to Evolve", description: "We are building a company capable of growing alongside technologies, markets, and the opportunities of tomorrow." },
];

export default function WhyUs() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
          Why Yakimel Empire LLC
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-ink">
          What sets us apart
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {reasons.map((r) => (
            <div key={r.title} className="border-b border-slate-200 pb-6">
              <h3 className="font-display font-bold text-lg mb-2 text-ink">
                {r.title}
              </h3>
              <p className="text-dim text-sm leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}