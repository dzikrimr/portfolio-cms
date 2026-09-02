"use client";

import { useActionState, useEffect } from "react";
import { updateHeroStat, deleteHeroStat } from "./actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { HeroStat } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

interface HeroStatRowProps {
  stat: HeroStat;
  onFieldChange: (field: "val" | "label" | "description", value: string) => void;
  onSuccess?: () => void;
}

export function HeroStatRow({ stat, onFieldChange, onSuccess }: HeroStatRowProps) {
  const updateWithId = updateHeroStat.bind(null, stat.id);
  const [state, formAction, isPending] = useActionState(updateWithId, initialState);

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Nilai</label>
          <Input name="val" defaultValue={stat.val} onChange={(e) => onFieldChange("val", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Label</label>
          <Input name="label" defaultValue={stat.label} onChange={(e) => onFieldChange("label", e.target.value)} required />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Deskripsi tooltip</label>
        <Textarea
          name="description"
          defaultValue={stat.description}
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
        <Button type="submit" variant="danger" formAction={deleteHeroStat.bind(null, stat.id)}>
          Hapus
        </Button>
      </div>
    </form>
  );
}
