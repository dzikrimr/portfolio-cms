"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TechStackRow } from "./TechStackRow";
import { NewTechStackForm } from "./NewTechStackForm";
import { deleteTechStack } from "./actions";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { TechStackPreview } from "@/components/preview/TechStackPreview";
import type { TechStack } from "@/db/schema";

export function TechStackDashboardClient({ stacks }: { stacks: TechStack[] }) {
  const [preview, setPreview] = useState(
    stacks.map((s) => ({ name: s.name, logoSvg: s.logoSvg }))
  );
  const [modal, setModal] = useState<"new" | TechStack | null>(null);

  const updateField = (index: number, field: "name" | "logoSvg", value: string) => {
    setPreview((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const editingIndex = modal && modal !== "new" ? stacks.findIndex((s) => s.id === modal.id) : -1;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground mb-1">Tech Stack</h1>
        <p className="text-sm text-muted-foreground">
          Logo teknologi, ditempel sebagai markup SVG mentah.
        </p>
      </div>

      <PreviewFrame label="Preview">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {preview.map((tech, i) => (
            <TechStackPreview key={i} name={tech.name} logoSvg={tech.logoSvg} />
          ))}
        </div>
      </PreviewFrame>

      <button
        type="button"
        onClick={() => setModal("new")}
        className="w-full border border-dashed border-border rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Tambah Teknologi
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stacks.map((tech) => (
          <div
            key={tech.id}
            className="border border-border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0 flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 text-foreground [&_svg]:w-8 [&_svg]:h-8" dangerouslySetInnerHTML={{ __html: tech.logoSvg }} />
              <p className="text-sm font-medium text-foreground truncate">{tech.name}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" onClick={() => setModal(tech)}>Edit</Button>
              <form action={deleteTechStack.bind(null, tech.id)}>
                <Button type="submit" variant="danger">Hapus</Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === "new"} onClose={() => setModal(null)} title="Tambah Teknologi">
        <NewTechStackForm onSuccess={() => setModal(null)} />
      </Modal>

      <Modal open={modal !== null && modal !== "new"} onClose={() => setModal(null)} title="Edit Teknologi">
        {modal && modal !== "new" && editingIndex >= 0 && (
          <TechStackRow
            tech={modal}
            onFieldChange={(field, value) => updateField(editingIndex, field, value)}
            onSuccess={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
