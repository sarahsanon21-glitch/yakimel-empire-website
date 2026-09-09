"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePrefersReducedMotion } from "../hooks/useHeroEffects";
import { useLenis } from "../hooks/useLenis";

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function GraphicHero() {
  const [showContent, setShowContent] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  useLenis(reducedMotion);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070a] py-24 md:py-0">
      {/* Ambient glow behind the graphic — pulses gently, matches the image's
          blue tones so the near-black corners of the PNG blend into the page. */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : { opacity: [0.3, 0.5, 0.3], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(77,141,255,0.35) 0%, rgba(30,58,138,0.15) 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-[-5%] bottom-[-10%] h-[40vh] w-[40vh] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 md:min-h-screen md:flex-row md:justify-between md:gap-8 md:px-16">
        {/* Text column */}
        <div className="flex flex-col items-start text-left md:w-[46%]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-5 font-mono text-[11px] tracking-[0.25em] text-[#7f93b8]"
          >
            Yakimel Empire LLC
          </motion.p>

          <h1 className="mb-6 font-display text-[13vw] leading-[0.92] text-[#eef1f6] md:text-[4.4vw]">
            {["Building", "the digital", "future."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate={showContent ? "visible" : "hidden"}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mb-10 max-w-[42ch] text-[15px] leading-relaxed text-[#a2adc4]"
          >
            We create intelligent software, digital platforms, websites,
            applications, and next-generation technology for modern businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <button className="rounded-full bg-[#e9edf5] px-8 py-3.5 text-sm text-[#05070a] transition-colors hover:bg-white">
              Explore Our Solutions
            </button>
            <button className="rounded-full border border-[#2c3a52] px-8 py-3.5 text-sm text-[#dfe6f2] transition-colors hover:border-[#4d8dff] hover:text-white">
              Start Your Project
            </button>
          </motion.div>
        </div>

        {/* Graphic column — shown whole, never cropped, gentle float + fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            showContent
              ? reducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, y: [0, -14, 0] }
              : {}
          }
          transition={{
            opacity: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            y: {
              duration: 5,
              delay: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative w-full max-w-[640px] md:w-[58%]"
        >
          <Image
            src="/hero-graphic.png"
            alt="Yakimel Empire LLC — global technology network"
            width={512}
            height={512}
            priority
            className="h-auto w-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}