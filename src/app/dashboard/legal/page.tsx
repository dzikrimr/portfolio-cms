import Link from "next/link";
import { FileText } from "lucide-react";

export default function LegalDashboardPage() {
  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold text-foreground mb-1">Legal Pages</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Halaman Privacy Policy dan Terms of Service yang tampil publik di portfolio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link
          href="/dashboard/legal/privacy"
          className="border border-border rounded-lg p-4 flex items-center gap-3 hover:bg-card transition-colors"
        >
          <FileText size={18} className="text-muted-foreground" />
          <span className="text-sm text-foreground">Privacy Policy</span>
        </Link>
        <Link
          href="/dashboard/legal/terms"
          className="border border-border rounded-lg p-4 flex items-center gap-3 hover:bg-card transition-colors"
        >
          <FileText size={18} className="text-muted-foreground" />
          <span className="text-sm text-foreground">Terms of Service</span>
        </Link>
      </div>
    </div>
  );
}
