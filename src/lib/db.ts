import { PrismaClient } from "@prisma/client";

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = {
  async execute({ sql, args }: { sql: string; args?: any[] }): Promise<{ rows: any[] }> {
    let paramIndex = 0;
    const pgSql = sql.replace(/\?/g, () => `$${++paramIndex}`);
    const rows = await prisma.$queryRawUnsafe(pgSql, ...(args ?? []));
    return { rows: rows as any[] };
  },
};
