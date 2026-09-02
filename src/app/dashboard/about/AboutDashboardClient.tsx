"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AboutSkillRow } from "./AboutSkillRow";
import { NewAboutSkillForm } from "./NewAboutSkillForm";
import { deleteAboutSkill } from "./actions";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { AboutSkillPreview } from "@/components/preview/AboutSkillPreview";
import type { AboutSkill } from "@/db/schema";

export function AboutDashboardClient({ skills }: { skills: AboutSkill[] }) {
  const [preview, setPreview] = useState(
    skills.map((s) => ({ iconName: s.iconName, label: s.label, description: s.description }))
  );
  const [modal, setModal] = useState<"new" | AboutSkill | null>(null);

  const updateField = (index: number, field: "iconName" | "label" | "description", value: string) => {
    setPreview((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const editingIndex = modal && modal !== "new" ? skills.findIndex((s) => s.id === modal.id) : -1;

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground mb-1">About</h1>
        <p className="text-sm text-muted-foreground">
          Kartu keahlian di section &quot;Areas of Expertise&quot;. Nama ikon merujuk ke{" "}
          <a
            href="https://lucide.dev/icons"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            lucide.dev/icons
          </a>{" "}
          (contoh: Server, Sparkles, Smartphone).
        </p>
      </div>

      <PreviewFrame label="Preview">
        <div className="flex flex-wrap items-center justify-center gap-5">
          {preview.map((skill, i) => (
            <AboutSkillPreview key={i} iconName={skill.iconName} label={skill.label} description={skill.description} />
          ))}
        </div>
      </PreviewFrame>

      <button
        type="button"
        onClick={() => setModal("new")}
        className="w-full border border-dashed border-border rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Tambah Skill
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="border border-border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{skill.label}</p>
              <p className="text-xs text-muted-foreground truncate">{skill.iconName}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" onClick={() => setModal(skill)}>Edit</Button>
              <form action={deleteAboutSkill.bind(null, skill.id)}>
                <Button type="submit" variant="danger">Hapus</Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === "new"} onClose={() => setModal(null)} title="Tambah Skill">
        <NewAboutSkillForm onSuccess={() => setModal(null)} />
      </Modal>

      <Modal open={modal !== null && modal !== "new"} onClose={() => setModal(null)} title="Edit Skill">
        {modal && modal !== "new" && editingIndex >= 0 && (
          <AboutSkillRow
            skill={modal}
            onFieldChange={(field, value) => updateField(editingIndex, field, value)}
            onSuccess={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
