"use client";

import { useActionState, useEffect, useRef } from "react";
import { createHeroStat } from "./actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const initialState: { error?: string; success?: boolean } = {};

export function NewHeroStatForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(createHeroStat, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="space-y-3"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Nilai</label>
          <Input name="val" placeholder="94" required />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Label</label>
          <Input name="label" placeholder="BND" required />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Deskripsi tooltip</label>
        <Textarea name="description" rows={2} required />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menambahkan..." : "Tambah"}
      </Button>
    </form>
  );
}
