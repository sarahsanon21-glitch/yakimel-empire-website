import ContactWidget from "@/components/ContactWidget";

export default function Contact() {
  return (
    <section id="contact" className="bg-bg-dark text-ink-invert py-28 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">
          Contact
        </p>
        <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
          Ready to Build What&apos;s Next?
        </h2>
        <p className="text-dim-invert text-lg leading-relaxed mb-10">
          Every great innovation begins with a conversation. Let&apos;s talk technology. Let&apos;s talk innovation. Let&apos;s talk about the future.
        </p>
        <ContactWidget />
      </div>
    </section>
  );
}