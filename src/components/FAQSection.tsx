"use client";
import { useState } from "react";
import { trackClick } from "@/lib/track";

const FAQS = [
  {
    q: "Harbizehir Stick'in içeriği nedir?",
    a: "Harbizehir; Epimedyum (Horny Goat Weed), Panax Ginseng, Zencefil Kökü ve Keçiboynuzu'nun özel sinerjik karışımından oluşmaktadır. Tüm bileşenler doğal ve bitkisel kökenlidir; koruyucu, yapay renklendirici veya ilaç içermez.",
  },
  {
    q: "Nasıl etki ediyor, mekanizması nedir?",
    a: "Epimedyum, binlerce yıldır Çin geleneksel tıbbında kullanılan güçlü bir bitkidir. İçeriğindeki icariin bileşiği, erkek performansını destekleyen temel etken madde olarak öne çıkmaktadır. Ginseng ve Zencefil bu etkiyi güçlendirirken genel enerji ve kan dolaşımını da destekler.",
  },
  {
    q: "Ne kadar sürede etki gösteriyor?",
    a: "Çoğu kullanıcı aktiviteden 30-45 dakika önce kullandığında etkiyi net şekilde hissetmektedir. Düzenli kullanımda (15-30 gün) genel performans artışı daha belirgin hale gelir.",
  },
  {
    q: "Nasıl kullanılır?",
    a: "Aktiviteden yaklaşık 30-45 dakika önce 1 sticki ağzınızda yavaşça tüketin. Günde 1 defadan fazla kullanmayınız. Su ile birlikte tüketmek, etkiyi güçlendirebilir.",
  },
  {
    q: "Hangi paketler mevcut?",
    a: "3 farklı paket seçeneğimiz var: 12'li Stick (699 TL), 2 Paket 24 Stick (1.000 TL), 3 Paket 36 Stick (1.300 TL). Tüm paketlerde ücretsiz kargo mevcuttur. En çok tercih edilen 2 Paket seçeneğidir.",
  },
  {
    q: "Yan etkisi var mı?",
    a: "İçeriği tamamen bitkisel olduğu için sağlıklı yetişkinlerde yan etki beklenmemektedir. Kalp/tansiyon ilaçları kullananların ya da kronik rahatsızlığı olanların kullanmadan önce doktorlarına danışmasını öneririz.",
  },
  {
    q: "Gizli kargo mu?",
    a: "Evet. Tüm siparişler tamamen nötr, sade paketlerle gönderilmektedir. Dış ambalaj üzerinde ürün adı, marka veya içerik bilgisi yer almaz.",
  },
  {
    q: "İade politikası nedir?",
    a: "Teslimat tarihinden itibaren 14 gün içinde iade hakkınız mevcuttur. Ürünün açılmamış ve orijinal ambalajında olması gerekmektedir. İade talebi için WhatsApp üzerinden iletişime geçebilirsiniz.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [lookupCode, setLookupCode] = useState("");
  const [lookupResult, setLookupResult] = useState<{
    code?: string; statusLabel?: string; packageLabel?: string; createdAt?: string; error?: string;
  } | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;
    setLookupLoading(true);
    setLookupResult(null);
    try {
      const res = await fetch(`/api/orders/lookup?code=${encodeURIComponent(lookupCode.trim())}`);
      const data = await res.json();
      setLookupResult(data);
    } catch {
      setLookupResult({ error: "Bağlantı hatası. Tekrar deneyin." });
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-[#0a0a0a] border-t border-white/5" data-section="sss" id="sss">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400 uppercase tracking-widest mb-4">
            SSS
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3">Merak Ettikleriniz</h2>
          <p className="text-gray-400">Ürün, içerik ve sipariş hakkında sık sorulan sorular.</p>
        </div>

        <div className="space-y-3 mb-12">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="border border-white/8 rounded-xl overflow-hidden"
              style={{ background: "#0f0f0f" }}
            >
              <button
                onClick={() => {
                  setOpen(open === i ? null : i);
                  trackClick("faq_toggle", { index: i });
                }}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                <span className={`text-purple-400 text-xl transition-transform flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sipariş Takip */}
        <div className="bg-[#0f0f18] border border-purple-500/20 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-1">Sipariş Takibi</h3>
          <p className="text-gray-500 text-sm mb-4">Sipariş kodunuzla durumunuzu sorgulayın.</p>
          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              value={lookupCode}
              onChange={(e) => setLookupCode(e.target.value)}
              placeholder="Sipariş kodunuz (örn. HRB-123456)"
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              disabled={lookupLoading}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-50"
            >
              {lookupLoading ? "…" : "Sorgula"}
            </button>
          </form>
          {lookupResult && (
            <div className="mt-4 p-4 rounded-xl bg-[#111] border border-white/5 text-sm">
              {lookupResult.error ? (
                <p className="text-red-400">{lookupResult.error}</p>
              ) : (
                <div className="space-y-1">
                  <p className="text-white font-semibold">Kod: {lookupResult.code}</p>
                  <p className="text-gray-400">Paket: {lookupResult.packageLabel}</p>
                  <p className="text-purple-400 font-bold">Durum: {lookupResult.statusLabel}</p>
                  <p className="text-gray-600 text-xs">Tarih: {lookupResult.createdAt}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
