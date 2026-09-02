"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExperiencePreviewProps {
  year: string;
  command: string;
  title: string;
  company: string;
  location: string;
  description: string;
  output: string[];
  skills: string[];
  image: string;
}

/**
 * Struktur & className disalin persis dari satu baris terminal di
 * TimelineSection.tsx (dspace-port) — expand/collapse tetap interaktif,
 * <img> menggantikan next/image.
 */
export function ExperiencePreview({
  year, command, title, company, location, description, output, skills, image,
}: ExperiencePreviewProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="rounded-xl border border-border/50 bg-card/40 overflow-hidden shadow-2xl backdrop-blur-sm w-full max-w-md"
      style={{ fontFamily: "var(--font-preview-mono)" }}
    >
      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 border-b border-border/50 bg-card/60">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] text-muted-foreground tracking-wider flex-1 text-center truncate px-1">
          career.log
        </span>
        <div className="w-8 md:w-12" />
      </div>

      <div className="p-3 md:p-4 space-y-1">
        <div className="group rounded-lg cursor-pointer transition-all duration-300 bg-accent/30" onClick={() => setExpanded((v) => !v)}>
          <div className="px-4 py-3 flex items-start gap-3">
            <span className="text-muted-foreground text-xs shrink-0 select-none pt-0.5">$</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <code className="text-xs text-primary font-bold break-all min-w-0 max-w-full">career --{command || "role"}</code>
                <span className="text-[10px] text-muted-foreground/70 shrink-0">[{year || "0000"}]</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mt-1.5 gap-x-4 gap-y-1">
                <div className="flex-1 min-w-0 overflow-hidden">
                  <span className="text-foreground/80 leading-snug break-all">{title || "Jabatan"}</span>
                </div>
                <div className="flex items-start gap-2 min-w-0 shrink-0 sm:max-w-[40%] sm:text-right self-end sm:self-start overflow-hidden">
                  <span className="text-primary/70 font-medium leading-snug break-all">{company || "Perusahaan"}</span>
                </div>
              </div>
            </div>
            <span className={cn("text-xs transition-transform duration-300", expanded && "rotate-90 text-primary")}>▸</span>
          </div>

          <div className={cn("grid transition-all duration-500 ease-in-out", expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <div className="px-4 pb-6 pl-11 flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                      <span>// metadata</span>
                      <div className="flex-1 h-px bg-border/30" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic break-all overflow-hidden">&quot;{description || "Deskripsi..."}&quot;</p>
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    {output.map((line, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] min-w-0">
                        <span className="text-primary/50 shrink-0">→</span>
                        <span className="text-foreground/90 break-all min-w-0 overflow-hidden">{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 min-w-0">
                    {skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 text-[9px] bg-primary/10 text-primary/80 border border-primary/20 rounded max-w-full break-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-[9px] text-muted-foreground/40 italic mt-2 break-all overflow-hidden">Location: {location || "-"}</div>
                </div>
                <div className="w-full md:w-40 shrink-0">
                  <div className="relative aspect-video md:aspect-square rounded-lg border border-border/50 bg-muted/20 overflow-hidden">
                    {image ? (
                      <img src={image} alt={`${company} preview`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground/30">IMG_PREVIEW</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
