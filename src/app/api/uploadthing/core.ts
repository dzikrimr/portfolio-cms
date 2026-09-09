import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getSession } from '@/lib/auth';

const f = createUploadthing();

const requireAdmin = async () => {
  const session = await getSession();
  if (!session) throw new UploadThingError('Unauthorized');
  return { email: session.email };
};

export const uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: '4MB', maxFileCount: 5 },
  })
    .middleware(requireAdmin)
    .onUploadComplete(({ file }) => ({ url: file.ufsUrl })),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
