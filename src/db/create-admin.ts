import 'dotenv/config';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from './index';
import { adminUsers } from './schema';

const email = process.argv[2];
if (!email) {
  console.error('Usage: npx tsx src/db/create-admin.ts <email>');
  process.exit(1);
}

const generatePassword = () => crypto.randomBytes(12).toString('base64url');

const run = async () => {
  const password = generatePassword();
  const passwordHash = await bcrypt.hash(password, 12);

  await db
    .insert(adminUsers)
    .values({ email, passwordHash })
    .onConflictDoUpdate({ target: adminUsers.email, set: { passwordHash } });

  console.log('Admin user created/updated.');
  console.log('Email:', email);
  console.log('Password (save this now, it will not be shown again):', password);
};

run().catch((err) => {
  console.error('Failed to create admin user:', err);
  process.exit(1);
});
