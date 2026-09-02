import { db } from "@/db";
import { achievements } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AchievementsDashboardClient } from "./AchievementsDashboardClient";

export const dynamic = "force-dynamic";

export default async function AchievementsDashboardPage() {
  const rows = await db.select().from(achievements).orderBy(desc(achievements.date));

  return <AchievementsDashboardClient achievements={rows} />;
}
