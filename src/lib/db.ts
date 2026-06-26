import { PrismaClient } from "@prisma/client";

// PostgreSQL için PrismaClient
function createPrismaClient(): PrismaClient {
  return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * SQLite-uyumlu db.execute() arayüzü — PostgreSQL'e çevirir.
 * SQLite'ın "?" parametrelerini PostgreSQL'in "$1, $2, ..." formatına dönüştürür.
 */
export const db = {
  async execute({ sql, args }: { sql: string; args?: any[] }): Promise<{ rows: any[] }> {
    // ? → $1, $2, $3 ... dönüşümü
    let paramIndex = 0;
    const pgSql = sql.replace(/\?/g, () => `$${++paramIndex}`);

    // "Order" gibi büyük harfli tablo adlarını PostgreSQL için alıntıla (zaten alıntılıysa dokunma)
    const rows = await prisma.$queryRawUnsafe(pgSql, ...(args ?? []));
    return { rows: rows as any[] };
  },
};
