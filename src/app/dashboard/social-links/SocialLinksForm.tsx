"use client";

import { useActionState } from "react";
import { updateSocialLinks } from "./actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

export function SocialLinksForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, isPending] = useActionState(updateSocialLinks, initialState);

  return (
    <form action={formAction} className="max-w-lg border border-border rounded-lg p-4 space-y-4">
      <div>
        <label className="block text-xs text-muted-foreground mb-1">GitHub URL</label>
        <Input name="githubUrl" defaultValue={settings.githubUrl} placeholder="https://github.com/username" required />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">LinkedIn URL</label>
        <Input name="linkedinUrl" defaultValue={settings.linkedinUrl} placeholder="https://linkedin.com/in/username" required />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          Email (dengan prefix mailto:)
        </label>
        <Input name="emailUrl" defaultValue={settings.emailUrl} placeholder="mailto:you@example.com" required />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Tersimpan.</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  );
}
