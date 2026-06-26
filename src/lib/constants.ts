/** WhatsApp: 0536 070 94 77 */
export const WHATSAPP_NUMBER = "905360709477";
export const WHATSAPP_DISPLAY = "0536 070 94 77";

/** Sipariş başına sabit net kâr (TL) */
export const PROFIT_PER_ORDER = 149;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
