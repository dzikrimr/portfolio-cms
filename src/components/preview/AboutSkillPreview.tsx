"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const FALLBACK_ICON: LucideIcon = LucideIcons.Sparkles;

const resolveIcon = (iconName: string): LucideIcon => {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return icon ?? FALLBACK_ICON;
};

interface AboutSkillPreviewProps {
  iconName: string;
  label: string;
  description: string;
}

/** Struktur & className disalin persis dari FlipCard di AboutSection.tsx (dspace-port). */
export function AboutSkillPreview({ iconName, label, description }: AboutSkillPreviewProps) {
  const [flipped, setFlipped] = useState(false);
  const Icon = resolveIcon(iconName);

  return (
    <button
      type="button"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      className="group shrink-0 cursor-pointer focus:outline-none"
      style={{
        perspective: "1000px",
        fontFamily: "var(--font-preview-mono)",
        width: "180px",
        aspectRatio: "3 / 4",
      }}
      aria-label={label}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-card/90 to-background/70 backdrop-blur-xl flex flex-col items-center justify-center gap-4 shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Icon className="w-12 h-12 md:w-14 md:h-14 text-foreground/70 transition-transform duration-500 group-hover:scale-110" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Hover</span>
        </div>

        <div
          className="absolute inset-0 rounded-2xl border border-white/15 bg-gradient-to-br from-card to-background/90 backdrop-blur-xl flex flex-col items-center justify-center text-center gap-3 p-6 shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Icon className="w-8 h-8 text-foreground mb-1 shrink-0" />
          <h3
            className="text-lg font-bold tracking-tight text-foreground line-clamp-2"
            style={{ fontFamily: "var(--font-preview-display)" }}
          >
            {label || "Label"}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
            {description || "Deskripsi..."}
          </p>
        </div>
      </div>
    </button>
  );
}
