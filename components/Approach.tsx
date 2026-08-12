const steps = [
  {
    number: "01",
    title: "Imagine",
    description: "We begin by understanding the problem, need, or opportunity, and transform ideas into technology-driven concepts.",
  },
  {
    number: "02",
    title: "Develop",
    description: "We turn concepts into solutions, prioritizing quality, agility, security, scalability, and performance.",
  },
  {
    number: "03",
    title: "Deploy",
    description: "We focus on transforming the solutions we develop into operational products and services.",
  },
  {
    number: "04",
    title: "Evolve",
    description: "We continuously improve our solutions to meet evolving user needs and keep pace with technological advancements.",
  },
];

export default function Approach() {
  return (
    <section className="bg-bg-dark text-ink-invert py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
          Our Approach
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-14">
          Imagine. Develop. Deploy. Evolve.
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.number}>
              <div className="font-mono text-brand text-sm mb-3">{s.number}</div>
              <h3 className="font-display font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-dim-invert text-sm leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}