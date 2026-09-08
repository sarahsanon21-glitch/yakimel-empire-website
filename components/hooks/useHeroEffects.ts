"use client";

import { useEffect, useState } from "react";

/**
 * Mutable store read every frame inside the R3F scene.
 * Deliberately NOT React state — pushing scroll/mouse through
 * setState would re-render the whole tree at 60fps and tank perf.
 */
export const heroState = {
  scrollProgress: 0,   // 0 -> 1 across the pinned hero scroll distance
  introProgress: 0,    // 0 -> 1, driven once by the load-in timeline
  mouse: { x: 0, y: 0 }, // normalized -1 -> 1
  isMobile: false,
  reducedMotion: false,
};

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(mq.matches);
      heroState.reducedMotion = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const narrow = window.innerWidth < breakpoint;
      const mobile = touch && narrow;
      setIsMobile(mobile);
      heroState.isMobile = mobile;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export function useMouseParallax(disabled: boolean) {
  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => {
      heroState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      heroState.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled]);
}