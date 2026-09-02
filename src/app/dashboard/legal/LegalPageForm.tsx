"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { LegalPage } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

interface LegalPageFormProps {
  action: (state: { error?: string; success?: boolean }, formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  page: LegalPage;
}

export function LegalPageForm({ action, page }: LegalPageFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="w-full space-y-4">
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Judul</label>
        <Input name="title" defaultValue={page.title} required />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          Konten (pisahkan paragraf dengan baris kosong)
        </label>
        <Textarea name="content" defaultValue={page.content} rows={12} required />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Tersimpan.</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  );
}
