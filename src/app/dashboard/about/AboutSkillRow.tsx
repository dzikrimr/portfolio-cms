"use client";

import { useActionState, useEffect } from "react";
import { updateAboutSkill, deleteAboutSkill } from "./actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { AboutSkill } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

interface AboutSkillRowProps {
  skill: AboutSkill;
  onFieldChange: (field: "iconName" | "label" | "description", value: string) => void;
  onSuccess?: () => void;
}

export function AboutSkillRow({ skill, onFieldChange, onSuccess }: AboutSkillRowProps) {
  const updateWithId = updateAboutSkill.bind(null, skill.id);
  const [state, formAction, isPending] = useActionState(updateWithId, initialState);

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="border border-border rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Nama ikon Lucide
          </label>
          <Input
            name="iconName"
            defaultValue={skill.iconName}
            placeholder="Server"
            onChange={(e) => onFieldChange("iconName", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Label</label>
          <Input
            name="label"
            defaultValue={skill.label}
            onChange={(e) => onFieldChange("label", e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Deskripsi</label>
        <Textarea
          name="description"
          defaultValue={skill.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          rows={2}
          required
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
        <Button type="submit" variant="danger" formAction={deleteAboutSkill.bind(null, skill.id)}>
          Hapus
        </Button>
      </div>
    </form>
  );
}
