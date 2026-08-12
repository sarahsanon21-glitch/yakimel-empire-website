import { faqs } from "@/lib/faqs";

export default function FAQ() {
  const preview = faqs.slice(0, 4);

  return (
    <section className="bg-slate-50 py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
          FAQ
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-ink">
          Common questions
        </h2>

        <div className="space-y-8 mb-10">
          {preview.map((item) => (
            <div key={item.q} className="border-b border-slate-200 pb-6">
              <h3 className="font-display font-bold text-lg mb-2 text-ink">
                {item.q}
              </h3>
              <p className="text-dim leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <a href="/faq" className="inline-block font-mono text-xs uppercase tracking-widest text-brand hover:text-brand-dark transition-colors">
          Learn more
        </a>
      </div>
    </section>
  );
}