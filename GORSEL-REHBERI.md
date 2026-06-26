# Harbizehir — Görsel Değiştirme Rehberi

## 📁 Görseller nerede?
Tüm görseller `public/` klasöründe yer alır.

## 🖼️ Hangi görsel neyi değiştiriyor?

| Dosya | Kullanıldığı yer | Boyut önerisi |
|---|---|---|
| `public/harbizehir-sachets-nobg.png` | Ana sayfa Hero bölümü — ürün fotoğrafı (şeffaf arkaplan) | 800x800 px, PNG (şeffaf) |
| `public/harbizehir-sachets.png` | Yedek/alternatif ürün görseli | 800x800 px, PNG |
| `public/hero.jpg` | Eski hero görseli (artık kullanılmıyor) | — |

## 🔧 Görsel nasıl değiştirilir?

1. Yeni görseli `public/` klasörüne at (örn. `public/yeni-gorsel.png`)
2. `src/components/HeroSection.tsx` dosyasını aç
3. Şu satırı bul:
   ```
   src="/harbizehir-sachets-nobg.png"
   ```
4. Yeni dosya adınla değiştir:
   ```
   src="/yeni-gorsel.png"
   ```

## 🎨 Hero arka plan görseli eklemek istersen?
`src/components/HeroSection.tsx` içinde `<section>` tag'ının içindeki `<div className="absolute inset-0 bg-gradient-to-br ...` satırının altına şunu ekleyebilirsin:
```jsx
<Image src="/arkaplan.jpg" alt="" fill className="object-cover opacity-10" />
```

## 🖼️ Logo eklemek istersen?
`src/components/SiteHeader.tsx` (veya navbar) dosyasında marka adının yanına:
```jsx
<Image src="/logo.png" alt="Harbizehir" width={32} height={32} />
```
