"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Sparkles, Layers, FolderKanban, Briefcase, Trophy, Link2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/hero", label: "Hero", icon: User },
  { href: "/dashboard/about", label: "About", icon: Sparkles },
  { href: "/dashboard/tech-stack", label: "Tech Stack", icon: Layers },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/dashboard/achievements", label: "Achievements", icon: Trophy },
  { href: "/dashboard/social-links", label: "Social Links", icon: Link2 },
  { href: "/dashboard/legal", label: "Legal Pages", icon: FileText },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === "/dashboard" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
              isActive
                ? "bg-accent text-accent-foreground font-medium"
                : "text-foreground hover:bg-card"
            )}
          >
            <Icon size={16} className={isActive ? "text-accent-foreground" : "text-muted-foreground"} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
