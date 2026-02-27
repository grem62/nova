"use client";

export function RunnerBackground() {
  return (
    <div
      id="nova-runner"
      className="pointer-events-none fixed inset-0 z-0 flex items-end justify-center opacity-30"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 120"
        className="h-40 w-56 text-slate-200/60"
        fill="none"
      >
        <defs>
          <linearGradient
            id="runner-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffd84a" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Silhouette stylisée d'un coureur */}
        <path
          d="M86 20c0 6-4 10-10 10s-10-4-10-10 4-10 10-10 10 4 10 10Zm-26 32 8-12c2-3 5-5 9-5h6c4 0 7 2 9 5l8 12c2 3 1 7-2 9s-7 1-9-2l-5-7-3 8 10 10c3 3 4 8 2 11l-8 14c-2 4-7 5-11 3-4-2-5-7-3-11l5-9-9-8-8 12c-2 3-5 5-9 5H40"
          stroke="url(#runner-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Ligne de vitesse */}
        <path
          d="M18 70h22M12 80h26M22 90h18"
          stroke="url(#runner-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </svg>
    </div>
  );
}

