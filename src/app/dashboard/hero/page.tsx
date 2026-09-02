import { db } from "@/db";
import { siteSettings, heroStats } from "@/db/schema";
import { HeroDashboardClient } from "./HeroDashboardClient";

export const dynamic = "force-dynamic";

export default async function HeroDashboardPage() {
  const [settingsRows, statRows] = await Promise.all([
    db.select().from(siteSettings),
    db.select().from(heroStats).orderBy(heroStats.sortOrder),
  ]);

  return <HeroDashboardClient settings={settingsRows[0]} statRows={statRows} />;
}
