import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/LogoutButton";
import { SidebarNav } from "@/components/SidebarNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 w-56 border-r border-border flex flex-col bg-background">
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Dspace Admin</span>
          <ThemeToggle />
        </div>

        <SidebarNav />

        <div className="p-2 border-t border-border">
          <LogoutButton />
        </div>
      </aside>

      <main className="ml-56 px-8 py-8 min-h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
