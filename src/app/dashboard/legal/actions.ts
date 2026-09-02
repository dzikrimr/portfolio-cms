'use server';

import { revalidatePath } from 'next/cache';
import { revalidatePortfolio, PORTFOLIO_PATHS } from '@/lib/revalidate-portfolio';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { legalPages } from '@/db/schema';

const legalSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function updateLegalPage(slug: string, _: unknown, formData: FormData) {
  const parsed = legalSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { error: 'Judul dan konten wajib diisi.' };
  }

  await db
    .update(legalPages)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(legalPages.slug, slug));

  revalidatePath(`/dashboard/legal/${slug}`);

  const portfolioPath = slug === 'privacy' ? PORTFOLIO_PATHS.privacy : PORTFOLIO_PATHS.terms;
  await revalidatePortfolio([portfolioPath]);

  return { success: true };
}
