'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { achievements } from '@/db/schema';
import { TIER_OPTIONS } from './constants';

const achievementSchema = z.object({
  title: z.string().min(1),
  event: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  image: z.string().min(1),
  rank: z.string().min(1),
  tier: z.enum(TIER_OPTIONS),
});

const parseFormData = (formData: FormData) =>
  achievementSchema.safeParse({
    title: formData.get('title'),
    event: formData.get('event'),
    description: formData.get('description'),
    date: formData.get('date'),
    image: formData.get('image'),
    rank: formData.get('rank'),
    tier: formData.get('tier'),
  });

export async function createAchievement(_: unknown, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: 'Data tidak valid. Semua field wajib diisi.' };
  }

  await db.insert(achievements).values(parsed.data);
  revalidatePath('/dashboard/achievements');
  return { success: true };
}

export async function updateAchievement(id: number, _: unknown, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: 'Data tidak valid. Semua field wajib diisi.' };
  }

  await db.update(achievements).set(parsed.data).where(eq(achievements.id, id));
  revalidatePath('/dashboard/achievements');
  return { success: true };
}

export async function deleteAchievement(id: number) {
  await db.delete(achievements).where(eq(achievements.id, id));
  revalidatePath('/dashboard/achievements');
}
