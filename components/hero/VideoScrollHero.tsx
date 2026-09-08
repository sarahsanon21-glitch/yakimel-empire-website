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

export default function VideoScrollHero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showHint, setShowHint] = useState(true);
  const [showText, setShowText] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  useLenis(reducedMotion);

  useEffect(() => {
  const video = videoRef.current;
  if (!video || !pinRef.current) return;

  if (reducedMotion) {
    video.currentTime = video.duration || 0;
    setShowText(true);
    return;
  }

  if (video.readyState >= 1) {
    setVideoReady(true);
  }

  // iOS Safari won't paint a frame from programmatic currentTime changes
  // until playback has actually started once. Nudge it with a silent
  // play/pause so the video "wakes up" and shows its first frame.
  const wakeIOS = () => {
    video.play()
      .then(() => video.pause())
      .catch(() => {
        // Autoplay was blocked — harmless here since we don't need
        // actual playback, only a decoded frame for scrubbing.
      });
  };

  const onLoaded = () => {
    setVideoReady(true);
    wakeIOS();
  };
  video.addEventListener("loadedmetadata", onLoaded);

  // If metadata already loaded (e.g. cached), still nudge it.
  if (video.readyState >= 1) {
    wakeIOS();
  }

  const trigger = ScrollTrigger.create({
    trigger: pinRef.current,
    start: "top top",
    end: "+=250%",
    pin: true,
    scrub: 0.5,
    onUpdate: (self) => {
      setShowHint(self.progress < 0.03);
      setShowText(self.progress > 0.92);
      if (video.duration) {
        video.currentTime = self.progress * video.duration;
      }
    },
  });

  return () => {
    trigger.kill();
    video.removeEventListener("loadedmetadata", onLoaded);
  };
}, [reducedMotion]);

  return (
    <section ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#05070a]">
      <video
        ref={videoRef}
        src="/hero-journey.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay so text stays legible over any bright frame */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {!videoReady && !reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#05070a]">
          <span className="font-mono text-xs tracking-[0.25em] text-[#7f93b8]">Loading…</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHint ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-x-0 top-10 flex flex-col items-center gap-3 text-[#eef1f6]"
      >
        <span className="font-mono text-xs tracking-[0.25em] text-[#7f93b8]">
          YAKIMEL EMPIRE LLC
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm text-[#7f93b8]"
        >
          Scroll to enter ↓
        </motion.span>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-24 flex flex-col items-center px-6 text-center md:bottom-28">
        <h1 className="mb-5 font-display text-[11vw] leading-[0.95] text-[#eef1f6] md:text-[5vw]">
          {["Building", "the digital", "future."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate={showText ? "visible" : "hidden"}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-8 font-mono text-xs tracking-[0.2em] text-[#7f93b8]"
        >
          Web • Apps • Software • AI • Digital Systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="pointer-events-auto flex flex-wrap justify-center gap-4"
        >
          <button className="rounded-full bg-[#e9edf5] px-8 py-3.5 text-sm text-[#05070a] transition-colors hover:bg-white">
            Explore Our Services
          </button>
          <button className="rounded-full border border-[#2c3a52] px-8 py-3.5 text-sm text-[#dfe6f2] transition-colors hover:border-[#4d8dff] hover:text-white">
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}