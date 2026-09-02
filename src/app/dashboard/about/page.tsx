import { db } from "@/db";
import { aboutSkills } from "@/db/schema";
import { AboutDashboardClient } from "./AboutDashboardClient";

export const dynamic = "force-dynamic";

export default async function AboutDashboardPage() {
  const skills = await db.select().from(aboutSkills).orderBy(aboutSkills.sortOrder);

  return <AboutDashboardClient skills={skills} />;
}
