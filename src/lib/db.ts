import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "db.sqlite");

/** SQLite şemasını günceller — prisma migrate olmadan yerel çalışma için */
function ensureDbSchema() {
  if (!fs.existsSync(DB_PATH)) return;
  const sqlite = new Database(DB_PATH);
  const cols = sqlite.prepare("PRAGMA table_info('Order')").all() as { name: string }[];
  const names = new Set(cols.map((c) => c.name));
  if (!names.has("cargoCompany")) sqlite.exec('ALTER TABLE "Order" ADD COLUMN "cargoCompany" TEXT');
  if (!names.has("trackingCode")) sqlite.exec('ALTER TABLE "Order" ADD COLUMN "trackingCode" TEXT');
  if (!names.has("note")) sqlite.exec('ALTER TABLE "Order" ADD COLUMN "note" TEXT');
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS "SiteSetting" (
      "key" TEXT NOT NULL PRIMARY KEY,
      "value" TEXT NOT NULL DEFAULT '',
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS "Visit" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "sessionId" TEXT NOT NULL,
      "ip" TEXT,
      "userAgent" TEXT,
      "browser" TEXT,
      "os" TEXT,
      "device" TEXT,
      "referrer" TEXT,
      "utmSource" TEXT,
      "utmMedium" TEXT,
      "utmCampaign" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS "Event" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "sessionId" TEXT NOT NULL,
      "ip" TEXT,
      "eventType" TEXT NOT NULL,
      "page" TEXT,
      "payload" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  sqlite.close();
}

function createPrismaClient(): PrismaClient {
  ensureDbSchema();
  const adapter = new PrismaBetterSqlite3({ url: `file:${DB_PATH}` });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** libsql-uyumlu db.execute() — Admin API'leri için */
function getBetterSqlite() {
  ensureDbSchema();
  return new Database(DB_PATH);
}

export const db = {
  execute({ sql, args }: { sql: string; args?: any[] }): { rows: any[] } {
    const sqlite = getBetterSqlite();
    try {
      const stmt = sqlite.prepare(sql);
      const isSelect = sql.trim().toUpperCase().startsWith("SELECT") ||
                       sql.trim().toUpperCase().startsWith("PRAGMA");
      if (isSelect) {
        const rows = stmt.all(...(args ?? []));
        return { rows };
      } else {
        stmt.run(...(args ?? []));
        return { rows: [] };
      }
    } finally {
      sqlite.close();
    }
  },
};
