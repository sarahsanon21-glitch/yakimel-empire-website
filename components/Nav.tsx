"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-3">
        <Link href="/" className="hidden md:flex items-center gap-2 min-w-0">
          <Image src="/yakimel-icon.png" alt="Yakimel Empire" width={36} height={32} className="shrink-0 h-8 w-auto" />
          <span className="font-display font-bold text-lg text-ink-invert tracking-tight whitespace-nowrap">
            YAKIMEL EMPIRE
          </span>
        </Link>

        <Link href="/" className="md:hidden flex items-center">
          <Image src="/yakimel-icon.png" alt="Yakimel Empire" width={32} height={30} className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-dim-invert shrink-0">
          <Link href="/#products" className="hover:text-ink-invert transition-colors">Products</Link>
          <Link href="/eznob" className="hover:text-ink-invert transition-colors">Services</Link>
          <Link href="/faq" className="hover:text-ink-invert transition-colors">FAQ</Link>
          <Link href="/#contact" className="hover:text-ink-invert transition-colors">Contact</Link>
        </nav>

        <Link
          href="/#products"
          className="hidden md:inline-block bg-brand text-white font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full hover:bg-brand-dark transition-colors whitespace-nowrap shrink-0"
        >
          View Products
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden shrink-0 text-ink-invert p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-bg-dark px-4 py-6 flex flex-col gap-5">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 mb-2">
            <Image src="/yakimel-icon.png" alt="Yakimel Empire" width={32} height={30} className="h-8 w-auto" />
            <span className="font-display font-bold text-base text-ink-invert tracking-tight">
              YAKIMEL EMPIRE LLC
            </span>
          </Link>

          <Link href="/#products" onClick={() => setMenuOpen(false)} className="font-mono text-xs uppercase tracking-widest text-dim-invert hover:text-ink-invert transition-colors">
            Products
          </Link>
          <Link href="/eznob" onClick={() => setMenuOpen(false)} className="font-mono text-xs uppercase tracking-widest text-dim-invert hover:text-ink-invert transition-colors">
            Services
          </Link>
          <Link href="/faq" onClick={() => setMenuOpen(false)} className="font-mono text-xs uppercase tracking-widest text-dim-invert hover:text-ink-invert transition-colors">
            FAQ
          </Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)} className="font-mono text-xs uppercase tracking-widest text-dim-invert hover:text-ink-invert transition-colors">
            Contact
          </Link>
          <Link
            href="/#products"
            onClick={() => setMenuOpen(false)}
            className="bg-brand text-white text-center font-mono text-xs uppercase tracking-widest px-4 py-3 rounded-full hover:bg-brand-dark transition-colors"
          >
            View Products
          </Link>
        </div>
      )}
    </header>
  );
}