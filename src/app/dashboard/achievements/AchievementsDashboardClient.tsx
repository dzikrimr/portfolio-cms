"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AchievementForm } from "./AchievementForm";
import { createAchievement, updateAchievement, deleteAchievement } from "./actions";
import type { Achievement } from "@/db/schema";

export function AchievementsDashboardClient({ achievements }: { achievements: Achievement[] }) {
  const [modal, setModal] = useState<"new" | Achievement | null>(null);

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-foreground mb-1">Achievements</h1>
        <p className="text-sm text-muted-foreground">{achievements.length} entri.</p>
      </div>

      <button
        type="button"
        onClick={() => setModal("new")}
        className="w-full mb-4 border border-dashed border-border rounded-lg py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors cursor-pointer"
      >
        <Plus size={16} />
        Tambah Achievement
      </button>

      <div className="space-y-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="border border-border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{achievement.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {achievement.event} — {achievement.tier}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" onClick={() => setModal(achievement)}>Edit</Button>
              <form action={deleteAchievement.bind(null, achievement.id)}>
                <Button type="submit" variant="danger">Hapus</Button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal === "new"} onClose={() => setModal(null)} title="Tambah Achievement">
        <AchievementForm action={createAchievement} onSuccess={() => setModal(null)} />
      </Modal>

      <Modal open={modal !== null && modal !== "new"} onClose={() => setModal(null)} title="Edit Achievement">
        {modal && modal !== "new" && (
          <AchievementForm
            action={updateAchievement.bind(null, modal.id)}
            achievement={modal}
            onSuccess={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
