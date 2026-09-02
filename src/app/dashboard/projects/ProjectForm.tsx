"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { ProjectPreview } from "@/components/preview/ProjectPreview";
import type { Project } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

const linesToArray = (value: string) =>
  value.split("\n").map((line) => line.trim()).filter(Boolean);

interface ProjectFormProps {
  action: (state: { error?: string; success?: boolean }, formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  project?: Project;
  onSuccess?: () => void;
}

export function ProjectForm({ action, project, onSuccess }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [preview, setPreview] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    images: project?.images ?? [],
    tags: project?.tags ?? [],
    link: project?.link ?? "",
  });

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="w-full space-y-6">
      <PreviewFrame label="Preview">
        <ProjectPreview
          title={preview.title}
          description={preview.description}
          images={preview.images}
          tags={preview.tags}
          link={preview.link}
        />
      </PreviewFrame>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Judul</label>
            <Input
              name="title"
              defaultValue={project?.title}
              onChange={(e) => setPreview((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Link (kosongkan jika repo privat)
            </label>
            <Input
              name="link"
              defaultValue={project?.link ?? ""}
              onChange={(e) => setPreview((p) => ({ ...p, link: e.target.value }))}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1">Deskripsi</label>
            <Textarea
              name="description"
              defaultValue={project?.description}
              onChange={(e) => setPreview((p) => ({ ...p, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              URL gambar (satu per baris)
            </label>
            <Textarea
              name="images"
              defaultValue={project?.images?.join("\n")}
              onChange={(e) => setPreview((p) => ({ ...p, images: linesToArray(e.target.value) }))}
              rows={3}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Tags (satu per baris)</label>
            <Textarea
              name="tags"
              defaultValue={project?.tags?.join("\n")}
              onChange={(e) => setPreview((p) => ({ ...p, tags: linesToArray(e.target.value) }))}
              rows={3}
              required
            />
          </div>
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </div>
  );
}
