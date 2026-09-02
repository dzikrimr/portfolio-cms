"use client";

import { useActionState } from "react";
import { updateHeroSettings } from "./actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

interface HeroSettingsFormProps {
  settings: SiteSettings;
  onFieldChange: (
    field: "firstName" | "lastName" | "positionBadge" | "heroDescription" | "cvDownloadUrl" | "portraitImage",
    value: string
  ) => void;
}

export function HeroSettingsForm({ settings, onFieldChange }: HeroSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateHeroSettings, initialState);

  return (
    <form action={formAction} className="border border-border rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Nama depan</label>
          <Input
            name="firstName"
            defaultValue={settings.firstName}
            onChange={(e) => onFieldChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Nama belakang</label>
          <Input
            name="lastName"
            defaultValue={settings.lastName}
            onChange={(e) => onFieldChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">Deskripsi hero</label>
        <Textarea
          name="heroDescription"
          defaultValue={settings.heroDescription}
          onChange={(e) => onFieldChange("heroDescription", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Link download CV</label>
          <Input
            name="cvDownloadUrl"
            defaultValue={settings.cvDownloadUrl}
            onChange={(e) => onFieldChange("cvDownloadUrl", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Badge posisi</label>
          <Input
            name="positionBadge"
            defaultValue={settings.positionBadge}
            onChange={(e) => onFieldChange("positionBadge", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">
          URL foto potret (kosongkan untuk pakai foto default)
        </label>
        <Input
          name="portraitImage"
          defaultValue={settings.portraitImage}
          onChange={(e) => onFieldChange("portraitImage", e.target.value)}
          placeholder="https://..."
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Tersimpan.</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </Button>
    </form>
  );
}
