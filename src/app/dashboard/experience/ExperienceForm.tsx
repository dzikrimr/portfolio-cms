"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { ExperiencePreview } from "@/components/preview/ExperiencePreview";
import type { Experience } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

const linesToArray = (value: string) =>
  value.split("\n").map((line) => line.trim()).filter(Boolean);

interface ExperienceFormProps {
  action: (state: { error?: string; success?: boolean }, formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  experience?: Experience;
  onSuccess?: () => void;
}

export function ExperienceForm({ action, experience, onSuccess }: ExperienceFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [preview, setPreview] = useState({
    year: experience?.year ?? "",
    command: experience?.command ?? "",
    title: experience?.title ?? "",
    company: experience?.company ?? "",
    location: experience?.location ?? "",
    description: experience?.description ?? "",
    output: experience?.output ?? [],
    skills: experience?.skills ?? [],
    image: experience?.image ?? "",
  });

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="w-full space-y-6">
      <PreviewFrame label="Preview">
        <ExperiencePreview {...preview} />
      </PreviewFrame>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Tahun</label>
            <Input
              name="year"
              defaultValue={experience?.year}
              placeholder="2024"
              onChange={(e) => setPreview((p) => ({ ...p, year: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Command (gaya CLI, mis. &quot;work --intern&quot;)
            </label>
            <Input
              name="command"
              defaultValue={experience?.command}
              onChange={(e) => setPreview((p) => ({ ...p, command: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Jabatan</label>
            <Input
              name="title"
              defaultValue={experience?.title}
              onChange={(e) => setPreview((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Perusahaan</label>
            <Input
              name="company"
              defaultValue={experience?.company}
              onChange={(e) => setPreview((p) => ({ ...p, company: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Lokasi</label>
            <Input
              name="location"
              defaultValue={experience?.location}
              onChange={(e) => setPreview((p) => ({ ...p, location: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">URL gambar (opsional)</label>
            <Input
              name="image"
              defaultValue={experience?.image ?? ""}
              onChange={(e) => setPreview((p) => ({ ...p, image: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1">Deskripsi</label>
            <Textarea
              name="description"
              defaultValue={experience?.description}
              onChange={(e) => setPreview((p) => ({ ...p, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Output / pencapaian (satu per baris)
            </label>
            <Textarea
              name="output"
              defaultValue={experience?.output?.join("\n")}
              onChange={(e) => setPreview((p) => ({ ...p, output: linesToArray(e.target.value) }))}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Skills (satu per baris)</label>
            <Textarea
              name="skills"
              defaultValue={experience?.skills?.join("\n")}
              onChange={(e) => setPreview((p) => ({ ...p, skills: linesToArray(e.target.value) }))}
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
