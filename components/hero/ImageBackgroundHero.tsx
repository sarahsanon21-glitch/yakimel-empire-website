"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useHeroEffects";
import { useLenis } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function ImageBackgroundHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  useLenis(reducedMotion);

  const state = useRef({ scrollScale: 1, scrollY: 0, mouseX: 0, mouseY: 0 });

  const render = () => {
    if (!imageRef.current) return;
    const { scrollScale, scrollY, mouseX, mouseY } = state.current;
    gsap.set(imageRef.current, {
      scale: scrollScale,
      x: mouseX,
      y: scrollY + mouseY,
    });
  };

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        state.current.scrollScale = 1 + self.progress * 0.15;
        state.current.scrollY = self.progress * 60;
        render();
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(state.current, {
        mouseX: nx * -18,
        mouseY: ny * -14,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: render,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-screen w-full overflow-hidden bg-[#05070a]"
    >
      {/* Base image — always present */}
      <div
        ref={imageRef}
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* Alt image — fades in over the base image on hover */}
      <div
        className="absolute inset-0 h-full w-full transition-opacity duration-700 ease-out"
        style={{
          backgroundImage: "url('/hero-bg-alt.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovering ? 1 : 0,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      <div className="pointer-events-none absolute inset-x-0 bottom-24 flex flex-col items-start px-6 md:px-16 md:bottom-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-5 font-mono text-[11px] tracking-[0.25em] text-[#7f93b8]"
        >
          Yakimel Empire LLC
        </motion.p>

        <h1 className="mb-6 font-display text-[13vw] leading-[0.92] text-[#eef1f6] md:text-[6.2vw]">
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
          className="mb-10 max-w-[38ch] text-[15px] leading-relaxed text-[#a2adc4]"
        >
          We create intelligent software, digital platforms, websites,
          applications, and next-generation technology for modern businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="pointer-events-auto flex flex-wrap gap-4"
        >
          <button className="rounded-full bg-[#e9edf5] px-8 py-3.5 text-sm text-[#05070a] transition-colors hover:bg-white">
            Explore Our Solutions
          </button>
          <button className="rounded-full border border-[#2c3a52] px-8 py-3.5 text-sm text-[#dfe6f2] transition-colors hover:border-[#4d8dff] hover:text-white">
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}