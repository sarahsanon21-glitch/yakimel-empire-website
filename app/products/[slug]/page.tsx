import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <section
        className="relative pt-40 pb-20 px-6 bg-cover bg-center text-ink-invert"
        style={
          product.heroImage
            ? { backgroundImage: `url('${product.heroImage}')` }
            : undefined
        }
      >
        {product.heroImage ? (
          <div className="absolute inset-0 bg-bg-dark/85" />
        ) : (
          <div className="absolute inset-0 bg-bg-dark" />
        )}

        <div className="relative mx-auto max-w-4xl">
          <Link href="/#products" className="font-mono text-xs uppercase tracking-widest text-brand hover:opacity-80 transition-opacity">
            Back to products
          </Link>

          <div className="flex items-center justify-between mt-8 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-brand">
              {product.category}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-dim-invert">
              {product.status}
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
            {product.name}
          </h1>
          <p className="text-dim-invert text-lg leading-relaxed max-w-2xl">
            {product.description}
          </p>

          {product.url && (
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 bg-brand text-white font-medium px-7 py-3 rounded-full hover:bg-brand-dark transition-colors">
              Visit site
            </a>
          )}
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {product.longDescription.map((paragraph, i) => (
            <p key={i} className="text-dim leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {product.sections && (
        <section className="bg-slate-50 py-20 px-6">
          <div className="mx-auto max-w-3xl space-y-16">
            {product.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-5 text-ink">
                  {s.heading}
                </h2>
                <div className="space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-dim leading-relaxed text-lg">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}