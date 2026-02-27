"use client";

import { useEffect, useState } from "react";

export function StarsBackground() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const update = () => {
      ticking = false;
      // On cache les étoiles dès que la section "Pour qui ?" est dépassée (fin de la section),
      // pour ne plus en voir ni dans "La méthode Nova" ni dans "Présentation du coach"
      const sectionLimit = document.getElementById("pour-qui");
      if (!sectionLimit) return;
      const rect = sectionLimit.getBoundingClientRect();
      const pastLimit = rect.bottom < 0;
      setVisible(!pastLimit);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="nova-stars"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease-out",
      }}
      aria-hidden
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} className="nova-star" />
      ))}
    </div>
  );
}
