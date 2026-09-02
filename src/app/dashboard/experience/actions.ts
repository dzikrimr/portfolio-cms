'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { experiences } from '@/db/schema';

const linesToArray = (value: FormDataEntryValue | null) =>
  String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const experienceSchema = z.object({
  year: z.string().min(1),
  command: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  output: z.array(z.string()).min(1),
  image: z.string().optional().default(''),
  skills: z.array(z.string()).min(1),
});

const parseFormData = (formData: FormData) =>
  experienceSchema.safeParse({
    year: formData.get('year'),
    command: formData.get('command'),
    title: formData.get('title'),
    company: formData.get('company'),
    location: formData.get('location'),
    description: formData.get('description'),
    output: linesToArray(formData.get('output')),
    image: formData.get('image') || '',
    skills: linesToArray(formData.get('skills')),
  });

export async function createExperience(_: unknown, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: 'Data tidak valid. Semua field wajib kecuali gambar.' };
  }

  await db.insert(experiences).values(parsed.data);
  revalidatePath('/dashboard/experience');
  return { success: true };
}

export async function updateExperience(id: number, _: unknown, formData: FormData) {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: 'Data tidak valid. Semua field wajib kecuali gambar.' };
  }

  await db.update(experiences).set(parsed.data).where(eq(experiences.id, id));
  revalidatePath('/dashboard/experience');
  return { success: true };
}

export async function deleteExperience(id: number) {
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidatePath('/dashboard/experience');
}
