'use server';

import { redirect } from 'next/navigation';
import { verifyCredentials, createSession, destroySession } from '@/lib/auth';

export async function login(_: unknown, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
    return { error: 'Email dan password wajib diisi.' };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: 'Email atau password salah.' };
  }

  await createSession(user.email);
  redirect('/dashboard');
}

export async function logout() {
  await destroySession();
  redirect('/login');
}
