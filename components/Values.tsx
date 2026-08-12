const values = [
  { name: "Innovation", description: "We continuously seek new ways to solve problems and create value." },
  { name: "Excellence", description: "We strive for high standards in the design, development, and execution of our projects." },
  { name: "Integrity", description: "We build our relationships on trust, transparency, accountability, and respect." },
  { name: "Agility", description: "In a constantly evolving technological environment, we remain ready to learn, adapt, and evolve." },
  { name: "Impact", description: "Our ambition is not simply to create technology, but to create technology that matters." },
];

export default function Values() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
          Our Values
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-ink">
          What guides our work
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {values.map((v) => (
            <div key={v.name}>
              <h3 className="font-display font-bold text-lg mb-2 text-ink">
                {v.name}
              </h3>
              <p className="text-dim text-sm leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}