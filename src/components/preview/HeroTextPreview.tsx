interface HeroTextPreviewProps {
  firstName: string;
  lastName: string;
  heroDescription: string;
  cvDownloadUrl: string;
}

const HIGHLIGHT_PHRASES = ["Backend Systems", "Artificial Intelligence", "Mobile Development"];

const renderHighlightedDescription = (text: string) => {
  const pattern = new RegExp(`(${HIGHLIGHT_PHRASES.join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    HIGHLIGHT_PHRASES.includes(part) ? (
      <span key={i} className="text-foreground/90">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

/**
 * Struktur & className disalin persis dari kolom kiri HeroSection.tsx (dspace-port)
 * — judul nama, deskripsi, dan tombol CTA — tanpa GSAP.
 */
export function HeroTextPreview({ firstName, lastName, heroDescription, cvDownloadUrl }: HeroTextPreviewProps) {
  return (
    <div
      className="space-y-4 flex flex-col items-center text-center lg:items-start lg:text-left"
      style={{ fontFamily: "var(--font-preview-mono)" }}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[0.95] text-foreground truncate">
          <span className="block" style={{ fontFamily: "var(--font-preview-display)" }}>
            {firstName || "Nama"}
          </span>
        </h1>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[0.95] truncate">
          <span className="block text-foreground/45" style={{ fontFamily: "var(--font-preview-display)" }}>
            {lastName || "Belakang"}
          </span>
        </h1>
      </div>

      <p className="text-sm text-muted-foreground max-w-md leading-relaxed line-clamp-4">
        {renderHighlightedDescription(heroDescription || "Deskripsi hero...")}
      </p>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
        <span className="group relative px-5 py-2.5 overflow-hidden rounded-full inline-block">
          <span className="absolute inset-0 bg-foreground" />
          <span className="relative text-[10px] uppercase tracking-[0.2em] font-semibold text-background">
            Download CV
          </span>
        </span>
        <span className="group relative px-5 py-2.5 overflow-hidden rounded-full border border-border inline-block">
          <span className="relative text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground">
            Get in Touch
          </span>
        </span>
      </div>
    </div>
  );
}
