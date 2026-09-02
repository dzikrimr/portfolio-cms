"use client";

import { useActionState, useEffect, useRef } from "react";
import { createTechStack } from "./actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const initialState: { error?: string; success?: boolean } = {};

export function NewTechStackForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState(createTechStack, initialState);
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
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Nama</label>
        <Input name="name" placeholder="React" required />
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          Markup SVG (tempel dari sumber ikon, contoh simpleicons.org)
        </label>
        <Textarea name="logoSvg" placeholder="<svg viewBox=&quot;0 0 24 24&quot;>...</svg>" rows={4} className="font-mono text-xs" required />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menambahkan..." : "Tambah"}
      </Button>
    </form>
  );
}
