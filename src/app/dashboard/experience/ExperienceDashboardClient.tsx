"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ExperienceForm } from "./ExperienceForm";
import { createExperience, updateExperience, deleteExperience } from "./actions";
import type { Experience } from "@/db/schema";

export function ExperienceDashboardClient({ experiences }: { experiences: Experience[] }) {
  const [modal, setModal] = useState<"new" | Experience | null>(null);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-foreground mb-1">Experience</h1>
        <p className="text-sm text-muted-foreground">{experiences.length} entri.</p>
      </div>

      <button
        type="button"
        onClick={() => setModal("new")}
        className="w-full mb-4 border border-dashed border-border rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Tambah Experience
      </button>

      <div className="space-y-2">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border border-border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {exp.title} — {exp.company}
              </p>
              <p className="text-xs text-muted-foreground truncate">{exp.year}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" onClick={() => setModal(exp)}>Edit</Button>
              <form action={deleteExperience.bind(null, exp.id)}>
                <Button type="submit" variant="danger">Hapus</Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === "new"} onClose={() => setModal(null)} title="Tambah Experience">
        <ExperienceForm action={createExperience} onSuccess={() => setModal(null)} />
      </Modal>

      <Modal open={modal !== null && modal !== "new"} onClose={() => setModal(null)} title="Edit Experience">
        {modal && modal !== "new" && (
          <ExperienceForm
            action={updateExperience.bind(null, modal.id)}
            experience={modal}
            onSuccess={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
