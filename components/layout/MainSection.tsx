"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  id: string;
  label: string;
  title: string;
  align?: "left" | "right";
  children?: ReactNode;
};

export function MainSection(props: Props) {
  const { id, label, title, align = "left", children } = props;

  return (
    <section
      id={id}
      data-scene-section
      className={clsx(
        "relative flex min-h-[60vh] items-center py-24",
        align === "right" ? "justify-end" : "justify-start"
      )}
    >
      <div className="max-w-xl space-y-4 px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          {label}
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-slate-50">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

