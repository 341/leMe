import type { PaymentChain } from "@/lib/payment/config";

export const paymentWallets: Record<PaymentChain, readonly string[]> = {
  eth: [
    "0x4d8Af36e0e5fB78CBB008AEfB5142077b3164568",
    "0x9C2b8aDD6c43B7047d8C9C4907c1FBBcB89D6302",
  ],
  btc: [
    "bc1qwg2agpyscep278qzuft0343c84v9xfksemlhkv",
    "bc1qcsqxzd76y2mv5wyjm9d3k8txeg6t8c5sj2t7sd",
  ],
  sol: [
    "8rkQQrt2Yfxm9JcFPGEpLjGaShzZGYk93esgeUtmZdq6",
    "DyU2KAJ1AyPBu2BaLX2y4WgTy6jPLeXJFvEYwjqb7Nn9",
  ],
  tron: ["TPuTN2n5p3u1zCjtpGn55mXwwh6Wr74iLq"],
};

export function getWalletForChain(
  chain: PaymentChain,
  index = 0,
): string | undefined {
  return paymentWallets[chain][index];
}

export function isWalletForChain(chain: PaymentChain, address: string): boolean {
  const normalized = address.toLowerCase();
  return paymentWallets[chain].some(
    (wallet) => wallet.toLowerCase() === normalized,
  );
}
