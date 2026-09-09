"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { usePrefersReducedMotion } from "../hooks/useHeroEffects";

export default function IntroSequence() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const barTrackRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("yakimel-intro-seen");
    if (alreadySeen) {
      setDone(true);
      return;
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    if (reducedMotion) {
      sessionStorage.setItem("yakimel-intro-seen", "1");
      setDone(true);
      return;
    }

    const percentObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("yakimel-intro-seen", "1");
        setDone(true);
      },
    });

    tl.set(nameRef.current, { opacity: 0, y: 8 })
      .set(statusRef.current, { opacity: 0 })
      .set(barFillRef.current, { scaleX: 0 })
      .set(logoRef.current, { opacity: 0, filter: "blur(14px)" })
      .set(taglineRef.current, { opacity: 0, y: 10 })

      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(statusRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(
        barFillRef.current,
        { scaleX: 1, duration: 1.4, ease: "power1.inOut" },
        "-=0.1"
      )
      .to(
        percentObj,
        {
          value: 100,
          duration: 1.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(percentObj.value)}%`;
            }
          },
        },
        "<"
      )
      .to([nameRef.current, statusRef.current, barTrackRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        logoRef.current,
        { opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
        "-=0.1"
      )
      .fromTo(
        sweepRef.current,
        { xPercent: -120 },
        { xPercent: 120, duration: 1, ease: "power2.inOut" },
        "-=0.6"
      )
      .to(
        taglineRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .to(containerRef.current, { opacity: 0, duration: 0.6, ease: "power2.in" }, "+=0.6");
  }, [show, reducedMotion]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <div ref={nameRef} className="mb-4 font-mono text-xs tracking-[0.3em] text-[#eef1f6]">
        YAKIMEL EMPIRE LLC
      </div>

      <div ref={statusRef} className="mb-8 font-mono text-[10px] tracking-[0.25em] text-[#7f93b8]">
        INITIALIZING DIGITAL ECOSYSTEM
      </div>

      <div ref={barTrackRef} className="mb-3 h-px w-56 overflow-hidden bg-[#1b2436]">
        <div
          ref={barFillRef}
          className="h-full w-full origin-left bg-[#4d8dff]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div ref={percentRef} className="mb-16 font-mono text-[10px] text-[#4d8dff]">
        0%
      </div>

      <div ref={logoRef} className="relative">
        <Image
          src="/yakimel-logo-full.png"
          alt="Yakimel Empire LLC"
          width={220}
          height={80}
          className="h-auto w-[180px] md:w-[220px]"
          priority
        />
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 40%, rgba(77,141,255,0.5) 50%, transparent 60%)",
          }}
        />
      </div>

      <div
        ref={taglineRef}
        className="mt-8 font-mono text-[11px] tracking-[0.3em] text-[#a2adc4]"
      >
        TECHNOLOGY. INNOVATION. FUTURE.
      </div>
    </div>
  );
}