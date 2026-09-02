'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { projects } from '@/db/schema';

const linesToArray = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string()),
  tags: z.array(z.string()).min(1),
  link: z.string().optional().default(''),
});

const parseFormData = (formData: FormData) =>
  projectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    images: linesToArray(formData.get('images')),
    tags: linesToArray(formData.get('tags')),
    link: formData.get('link') || '',
  });

export async function createProject(_: unknown, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: 'Data tidak valid. Judul, deskripsi, dan minimal satu tag wajib diisi.' };
  }

  await db.insert(projects).values(parsed.data);
  revalidatePath('/dashboard/projects');
  return { success: true };
}

export async function updateProject(id: number, _: unknown, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: 'Data tidak valid. Judul, deskripsi, dan minimal satu tag wajib diisi.' };
  }

  await db.update(projects).set(parsed.data).where(eq(projects.id, id));
  revalidatePath('/dashboard/projects');
  return { success: true };
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/dashboard/projects');
}
