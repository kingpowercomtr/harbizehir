import { DatabaseSync } from "node:sqlite";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "db.sqlite");
const ADMIN_TOKEN_SECRET = process.env.ADMIN_SECRET || "harbizehir-admin-secret-2026";

console.log("DB_PATH:", DB_PATH);
console.log("DB var mı:", fs.existsSync(DB_PATH));
console.log("ADMIN_TOKEN_SECRET:", ADMIN_TOKEN_SECRET);
console.log("");

function hashPassword(pw) {
  return crypto.createHash("sha256").update(pw + ADMIN_TOKEN_SECRET).digest("hex");
}

const db = new DatabaseSync(DB_PATH);
const row = db.prepare('SELECT * FROM "AdminUser" WHERE username = ?').get("admin");

console.log("Veritabanındaki kayıt:", row);
console.log("");

if (row) {
  const expected = hashPassword("harbizehir2026");
  console.log("DB'deki hash:        ", row.password);
  console.log("'harbizehir2026' hash:", expected);
  console.log("EŞLEŞİYOR MU:", row.password === expected ? "EVET ✅" : "HAYIR ❌");
} else {
  console.log("admin kullanıcısı bulunamadı!");
}

db.close();
