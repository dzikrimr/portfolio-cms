"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-foreground hover:bg-card transition-colors cursor-pointer"
      >
        <LogOut size={16} className="text-muted-foreground" />
        Keluar
      </button>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Konfirmasi Keluar">
        <p className="text-sm text-muted-foreground mb-4">
          Yakin ingin keluar dari Dspace Admin?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Batal
          </Button>
          <form action={logout}>
            <Button type="submit" variant="danger">
              Ya, Keluar
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
