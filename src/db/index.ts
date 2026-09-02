import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type Database = ReturnType<typeof createDatabase>;

const createDatabase = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');
  return drizzle(neon(connectionString), { schema });
};

let instance: Database | undefined;

const getDatabase = () => {
  instance ??= createDatabase();
  return instance;
};

/**
 * Connect on first query rather than on import. `next build` imports every page
 * to collect its config, and secrets are only bound at runtime, so connecting
 * eagerly would fail the build.
 */
export const db = new Proxy({} as Database, {
  get: (_, property: keyof Database) => getDatabase()[property],
});
