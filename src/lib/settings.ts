import { prisma } from "@/lib/db";

export const SETTING_PIXEL_CODE = "pixel_code";

export async function getSiteSetting(key: string): Promise<string> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    return row?.value ?? "";
  } catch {
    return "";
  }
}

export async function setSiteSetting(key: string, value: string): Promise<void> {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export const SETTING_PROFIT_PER_ORDER = "profit_per_order";
export const SETTING_CARGO_COMPANIES = "cargo_companies";
export const SETTING_ANNOUNCEMENT_TEXT = "announcement_text";
export const SETTING_ANNOUNCEMENT_ENABLED = "announcement_enabled";
export const SETTING_PACKAGE_BADGE_TEXT = "package_badge_text";
export const SETTING_CONTACT_PHONE = "contact_phone";
export const SETTING_CONTACT_WHATSAPP = "contact_whatsapp";
export const SETTING_ADMIN_NOTE = "admin_note";
export const SETTING_SOUND_NOTIFICATIONS = "sound_notifications";

export async function getSiteSettings(keys: string[]): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return {};
  }
}

export async function setSiteSettings(updates: Record<string, string>): Promise<void> {
  await Promise.all(
    Object.entries(updates).map(([key, value]) =>
      prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } })
    )
  );
}
