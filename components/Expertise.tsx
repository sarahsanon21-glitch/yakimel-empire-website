const areas = [
  {
    name: "Software Development",
    description: "We design and develop applications, platforms, and digital systems tailored to specific business and user needs, prioritizing modern architecture, scalability, performance, and user experience.",
  },
  {
    name: "Artificial Intelligence",
    description: "We explore AI applications in automation, data analysis, intelligent assistants, and process optimization, turning AI into practical and valuable solutions.",
  },
  {
    name: "Digital Solutions",
    description: "We develop solutions designed to modernize processes, improve productivity, and create new digital experiences, combining technology, simplicity, and performance.",
  },
  {
    name: "Digital Transformation",
    description: "We support organizations seeking to integrate more technology into their operations, identifying opportunities and contributing to their implementation.",
  },
  {
    name: "Research & Innovation",
    description: "We study emerging technologies, evolving trends, and new digital models in order to identify the opportunities of tomorrow.",
  },
];

export default function Expertise() {
  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
          Our Areas of Expertise
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-ink">
          Where we focus our work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a) => (
            <div key={a.name} className="bg-white rounded-2xl border border-slate-200 p-7">
              <h3 className="font-display font-bold text-lg mb-3 text-ink">
                {a.name}
              </h3>
              <p className="text-dim text-sm leading-relaxed">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}