import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { SocialLinksForm } from "./SocialLinksForm";

export const dynamic = "force-dynamic";

export default async function SocialLinksDashboardPage() {
  const rows = await db.select().from(siteSettings);
  const settings = rows[0];

  return (
    <div>
      <h1 className="text-lg font-semibold text-foreground mb-1">Social Links</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Link GitHub, LinkedIn, dan Email yang tampil di sidebar portfolio.
      </p>
      <SocialLinksForm settings={settings} />
    </div>
  );
}
