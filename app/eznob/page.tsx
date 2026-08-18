import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Website Design & Development",
    description: "Business websites, corporate sites, e-commerce, landing pages, and responsive design.",
    type: "Website",
  },
  {
    title: "App Design & Development",
    description: "iOS, Android, web apps, marketplace apps, and business applications.",
    type: "Mobile App",
  },
  {
    title: "Custom Software Development",
    description: "Software built specifically around a business's unique needs.",
    type: "Custom Software",
  },
  {
    title: "Database & Backend Development",
    description: "Database architecture, APIs, backend systems, and secure data storage.",
    type: "Custom Software",
  },
  {
    title: "Cloud Solutions",
    description: "Cloud deployment, hosting setup, storage, backups, and server configuration.",
    type: "Custom Software",
  },
  {
    title: "AI Integration & Automation",
    description: "AI assistants, chatbots, workflow automation, and AI features for apps.",
    type: "Custom Software",
  },
  {
    title: "UI/UX Design",
    description: "App interfaces, website interfaces, prototypes, wireframes, and dashboards.",
    type: "Other",
  },
  {
    title: "API & System Integration",
    description: "Connecting applications with other platforms and services through APIs.",
    type: "Custom Software",
  },
  {
    title: "Business Management Systems",
    description: "Employee portals, client portals, inventory systems, and appointment systems.",
    type: "Custom Software",
  },
  {
    title: "E-Commerce Development",
    description: "Online stores, checkout systems, seller dashboards, and product management.",
    type: "E-commerce Website",
  },
  {
    title: "Application Security",
    description: "Authentication, permissions, role-based access, and security configuration.",
    type: "Custom Software",
  },
  {
    title: "Website & App Maintenance",
    description: "Updates, bug fixes, performance optimization, and ongoing technical support.",
    type: "Website",
  },
];

export default function EznobPage() {
  return (
    <main className="bg-bg-dark text-ink-invert min-h-screen">
      <section
        className="relative pt-40 pb-24 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/eznob-banner.png')" }}
      >
        <div className="absolute inset-0 bg-bg-dark/60" />

        <div className="relative mx-auto max-w-6xl">
          <Link href="/#products" className="font-mono text-xs uppercase tracking-widest text-brand hover:opacity-80 transition-opacity">
            Back to home
          </Link>

          <div className="mt-10 mb-8">
            <Image src="/eznob-logo.png" alt="EZNOB" width={900} height={225} className="h-32 md:h-48 w-auto" />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">
            Technology Development Department
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 max-w-3xl text-ink-invert">
            The team behind every website and app we build for clients
          </h1>
          <p className="text-dim-invert text-lg max-w-2xl leading-relaxed">
            EZNOB is the technology development department of Yakimel Empire LLC, responsible for designing and building websites and applications for individuals, entrepreneurs, startups, and businesses.
          </p>
        </div>
      </section>

      <section className="bg-white text-ink py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
            What We Build
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
            Full range of services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="border border-slate-200 rounded-2xl p-6 flex flex-col">
                <h3 className="font-display font-bold text-lg mb-2 text-ink">
                  {s.title}
                </h3>
                <p className="text-dim text-sm leading-relaxed mb-5 flex-1">
                  {s.description}
                </p>
                <Link
                  href={`/consultation?type=${encodeURIComponent(s.type)}&service=${encodeURIComponent(s.title)}`}
                  className="font-mono text-xs uppercase tracking-widest text-brand hover:text-brand-dark transition-colors"
                >
                  Request Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand mb-3">
            Part of Yakimel Empire LLC
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4 text-ink">
            One company, two sides
          </h2>
          <p className="text-dim leading-relaxed">
            While Yakimel Empire develops and owns its own technology products, EZNOB is the department dedicated to building websites and applications for outside clients, bringing the same standard of quality to every project.
          </p>
        </div>
      </section>
    </main>
  );
}