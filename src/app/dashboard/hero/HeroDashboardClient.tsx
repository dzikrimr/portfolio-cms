"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { HeroSettingsForm } from "./HeroSettingsForm";
import { HeroStatRow } from "./HeroStatRow";
import { NewHeroStatForm } from "./NewHeroStatForm";
import { deleteHeroStat } from "./actions";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { HeroTextPreview } from "@/components/preview/HeroTextPreview";
import { HeroPreview } from "@/components/preview/HeroPreview";
import type { SiteSettings, HeroStat } from "@/db/schema";

export function HeroDashboardClient({
  settings,
  statRows,
}: {
  settings: SiteSettings;
  statRows: HeroStat[];
}) {
  const [preview, setPreview] = useState({
    firstName: settings.firstName,
    lastName: settings.lastName,
    positionBadge: settings.positionBadge,
    heroDescription: settings.heroDescription,
    cvDownloadUrl: settings.cvDownloadUrl,
    portraitImage: settings.portraitImage,
    stats: statRows.map((s) => ({ val: s.val, label: s.label, description: s.description })),
  });
  const [modal, setModal] = useState<"new" | HeroStat | null>(null);

  const updateSettingField = (
    field: "firstName" | "lastName" | "positionBadge" | "heroDescription" | "cvDownloadUrl" | "portraitImage",
    value: string
  ) => {
    setPreview((prev) => ({ ...prev, [field]: value }));
  };

  const updateStatField = (index: number, field: "val" | "label" | "description", value: string) => {
    setPreview((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  const editingIndex = modal && modal !== "new" ? statRows.findIndex((s) => s.id === modal.id) : -1;

  return (
    <div className="w-full space-y-10">
      {/* Hero — layout khusus: form kiri, preview teks sejajar kanan, tinggi disamakan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-foreground mb-1">Hero</h1>
          <p className="text-sm text-muted-foreground mb-4">Nama, deskripsi, dan link download CV.</p>
          <HeroSettingsForm settings={settings} onFieldChange={updateSettingField} />
        </div>

        <div className="flex flex-col">
          <div className="invisible mb-1" aria-hidden>
            <h1 className="text-lg font-semibold">Hero</h1>
            <p className="text-sm mb-4">Nama, deskripsi, dan link download CV.</p>
          </div>
          <div className="flex-1">
            <PreviewFrame fillHeight>
              <HeroTextPreview
                firstName={preview.firstName}
                lastName={preview.lastName}
                heroDescription={preview.heroDescription}
                cvDownloadUrl={preview.cvDownloadUrl}
              />
            </PreviewFrame>
          </div>
        </div>
      </div>

      {/* Statistik Card — preview full-width di atas, tombol tambah, list ringkas + modal */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Statistik Card</h2>

        <PreviewFrame>
          <HeroPreview
            firstName={preview.firstName}
            lastName={preview.lastName}
            positionBadge={preview.positionBadge}
            portraitImage={preview.portraitImage}
            stats={preview.stats}
          />
        </PreviewFrame>

        <button
          type="button"
          onClick={() => setModal("new")}
          className="w-full mt-4 border border-dashed border-border rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Tambah Statistik
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {statRows.map((stat) => (
            <div
              key={stat.id}
              className="border border-border rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {stat.val} {stat.label}
                </p>
                <p className="text-xs text-muted-foreground truncate">{stat.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="secondary" onClick={() => setModal(stat)}>Edit</Button>
                <form action={deleteHeroStat.bind(null, stat.id)}>
                  <Button type="submit" variant="danger">Hapus</Button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <Modal open={modal === "new"} onClose={() => setModal(null)} title="Tambah Statistik">
          <NewHeroStatForm onSuccess={() => setModal(null)} />
        </Modal>

        <Modal open={modal !== null && modal !== "new"} onClose={() => setModal(null)} title="Edit Statistik">
          {modal && modal !== "new" && editingIndex >= 0 && (
            <HeroStatRow
              stat={modal}
              onFieldChange={(field, value) => updateStatField(editingIndex, field, value)}
              onSuccess={() => setModal(null)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}
