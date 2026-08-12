import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/yakimel-icon.png" alt="Yakimel Empire" width={36} height={32} />
          <span className="font-display font-bold text-lg text-ink-invert tracking-tight">
            YAKIMEL EMPIRE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-dim-invert">
          <Link href="/#products" className="hover:text-ink-invert transition-colors">Products</Link>
          <Link href="/faq" className="hover:text-ink-invert transition-colors">FAQ</Link>
          <Link href="/#contact" className="hover:text-ink-invert transition-colors">Contact</Link>
        </nav>

        <Link href="/#products" className="bg-brand text-white font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-brand-dark transition-colors">
          View Products
        </Link>
      </div>
    </header>
  );
}