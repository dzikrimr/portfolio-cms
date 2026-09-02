import { db } from "@/db";
import { techStacks } from "@/db/schema";
import { TechStackDashboardClient } from "./TechStackDashboardClient";

export const dynamic = "force-dynamic";

export default async function TechStackDashboardPage() {
  const stacks = await db.select().from(techStacks).orderBy(techStacks.sortOrder);

  return <TechStackDashboardClient stacks={stacks} />;
}
