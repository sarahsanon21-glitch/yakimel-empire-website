const outcomes = [
  "Intelligent",
  "Scalable",
  "Secure",
  "Accessible",
  "High-performing",
  "Future-ready",
];

export default function MissionVision() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
            Our Mission
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-5 text-ink">
            Turning Innovation Into Impact
          </h2>
          <p className="text-dim leading-relaxed mb-6">
            Our mission is to develop technologies that address real world needs and create measurable value, combining technological expertise, creativity, and market understanding.
          </p>
          <div className="flex flex-wrap gap-2">
            {outcomes.map((o) => (
              <span key={o} className="font-mono text-xs uppercase tracking-wide text-brand border border-brand/30 rounded-full px-3 py-1">
                {o}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
            Our Vision
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-5 text-ink">
            Becoming a Leading Technology Company
          </h2>
          <p className="text-dim leading-relaxed">
            Yakimel Empire LLC aims to build a technology ecosystem capable of developing and supporting innovative solutions with national and international reach, creating a portfolio of technologies, products, and digital services that make an impact across multiple industries.
          </p>
        </div>
      </div>
    </section>
  );
}