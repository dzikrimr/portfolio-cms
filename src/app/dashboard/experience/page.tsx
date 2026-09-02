import { db } from "@/db";
import { experiences } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ExperienceDashboardClient } from "./ExperienceDashboardClient";

export const dynamic = "force-dynamic";

export default async function ExperienceDashboardPage() {
  const rows = await db.select().from(experiences).orderBy(desc(experiences.year));

  return <ExperienceDashboardClient experiences={rows} />;
}
