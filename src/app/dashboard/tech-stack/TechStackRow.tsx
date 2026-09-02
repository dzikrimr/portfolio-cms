"use client";

import { useActionState, useEffect } from "react";
import { updateTechStack, deleteTechStack } from "./actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { TechStack } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

interface TechStackRowProps {
  tech: TechStack;
  onFieldChange: (field: "name" | "logoSvg", value: string) => void;
  onSuccess?: () => void;
}

export function TechStackRow({ tech, onFieldChange, onSuccess }: TechStackRowProps) {
  const updateWithId = updateTechStack.bind(null, tech.id);
  const [state, formAction, isPending] = useActionState(updateWithId, initialState);

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Nama</label>
        <Input
          name="name"
          defaultValue={tech.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Markup SVG</label>
        <Textarea
          name="logoSvg"
          defaultValue={tech.logoSvg}
          onChange={(e) => onFieldChange("logoSvg", e.target.value)}
          rows={4}
          className="font-mono text-xs"
          required
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
        <Button type="submit" variant="danger" formAction={deleteTechStack.bind(null, tech.id)}>
          Hapus
        </Button>
      </div>
    </form>
  );
}
