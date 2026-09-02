import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { legalPages } from "@/db/schema";
import { LegalPageForm } from "../LegalPageForm";
import { updateLegalPage } from "../actions";

export const dynamic = "force-dynamic";

export default async function PrivacyLegalPage() {
  const rows = await db.select().from(legalPages).where(eq(legalPages.slug, "privacy"));
  const page = rows[0];

  if (!page) notFound();

  return (
    <div>
      <h1 className="text-lg font-semibold text-foreground mb-4">Privacy Policy</h1>
      <LegalPageForm action={updateLegalPage.bind(null, "privacy")} page={page} />
    </div>
  );
}
