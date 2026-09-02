"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useTheme } from "next-themes";

/** Nilai persis dari dspace-port globals.css agar className Tailwind seperti
 * text-foreground/bg-popover/border-border ikut identik dengan production —
 * dua set (dark & light) karena portfolio asli sendiri punya kedua tema. */
const DARK_THEME_VARS = {
  ["--background"]: "#050505",
  ["--foreground"]: "#f7f7f7",
  ["--card"]: "#0d0d0d",
  ["--popover"]: "#0a0a0a",
  ["--popover-foreground"]: "#f7f7f7",
  ["--muted"]: "#1f1f1f",
  ["--muted-foreground"]: "#808080",
  ["--accent"]: "#262626",
  ["--accent-foreground"]: "#f7f7f7",
  ["--ring"]: "#666666",
  ["--border"]: "#1f1f1f",
  ["--primary"]: "#f7f7f7",
  ["--primary-foreground"]: "#050505",
} as CSSProperties;

const LIGHT_THEME_VARS = {
  ["--background"]: "#fafafa",
  ["--foreground"]: "#0d0d0d",
  ["--card"]: "#ffffff",
  ["--popover"]: "#ffffff",
  ["--popover-foreground"]: "#0d0d0d",
  ["--muted"]: "#e5e5e5",
  ["--muted-foreground"]: "#6b6b6b",
  ["--accent"]: "#ededed",
  ["--accent-foreground"]: "#0d0d0d",
  ["--ring"]: "#808080",
  ["--border"]: "#d9d9d9",
  ["--primary"]: "#0d0d0d",
  ["--primary-foreground"]: "#fafafa",
} as CSSProperties;

interface PreviewFrameProps {
  children: React.ReactNode;
  label?: string;
  /** Saat true, frame mengisi 100% tinggi parent (dipakai saat sejajar dengan form di grid items-stretch). */
  fillHeight?: boolean;
}

export function PreviewFrame({ children, label, fillHeight = false }: PreviewFrameProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme !== "light";
  const themeVars = isDark ? DARK_THEME_VARS : LIGHT_THEME_VARS;
  const dotClass = isDark ? "bg-white/20" : "bg-black/15";
  const borderClass = isDark ? "border-white/10" : "border-black/10";

  return (
    <div className={fillHeight ? "h-full flex flex-col" : ""}>
      {label && (
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{label}</p>
      )}
      <div
        className={`rounded-xl border border-border overflow-hidden bg-background ${fillHeight ? "flex-1 flex flex-col" : ""}`}
        style={themeVars}
      >
        <div className={`px-4 py-2 border-b ${borderClass} flex items-center gap-1.5 shrink-0`}>
          <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
          <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
          <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
        </div>
        <div
          className={
            fillHeight
              ? "p-5 flex-1 flex items-center justify-center overflow-auto"
              : "p-8 min-h-[420px] flex items-center justify-center"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
