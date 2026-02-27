"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  // Prevent multiple registrations in Fast Refresh
  // @ts-expect-error accessing internals
  const alreadyRegistered = gsap.core?.globals()?.ScrollTrigger;
  if (!alreadyRegistered) {
    gsap.registerPlugin(ScrollTrigger);
  }
}

export { gsap, ScrollTrigger };

