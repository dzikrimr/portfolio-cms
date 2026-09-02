"use client";

import { useState } from "react";
import { Trophy, Medal, Award, Crown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui-portfolio/dialog";

type AchievementTier = "gold" | "silver" | "bronze" | "special" | "default";

interface AchievementPreviewProps {
  title: string;
  event: string;
  description: string;
  date: string;
  image: string;
  rank: string;
  tier: AchievementTier;
}

const getTierStyles = (tier: AchievementTier) => {
  switch (tier) {
    case "gold":
      return { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/50", glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]" };
    case "silver":
      return { icon: Medal, color: "text-slate-300", bg: "bg-slate-300/10", border: "border-slate-300/50", glow: "shadow-[0_0_15px_rgba(203,213,225,0.3)]" };
    case "bronze":
      return { icon: Award, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/50", glow: "shadow-[0_0_15px_rgba(251,146,60,0.3)]" };
    case "special":
      return { icon: Crown, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/50", glow: "shadow-[0_0_15px_rgba(192,132,252,0.3)]" };
    default:
      return { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", border: "border-primary/50", glow: "shadow-[0_0_15px_rgba(255,255,255,0.15)]" };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(date);
};

/**
 * Struktur & className disalin persis dari satu item timeline di
 * AchievementSection.tsx (dspace-port) — klik untuk buka modal detail.
 */
export function AchievementPreview({ title, event, description, date, image, rank, tier }: AchievementPreviewProps) {
  const [open, setOpen] = useState(false);
  const styles = getTierStyles(tier);

  return (
    <div className="w-full max-w-md" style={{ fontFamily: "var(--font-preview-mono)" }}>
      <div
        className="group relative bg-card/40 backdrop-blur-sm border border-border hover:border-primary/50 p-5 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card/60"
        onClick={() => setOpen(true)}
      >
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border", styles.bg, styles.color, styles.border)}>
              {rank || "Rank"}
            </span>
            <span className="text-xs text-muted-foreground">{date ? formatDate(date) : "Tanggal"}</span>
          </div>
          <h3
            className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 break-words"
            style={{ fontFamily: "var(--font-preview-display)" }}
          >
            {title || "Judul achievement"}
          </h3>
          <p className="text-sm md:text-base text-primary/80 font-medium">{event || "Nama event"}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {description || "Deskripsi..."}
          </p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20 text-foreground">
          <DialogHeader>
            <div className="flex flex-col items-center text-center mb-4">
              <div className={cn("w-16 h-16 rounded-full border-2 bg-background flex items-center justify-center mb-3", styles.border, styles.glow)}>
                <styles.icon className={cn("w-8 h-8", styles.color)} />
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground break-words">{title || "Judul achievement"}</DialogTitle>
              <p className="text-sm text-primary font-medium mt-1">{rank || "Rank"}</p>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border/50 bg-muted/20">
              {image ? (
                <img src={image} alt={title} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground/40">Tanpa gambar</div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap justify-between items-start gap-x-3 gap-y-1 text-xs text-muted-foreground border-b border-border/50 pb-2">
                <span className="min-w-0 break-words">Event: {event || "-"}</span>
                <span className="shrink-0">{date ? formatDate(date) : "-"}</span>
              </div>
              <DialogDescription className="text-foreground/90 leading-relaxed pt-2">
                {description || "Deskripsi..."}
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
