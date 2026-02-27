"use client";

import { useEffect, useRef } from "react";

// ViewBox 1000×2000, zone visible screen 16:9 ≈ y: 720–1280
// Deux étoiles filantes qui se croisent horizontalement au milieu de l'écran

const STEPS = 80;

const STARS = [
  {
    // Jaune — entre par la gauche, légèrement en biais vers le bas-droite
    pathD: "M -50 820 C 250 840, 600 960, 1050 990",
    trailColor: "#EEFF00", headColor: "#fffde0", starColor: "#EEFF00",
    outerR: 10, innerR: 4,
    trailRatio: 0.55, scrollOff: 0, scrollMult: 1.0,
    strokeLong: 1.2, strokeShort: 2.8,
  },
  {
    // Blanc — entre par la droite, légèrement en biais vers le bas-gauche
    pathD: "M 1050 1010 C 750 1030, 400 1120, -50 1150",
    trailColor: "#c8d8f0", headColor: "#ffffff", starColor: "#e8f0ff",
    outerR: 8, innerR: 3.2,
    trailRatio: 0.55, scrollOff: 0.05, scrollMult: 0.95,
    strokeLong: 0.9, strokeShort: 2.0,
  },
];

function getStarPoints(outerR: number, innerR: number) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

export function StarsDivider() {
  const wrapRef     = useRef<HTMLDivElement | null>(null);
  const svgRef      = useRef<SVGSVGElement | null>(null);
  const pathRefs    = useRef<(SVGPathElement | null)[]>(STARS.map(() => null));
  const starRefs    = useRef<(SVGGElement | null)[]>(STARS.map(() => null));
  // 5 traînes par étoile : index = si * 5 + ti
  const trailLong   = useRef<(SVGPolylineElement | null)[]>(new Array(STARS.length * 5).fill(null));
  const trailShort  = useRef<(SVGPolylineElement | null)[]>(new Array(STARS.length * 5).fill(null));

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg  = svgRef.current;
    if (!wrap || !svg) return;

    const paths     = pathRefs.current;
    const totalLens = paths.map((p) => p?.getTotalLength() ?? 1);

    // Visibilité : le SVG fixe n'apparaît que quand le spacer est à l'écran
    const obs = new IntersectionObserver(
      ([entry]) => { svg.style.opacity = entry.isIntersecting ? "1" : "0"; },
      { threshold: 0 }
    );
    obs.observe(wrap);

    const handleScroll = () => {
      const rect     = wrap.getBoundingClientRect();
      const wrapH    = wrap.offsetHeight;
      const raw      = 1 - (rect.top + wrapH) / (window.innerHeight + wrapH);
      const baseProg = Math.min(1, Math.max(0, raw));

      STARS.forEach((cfg, si) => {
        const path     = paths[si];
        const totalLen = totalLens[si];
        if (!path) return;

        const progress  = Math.min(1, Math.max(0, (baseProg - cfg.scrollOff) * cfg.scrollMult));
        const startProg = Math.max(0, progress - cfg.trailRatio);

        // Collecter les points de la traîne
        const pts: { x: number; y: number; a: number }[] = [];
        for (let s = 0; s <= STEPS; s++) {
          const t  = startProg + (s / STEPS) * (progress - startProg);
          const pt = path.getPointAtLength(t * totalLen);
          pts.push({ x: pt.x, y: pt.y, a: 0 });
        }
        // Calculer les angles
        pts.forEach((pt, i) => {
          const prev = pts[Math.max(0, i - 1)];
          const next = pts[Math.min(STEPS, i + 1)];
          pt.a = Math.atan2(next.y - prev.y, next.x - prev.x);
        });

        // 5 traînes autour de la trajectoire
        const shortStart = Math.floor(STEPS * 0.60);
        for (let ti = 0; ti < 5; ti++) {
          const offset = ti * (2 * Math.PI / 5);
          const toPoint = (p: { x: number; y: number; a: number }) => {
            const r  = cfg.outerR * 0.6;
            const px = p.x + r * Math.cos(p.a + offset);
            const py = p.y + r * Math.sin(p.a + offset);
            return `${px.toFixed(1)},${py.toFixed(1)}`;
          };
          const li       = si * 5 + ti;
          const allPts   = pts.map(toPoint).join(" ");
          const shortPts = pts.slice(shortStart).map(toPoint).join(" ");
          trailLong.current[li]?.setAttribute("points", allPts);
          trailShort.current[li]?.setAttribute("points", shortPts);
        }

        // Tête de l'étoile
        const head = pts[pts.length - 1];
        const grp  = starRefs.current[si];
        if (head && grp) {
          const deg = head.a * (180 / Math.PI);
          grp.setAttribute("transform",
            `translate(${head.x.toFixed(1)},${head.y.toFixed(1)}) rotate(${(deg + 90).toFixed(1)})`
          );
          grp.style.opacity = progress > 0.02 ? "1" : "0";
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); obs.disconnect(); };
  }, []);

  return (
    <>
      {/* Spacer invisible — mesure le scroll */}
      <div ref={wrapRef} style={{ height: "40vh", minHeight: "200px", pointerEvents: "none" }} />

      {/* SVG fixe au-dessus de tout */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 2000"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
          zIndex: 35,
          opacity: 0,
          transition: "opacity 0.5s ease",
          mixBlendMode: "screen",
        }}
      >
        <defs>
          <filter id="sd-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sd-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Paths de référence invisibles */}
        {STARS.map((cfg, si) => (
          <path key={si} ref={(el) => { pathRefs.current[si] = el; }}
            d={cfg.pathD} fill="none" stroke="transparent" />
        ))}

        {/* 5 traînes longues par étoile */}
        {STARS.map((cfg, si) =>
          [0,1,2,3,4].map((ti) => (
            <polyline key={`long-${si}-${ti}`}
              ref={(el) => { trailLong.current[si * 5 + ti] = el; }}
              fill="none" stroke={cfg.trailColor}
              strokeWidth={cfg.strokeLong} strokeLinecap="round" strokeLinejoin="round"
              opacity="0.22"
            />
          ))
        )}

        {/* 5 traînes courtes brillantes par étoile */}
        {STARS.map((cfg, si) =>
          [0,1,2,3,4].map((ti) => (
            <polyline key={`short-${si}-${ti}`}
              ref={(el) => { trailShort.current[si * 5 + ti] = el; }}
              fill="none" stroke={cfg.headColor}
              strokeWidth={cfg.strokeShort} strokeLinecap="round" strokeLinejoin="round"
              opacity="0.90" filter="url(#sd-soft)"
            />
          ))
        )}

        {/* Têtes d'étoiles */}
        {STARS.map((cfg, si) => (
          <g key={`star-${si}`} ref={(el) => { starRefs.current[si] = el; }}
            style={{ opacity: 0 }}>
            <polygon points={getStarPoints(cfg.outerR, cfg.innerR)}
              fill={cfg.starColor} filter="url(#sd-glow)" opacity="0.9" />
          </g>
        ))}
      </svg>
    </>
  );
}
