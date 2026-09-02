import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ProjectsDashboardClient } from "./ProjectsDashboardClient";

export const dynamic = "force-dynamic";

export default async function ProjectsDashboardPage() {
  const rows = await db.select().from(projects).orderBy(desc(projects.id));

  return <ProjectsDashboardClient projects={rows} />;
}
