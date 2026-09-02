'use server';

import { revalidatePath } from 'next/cache';
import { revalidatePortfolio, PORTFOLIO_PATHS } from '@/lib/revalidate-portfolio';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { siteSettings, heroStats } from '@/db/schema';

const settingsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  heroDescription: z.string().min(1),
  cvDownloadUrl: z.string().min(1),
  positionBadge: z.string().min(1),
  portraitImage: z.string().optional().default(''),
});

export async function updateHeroSettings(_: unknown, formData: FormData) {
  const parsed = settingsSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    heroDescription: formData.get('heroDescription'),
    cvDownloadUrl: formData.get('cvDownloadUrl'),
    positionBadge: formData.get('positionBadge'),
    portraitImage: formData.get('portraitImage') || '',
  });

  if (!parsed.success) {
    return { error: 'Data tidak valid. Pastikan semua field terisi.' };
  }

  await db
    .update(siteSettings)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(siteSettings.id, 1));

  revalidatePath('/dashboard/hero');
  await revalidatePortfolio([PORTFOLIO_PATHS.home]);
  return { success: true };
}

const statSchema = z.object({
  val: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export async function createHeroStat(_: unknown, formData: FormData) {
  const parsed = statSchema.safeParse({
    val: formData.get('val'),
    label: formData.get('label'),
    description: formData.get('description'),
  });

  if (!parsed.success) {
    return { error: 'Data tidak valid.' };
  }

  const existing = await db.select().from(heroStats);
  await db.insert(heroStats).values({ ...parsed.data, sortOrder: existing.length });

  revalidatePath('/dashboard/hero');
  await revalidatePortfolio([PORTFOLIO_PATHS.home]);
  return { success: true };
}

export async function updateHeroStat(id: number, _: unknown, formData: FormData) {
  const parsed = statSchema.safeParse({
    val: formData.get('val'),
    label: formData.get('label'),
    description: formData.get('description'),
  });

  if (!parsed.success) {
    return { error: 'Data tidak valid.' };
  }

  await db.update(heroStats).set(parsed.data).where(eq(heroStats.id, id));

  revalidatePath('/dashboard/hero');
  await revalidatePortfolio([PORTFOLIO_PATHS.home]);
  return { success: true };
}

export async function deleteHeroStat(id: number) {
  await db.delete(heroStats).where(eq(heroStats.id, id));
  revalidatePath('/dashboard/hero');
  await revalidatePortfolio([PORTFOLIO_PATHS.home]);
}
