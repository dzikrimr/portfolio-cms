'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { aboutSkills } from '@/db/schema';

const skillSchema = z.object({
  iconName: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export async function createAboutSkill(_: unknown, formData: FormData) {
  const parsed = skillSchema.safeParse({
    iconName: formData.get('iconName'),
    label: formData.get('label'),
    description: formData.get('description'),
  });

  if (!parsed.success) {
    return { error: 'Data tidak valid.' };
  }

  const existing = await db.select().from(aboutSkills);
  await db.insert(aboutSkills).values({ ...parsed.data, sortOrder: existing.length });

  revalidatePath('/dashboard/about');
  return { success: true };
}

export async function updateAboutSkill(id: number, _: unknown, formData: FormData) {
  const parsed = skillSchema.safeParse({
    iconName: formData.get('iconName'),
    label: formData.get('label'),
    description: formData.get('description'),
  });

  if (!parsed.success) {
    return { error: 'Data tidak valid.' };
  }

  await db.update(aboutSkills).set(parsed.data).where(eq(aboutSkills.id, id));

  revalidatePath('/dashboard/about');
  return { success: true };
}

export async function deleteAboutSkill(id: number) {
  await db.delete(aboutSkills).where(eq(aboutSkills.id, id));
  revalidatePath('/dashboard/about');
}
