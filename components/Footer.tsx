import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-dim-invert py-16 px-6 border-t border-white/10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <Image src="/yakimel-logo-full.png" alt="Yakimel Empire LLC" width={160} height={160} className="mb-3" />
          <div className="font-mono text-xs">Technology. Innovation. Future.</div>
        </div>

        <div className="font-mono text-xs">
          USA, New York
        </div>

        <div className="font-mono text-xs">
          Yakimel Empire LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}