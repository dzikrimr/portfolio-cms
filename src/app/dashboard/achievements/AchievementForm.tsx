"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { AchievementPreview } from "@/components/preview/AchievementPreview";
import { TIER_OPTIONS } from "./constants";
import type { Achievement } from "@/db/schema";

const initialState: { error?: string; success?: boolean } = {};

interface AchievementFormProps {
  action: (state: { error?: string; success?: boolean }, formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  achievement?: Achievement;
  onSuccess?: () => void;
}

export function AchievementForm({ action, achievement, onSuccess }: AchievementFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [preview, setPreview] = useState({
    title: achievement?.title ?? "",
    event: achievement?.event ?? "",
    description: achievement?.description ?? "",
    date: achievement?.date ?? "",
    image: achievement?.image ?? "",
    rank: achievement?.rank ?? "",
    tier: (achievement?.tier ?? "default") as (typeof TIER_OPTIONS)[number],
  });

  useEffect(() => {
    if (state?.success) onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="w-full space-y-6">
      <PreviewFrame label="Preview">
        <AchievementPreview {...preview} />
      </PreviewFrame>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Judul</label>
            <Input
              name="title"
              defaultValue={achievement?.title}
              onChange={(e) => setPreview((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Event</label>
            <Input
              name="event"
              defaultValue={achievement?.event}
              onChange={(e) => setPreview((p) => ({ ...p, event: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Tanggal</label>
            <Input
              name="date"
              type="date"
              defaultValue={achievement?.date}
              onChange={(e) => setPreview((p) => ({ ...p, date: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Rank</label>
            <Input
              name="rank"
              defaultValue={achievement?.rank}
              placeholder="1st Place"
              onChange={(e) => setPreview((p) => ({ ...p, rank: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1">Tier</label>
            <Select
              name="tier"
              defaultValue={achievement?.tier ?? "default"}
              onChange={(e) => setPreview((p) => ({ ...p, tier: e.target.value as (typeof TIER_OPTIONS)[number] }))}
              required
            >
              {TIER_OPTIONS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">URL gambar</label>
            <Input
              name="image"
              defaultValue={achievement?.image}
              placeholder="https://..."
              onChange={(e) => setPreview((p) => ({ ...p, image: e.target.value }))}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs text-muted-foreground mb-1">Deskripsi</label>
            <Textarea
              name="description"
              defaultValue={achievement?.description}
              onChange={(e) => setPreview((p) => ({ ...p, description: e.target.value }))}
              rows={4}
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
