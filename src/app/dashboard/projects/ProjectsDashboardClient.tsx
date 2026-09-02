"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ProjectForm } from "./ProjectForm";
import { createProject, updateProject, deleteProject } from "./actions";
import type { Project } from "@/db/schema";

export function ProjectsDashboardClient({ projects }: { projects: Project[] }) {
  const [modal, setModal] = useState<"new" | Project | null>(null);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-foreground mb-1">Projects</h1>
        <p className="text-sm text-muted-foreground">{projects.length} proyek.</p>
      </div>

      <button
        type="button"
        onClick={() => setModal("new")}
        className="w-full mb-4 border border-dashed border-border rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Tambah Proyek
      </button>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{project.title}</p>
              <p className="text-xs text-muted-foreground truncate">{project.tags.join(", ")}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" onClick={() => setModal(project)}>Edit</Button>
              <form action={deleteProject.bind(null, project.id)}>
                <Button type="submit" variant="danger">Hapus</Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === "new"} onClose={() => setModal(null)} title="Tambah Proyek">
        <ProjectForm action={createProject} onSuccess={() => setModal(null)} />
      </Modal>

      <Modal open={modal !== null && modal !== "new"} onClose={() => setModal(null)} title="Edit Proyek">
        {modal && modal !== "new" && (
          <ProjectForm
            action={updateProject.bind(null, modal.id)}
            project={modal}
            onSuccess={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
