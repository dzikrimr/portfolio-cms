"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui-portfolio/dialog";
import { ScrollArea } from "@/components/ui-portfolio/scroll-area";

interface ProjectPreviewProps {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  link: string;
}

const hasExternalLink = (link: string) => Boolean(link && link.trim() !== "" && link !== "#");

/**
 * Struktur & className disalin persis dari kartu carousel di ProjectsSection.tsx
 * (dspace-port), minus posisi 3D carousel & GSAP — <img> menggantikan next/image
 * karena CMS tidak mengatur domain whitelist yang sama.
 */
export function ProjectPreview({ title, description, images, tags, link }: ProjectPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const primaryImage = images[0] || "";
  const linkIsExternal = hasExternalLink(link);

  return (
    <div className="w-[280px] md:w-[320px]" style={{ fontFamily: "var(--font-preview-mono)" }}>
      <div className="overflow-hidden flex flex-col h-full rounded-2xl border border-border/40 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm shadow-xl">
        <div className="relative h-40 md:h-44 shrink-0 overflow-hidden bg-muted">
          {primaryImage ? (
            <img src={primaryImage} alt={title} className="w-full h-full object-cover" style={{ filter: "grayscale(40%)" }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
              <ImageIcon className="w-3 h-3 text-white/80" />
              <span className="text-[10px] text-white/80 font-medium">{images.length}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={`${tag}-${i}`} className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-accent/50 rounded text-foreground/80 border border-border/30 max-w-[110px] truncate">
                {tag}
              </span>
            ))}
          </div>
          <h3
            className="text-lg md:text-xl font-bold text-foreground mb-1.5 tracking-tight line-clamp-2 break-words"
            style={{ fontFamily: "var(--font-preview-display)" }}
          >
            {title || "Judul proyek"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1 line-clamp-3 break-words">
            {description || "Deskripsi proyek..."}
          </p>

          <div className="flex gap-2">
            <Dialog onOpenChange={(open) => { if (!open) setCurrentImageIndex(0); }}>
              <DialogTrigger asChild>
                <button className="flex-1 text-[10px] uppercase tracking-wider h-9 rounded-md border border-border cursor-pointer hover:bg-accent transition-all duration-200">
                  View Detail
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-xl border-border">
                <DialogHeader className="p-6 border-b border-border">
                  <DialogTitle className="text-2xl font-bold tracking-tight break-words">{title || "Judul proyek"}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                  <div className="p-6 pt-0">
                    <div className="relative mb-6">
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                        {images.length > 0 ? (
                          <img
                            src={images[currentImageIndex]}
                            alt={`${title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <ImageIcon className="w-16 h-16 text-muted-foreground" />
                          </div>
                        )}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                              {images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentImageIndex(idx)}
                                  className={cn(
                                    "w-2 h-2 rounded-full transition-all cursor-pointer",
                                    idx === currentImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/70"
                                  )}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map((tag, i) => (
                        <span key={`${tag}-${i}`} className="px-3 py-1 text-xs uppercase tracking-wider bg-accent/60 rounded text-foreground max-w-full break-words">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed break-words">{description}</p>
                  </div>
                </ScrollArea>
                <div className="p-6 border-t border-border">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-foreground w-full justify-center">
                    {linkIsExternal ? "View Project" : "Private Repository"} <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </DialogContent>
            </Dialog>
            <span className="inline-flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider px-3 h-9 text-foreground border border-border/60 rounded-md">
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
