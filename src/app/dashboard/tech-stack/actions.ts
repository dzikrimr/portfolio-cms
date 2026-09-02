'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { techStacks } from '@/db/schema';

const UNSAFE_SVG_PATTERN = /<script|on\w+\s*=/i;

const stackSchema = z.object({
  name: z.string().min(1),
  logoSvg: z
    .string()
    .min(1)
    .refine((val) => val.trim().startsWith('<svg'), 'Markup harus berupa tag <svg>...</svg>.')
    .refine((val) => !UNSAFE_SVG_PATTERN.test(val), 'Markup mengandung elemen yang tidak diperbolehkan.'),
});

export async function createTechStack(_: unknown, formData: FormData) {
  const parsed = stackSchema.safeParse({
    name: formData.get('name'),
    logoSvg: formData.get('logoSvg'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || 'Data tidak valid.' };
  }

  const existing = await db.select().from(techStacks);
  await db.insert(techStacks).values({ ...parsed.data, sortOrder: existing.length });

  revalidatePath('/dashboard/tech-stack');
  return { success: true };
}

export async function updateTechStack(id: number, _: unknown, formData: FormData) {
  const parsed = stackSchema.safeParse({
    name: formData.get('name'),
    logoSvg: formData.get('logoSvg'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || 'Data tidak valid.' };
  }

  await db.update(techStacks).set(parsed.data).where(eq(techStacks.id, id));

  revalidatePath('/dashboard/tech-stack');
  return { success: true };
}

export async function deleteTechStack(id: number) {
  await db.delete(techStacks).where(eq(techStacks.id, id));
  revalidatePath('/dashboard/tech-stack');
}
