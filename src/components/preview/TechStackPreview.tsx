interface TechStackPreviewProps {
  name: string;
  logoSvg: string;
}

/** Struktur & className disalin persis dari TechCard di TechStackSection.tsx (dspace-port). */
export function TechStackPreview({ name, logoSvg }: TechStackPreviewProps) {
  return (
    <div
      className="group flex flex-col items-center justify-center p-6 rounded-xl shrink-0 border border-border/40 bg-card/30 hover:border-foreground/20 hover:bg-card/60 transition-all duration-500 cursor-default"
      style={{ fontFamily: "var(--font-preview-mono)", width: "140px", aspectRatio: "1 / 1" }}
    >
      <div className="text-muted-foreground group-hover:text-foreground transition-all duration-500 group-hover:scale-110 [&_svg]:w-10 [&_svg]:h-10">
        {logoSvg ? (
          <div dangerouslySetInnerHTML={{ __html: logoSvg }} />
        ) : (
          <div className="w-10 h-10 rounded border border-dashed border-border" />
        )}
      </div>
      <span className="mt-3 text-[9px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500 text-center line-clamp-2 break-words">
        {name || "Nama teknologi"}
      </span>
    </div>
  );
}
