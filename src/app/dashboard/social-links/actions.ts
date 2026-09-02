'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';

const socialSchema = z.object({
  githubUrl: z.string().min(1),
  linkedinUrl: z.string().min(1),
  emailUrl: z.string().min(1),
});

export async function updateSocialLinks(_: unknown, formData: FormData) {
  const parsed = socialSchema.safeParse({
    githubUrl: formData.get('githubUrl'),
    linkedinUrl: formData.get('linkedinUrl'),
    emailUrl: formData.get('emailUrl'),
  });

  if (!parsed.success) {
    return { error: 'Data tidak valid. Semua field wajib diisi.' };
  }

  await db
    .update(siteSettings)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(siteSettings.id, 1));

  revalidatePath('/dashboard/social-links');
  return { success: true };
}
