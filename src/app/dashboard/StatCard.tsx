import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: string;
}

export function StatCard({ icon: Icon, label, value, accent }: StatCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 flex items-start gap-3">
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
        style={{ background: accent ?? "var(--card)" }}
      >
        <Icon size={16} className="text-foreground" />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-semibold text-foreground truncate">{value}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      </div>
    </div>
  );
}
