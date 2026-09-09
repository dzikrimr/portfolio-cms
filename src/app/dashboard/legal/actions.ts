'use server';

import { revalidatePath } from 'next/cache';
import { revalidatePortfolio, PORTFOLIO_PATHS } from '@/lib/revalidate-portfolio';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { legalPages } from '@/db/schema';

const legalSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
});

export async function updateLegalPage(slug: string, _: unknown, formData: FormData) {
  const parsed = legalSchema.safeParse({
    title: formData.get('title'),
    url: formData.get('url'),
  });

  if (!parsed.success) {
    return { error: 'Judul dan link wajib diisi.' };
  }

  await db
    .update(legalPages)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(legalPages.slug, slug));

  revalidatePath(`/dashboard/legal/${slug}`);
  await revalidatePortfolio([PORTFOLIO_PATHS.home]);

  return { success: true };
}
