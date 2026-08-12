import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductGrid() {
  return (
    <section id="products" className="bg-bg py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-widest text-dim mb-3">
          Portfolio
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-12 text-ink">
          Products in the empire
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.slug} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-brand">
                  {p.category}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-dim">
                  {p.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl mb-3 text-ink">
                {p.name}
              </h3>
              <p className="text-dim leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="flex items-center gap-6">
                <Link href={`/products/${p.slug}`} className="font-mono text-xs uppercase tracking-widest text-brand hover:text-brand-dark transition-colors">
                  Learn more
                </Link>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest text-dim hover:text-ink transition-colors">
                    Visit site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}