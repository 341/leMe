export type PaymentChain = "sol" | "tron" | "eth" | "btc";
export type PaymentMode = "soft" | "hard";

function parsePaymentMode(): PaymentMode {
  return process.env.PAYMENT_MODE?.toLowerCase() === "hard" ? "hard" : "soft";
}

const paymentMode = parsePaymentMode();

export const paymentConfig = {
  enabled: process.env.PAYMENT_ENABLED !== "false",
  mode: paymentMode,
  enforced: paymentMode === "hard",
  secret:
    process.env.PAYMENT_ACCESS_SECRET ??
    "dev-only-change-me-set-PAYMENT_ACCESS_SECRET",
  baseUsd: Number.parseFloat(process.env.PAYMENT_BASE_USD ?? "0.05"),
  sessionHours: Number.parseInt(process.env.PAYMENT_SESSION_HOURS ?? "24", 10),
  challengeMinutes: Number.parseInt(
    process.env.PAYMENT_CHALLENGE_MINUTES ?? "60",
    10,
  ),
  cookieName: "payment_access",
  recommendedChains: ["sol", "tron"] as PaymentChain[],
  usdRates: {
    sol: Number.parseFloat(process.env.PAYMENT_RATE_SOL_USD ?? "150"),
    tron: Number.parseFloat(process.env.PAYMENT_RATE_TRON_USD ?? "0.25"),
    eth: Number.parseFloat(process.env.PAYMENT_RATE_ETH_USD ?? "3500"),
    btc: Number.parseFloat(process.env.PAYMENT_RATE_BTC_USD ?? "95000"),
  },
  indexerKeys: {
    helius: process.env.HELIUS_API_KEY,
    trongrid: process.env.TRONGRID_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  },
} as const;
