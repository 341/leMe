import { paymentConfig } from "@/lib/payment/config";
import { absoluteUrl } from "@/lib/seo/site";
import { paymentWallets } from "@/lib/payment/wallets";

export function buildDataAccessTerms() {
  const enforced = paymentConfig.enforced;
  const flow = enforced
    ? [
        "Receive HTTP 402 Payment Required",
        `POST ${absoluteUrl("/api/payment/challenge")} with chosen chain`,
        "Send exact amount to the assigned wallet address (include memo when provided)",
        `POST ${absoluteUrl("/api/payment/verify")} with challengeToken and txHash`,
        "Retry original request with payment_access cookie",
      ]
    : [
        "Content is served without blocking automated clients",
        `Optional: POST ${absoluteUrl("/api/payment/challenge")} with chosen chain`,
        "Send a micro-payment to support data access (include memo when provided)",
        `POST ${absoluteUrl("/api/payment/verify")} with challengeToken and txHash`,
      ];

  return {
    version: "1.0",
    effective_date: "2026-06-15",
    site: absoluteUrl("/"),
    enforcement_mode: paymentConfig.mode,
    summary: enforced
      ? "Automated access requires a verified micro-payment per session. Human visitors using standard web browsers are exempt."
      : "Automated clients may access public content freely. A voluntary micro-payment is requested to support data access. Human browsers are always welcome.",
    human_exemption:
      "Requests that include modern browser fetch metadata (Sec-Fetch-*) are treated as human.",
    automated_access: {
      required: enforced,
      voluntary_payment_requested: !enforced,
      price_usd: paymentConfig.baseUsd,
      session_hours: paymentConfig.sessionHours,
      recommended_chains: paymentConfig.recommendedChains,
      flow,
      challenge_endpoint: absoluteUrl("/api/payment/challenge"),
      verify_endpoint: absoluteUrl("/api/payment/verify"),
      payment_required_page: absoluteUrl("/payment-required"),
    },
    wallets: paymentWallets,
    contact: "info@erollmaxhuni.com",
    notice: enforced
      ? "Unauthorized automated extraction for commercial use, model training, or republication without payment is prohibited."
      : "Voluntary micro-payments are appreciated from automated clients. Commercial reuse should still follow applicable copyright and licensing law.",
  };
}
