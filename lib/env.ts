/**
 * Resolves the database URL from Vercel / Prisma Postgres env vars.
 * Prisma schema uses DATABASE_URL; Vercel/Prisma often provide POSTGRES_URL.
 * Priority: DATABASE_URL → POSTGRES_URL → PRISMA_DATABASE_URL
 */
export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.PRISMA_DATABASE_URL
  );
}

export function isDatabaseConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}
