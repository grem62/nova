"use client";

import { useEffect, useRef } from "react";

type PointerRef = {
  current: { x: number; y: number };
};

export function useMouseInertia(strength = 0.12): PointerRef {
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      target.current.x = x;
      target.current.y = y;
    }

    window.addEventListener("pointermove", handleMove);

    let frame: number;
    const loop = () => {
      pointer.current.x += (target.current.x - pointer.current.x) * strength;
      pointer.current.y += (target.current.y - pointer.current.y) * strength;
      frame = window.requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return pointer;
}

