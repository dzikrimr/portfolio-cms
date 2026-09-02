"use client";

interface HeroStatInput {
  val: string;
  label: string;
  description: string;
}

interface HeroPreviewProps {
  firstName: string;
  lastName: string;
  positionBadge: string;
  portraitImage: string;
  stats: HeroStatInput[];
}

const SKILL_LABELS = ["BND", "FND", "MOB", "ART"];

const StatTooltip = ({ text }: { text: string }) => (
  <span
    role="tooltip"
    className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-border/50 bg-popover px-3.5 py-2.5 text-center font-mono text-[13px] leading-snug text-popover-foreground opacity-0 shadow-xl transition-opacity duration-200 group-hover/stat:opacity-100 z-30"
  >
    {text}
    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
  </span>
);

/**
 * Struktur & className disalin persis dari HeroSection.tsx (dspace-port) bagian
 * FIFA-style card — tanpa TiltCard/GSAP karena preview ini statis. Gambar
 * potret ditampilkan langsung dari URL (bukan next/image, karena CMS tidak
 * mengatur domain whitelist yang sama), fallback ke gradient placeholder.
 */
export function HeroPreview({ firstName, lastName, positionBadge, portraitImage, stats }: HeroPreviewProps) {
  const skillScores = stats
    .filter((s) => SKILL_LABELS.includes(s.label))
    .map((s) => Number(s.val))
    .filter((n) => !Number.isNaN(n));
  const overallRating = skillScores.length
    ? Math.round(skillScores.reduce((sum, n) => sum + n, 0) / skillScores.length)
    : 0;

  return (
    <div
      className="fifa-card group relative w-[300px] md:w-[340px] aspect-[3/4.35] select-none [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.6))]"
      style={{ fontFamily: "var(--font-preview-mono)" }}
    >
      <div className="relative w-full h-full">
        <div className="fifa-card-shape absolute inset-0 bg-foreground/15 rounded-[22px]" />
        <div className="fifa-card-shape fifa-card-body absolute inset-[1.5px] overflow-hidden rounded-[20px]">
          <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(115deg,transparent,transparent_22px,#fff_22px,#fff_23px)] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 bottom-[40%] overflow-hidden">
            {portraitImage ? (
              <img
                src={portraitImage}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover object-top grayscale contrast-[1.1] brightness-95"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-neutral-600 to-neutral-800" />
            )}
          </div>
        </div>

        <div className="absolute top-[7%] left-[10%] z-20 flex flex-col items-center leading-none">
          <span
            className="group/stat relative text-4xl md:text-5xl font-bold text-foreground cursor-help"
            style={{ fontFamily: "var(--font-preview-display)" }}
          >
            {overallRating}
            <StatTooltip text="OVR adalah rata-rata dari empat kemampuan utama: Backend, Frontend, Mobile, dan AI." />
          </span>
          <span className="font-mono text-[11px] md:text-xs tracking-[0.15em] text-foreground/80 mt-1">
            {positionBadge || "—"}
          </span>
          <span className="mt-2 w-7 h-px bg-foreground/30" />
          <span className="mt-2 flex flex-col w-6 h-4 overflow-hidden rounded-[2px] border border-foreground/20 shadow-sm">
            <span className="flex-1 bg-[#e70011]" />
            <span className="flex-1 bg-white" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-[9%] z-20 px-[14%] flex flex-col items-center">
          <span
            className="text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase truncate max-w-full"
            style={{ fontFamily: "var(--font-preview-display)" }}
          >
            {firstName || "Nama"} {(lastName || "?").charAt(0)}.
          </span>
          <span className="mt-1.5 mb-3 w-full h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full">
            {stats.map((stat, i) => (
              <div key={`${stat.label}-${i}`} className="group/stat relative flex items-center justify-center gap-2 cursor-help min-w-0">
                <span className="text-base md:text-xl font-bold text-foreground shrink-0" style={{ fontFamily: "var(--font-preview-display)" }}>
                  {stat.val || "0"}
                </span>
                <span className="font-mono text-[18px] md:text-[19px] tracking-wider text-muted-foreground/80 truncate">
                  {stat.label || "???"}
                </span>
                {stat.description && <StatTooltip text={stat.description} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
