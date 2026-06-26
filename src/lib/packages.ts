export type PackageKey = "1" | "2" | "3";

export interface PackageOption {
  key: PackageKey;
  label: string;
  shortLabel: string;
  units: number;
  price: number;
  origPrice: number;
  packageLabel: string;
}

export const PACKAGES: PackageOption[] = [
  {
    key: "1",
    label: "12 Adet Stick",
    shortLabel: "12 Stick",
    units: 12,
    price: 699,
    origPrice: 899,
    packageLabel: "12 Adet Stick Harbizehir",
  },
  {
    key: "2",
    label: "2 Paket (24 Stick)",
    shortLabel: "2 Paket",
    units: 24,
    price: 1000,
    origPrice: 1399,
    packageLabel: "2 Paket Harbizehir (24 Stick)",
  },
  {
    key: "3",
    label: "3 Paket (36 Stick)",
    shortLabel: "3 Paket",
    units: 36,
    price: 1300,
    origPrice: 1899,
    packageLabel: "3 Paket Harbizehir (36 Stick)",
  },
];

export const DEFAULT_PACKAGE_KEY: PackageKey = "1";

/** En avantajlı / en çok tercih edilen paket */
export const POPULAR_PACKAGE_KEY: PackageKey = "2";

export const PACKAGE_MAP: Record<PackageKey, PackageOption> = PACKAGES.reduce(
  (acc, pkg) => {
    acc[pkg.key] = pkg;
    return acc;
  },
  {} as Record<PackageKey, PackageOption>
);

export function getPackage(key: string): PackageOption | undefined {
  return PACKAGE_MAP[key as PackageKey];
}

export function discountPercent(pkg: PackageOption): number {
  return Math.round((1 - pkg.price / pkg.origPrice) * 100);
}

export function formatPrice(amount: number): string {
  return `₺${amount.toLocaleString("tr-TR")}`;
}
