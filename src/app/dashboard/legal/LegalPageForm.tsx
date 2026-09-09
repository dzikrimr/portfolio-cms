"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
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
    <form action={formAction} className="max-w-lg space-y-4">
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Judul (teks tautan di footer)</label>
        <Input name="title" defaultValue={page.title} required />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          Link (mis. halaman TermsFeed)
        </label>
        <Input name="url" defaultValue={page.url} placeholder="https://..." required />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Tersimpan.</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  );
}
