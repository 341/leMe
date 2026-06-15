import { paymentConfig, type PaymentChain } from "@/lib/payment/config";
import { buildDataAccessTerms } from "@/lib/payment/terms";
import { getWalletForChain, paymentWallets } from "@/lib/payment/wallets";
import { createChallengeToken } from "@/lib/payment/token";
import { absoluteUrl } from "@/lib/seo/site";

export type ChallengeDetails = {
  challengeId: string;
  chain: PaymentChain;
  address: string;
  exactAmount: string;
  displayAmount: string;
  memo?: string;
  expiresAt: string;
  challengeToken: string;
};

function randomHex(bytes: number): string {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomSuffix(): number {
  const array = new Uint8Array(2);
  crypto.getRandomValues(array);
  return ((array[0] << 8) | array[1]) % 10_000;
}

function buildExactAmount(chain: PaymentChain): {
  exactAmount: string;
  displayAmount: string;
  memo?: string;
} {
  const suffix = randomSuffix();
  const baseUsd = paymentConfig.baseUsd;
  const rate = paymentConfig.usdRates[chain];
  const uniqueUsd = baseUsd + suffix / 1_000_000;

  switch (chain) {
    case "sol": {
      const sol = uniqueUsd / rate;
      const lamports = Math.ceil(sol * 1_000_000_000);
      return {
        exactAmount: String(lamports),
        displayAmount: `${(lamports / 1_000_000_000).toFixed(9)} SOL`,
      };
    }
    case "tron": {
      const trx = uniqueUsd / rate;
      const sun = Math.ceil(trx * 1_000_000);
      return {
        exactAmount: String(sun),
        displayAmount: `${(sun / 1_000_000).toFixed(6)} TRX`,
      };
    }
    case "eth": {
      const eth = uniqueUsd / rate;
      const wei = BigInt(Math.ceil(eth * 1e18));
      return {
        exactAmount: wei.toString(),
        displayAmount: `${(Number(wei) / 1e18).toFixed(12)} ETH`,
      };
    }
    case "btc": {
      const btc = uniqueUsd / rate;
      const sats = Math.ceil(btc * 1e8);
      return {
        exactAmount: String(sats),
        displayAmount: `${sats} sats`,
      };
    }
  }
}

export async function createPaymentChallenge(
  chain: PaymentChain,
): Promise<ChallengeDetails> {
  const address = getWalletForChain(chain);
  if (!address) {
    throw new Error(`No wallet configured for chain: ${chain}`);
  }

  const challengeId = randomHex(8);
  const { exactAmount, displayAmount, memo: baseMemo } = buildExactAmount(chain);
  const memo =
    chain === "sol" || chain === "tron"
      ? `pay-${challengeId}`
      : baseMemo;
  const expiresInSeconds = paymentConfig.challengeMinutes * 60;
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();

  const challengeToken = await createChallengeToken({
    challengeId,
    chain,
    address,
    exactAmount,
    memo: chain === "sol" || chain === "tron" ? memo : undefined,
    expiresInSeconds,
  });

  return {
    challengeId,
    chain,
    address,
    exactAmount,
    displayAmount,
    memo: chain === "sol" || chain === "tron" ? memo : undefined,
    expiresAt,
    challengeToken,
  };
}

export function buildPaymentRequiredBody() {
  const terms = buildDataAccessTerms();
  return {
    error: "payment_required",
    enforcement_mode: paymentConfig.mode,
    message: paymentConfig.enforced
      ? "Automated access requires a verified micro-payment. Create a challenge, pay the exact amount to a listed wallet, then verify your transaction."
      : "Voluntary micro-payment requested for automated access. Content is not blocked in soft mode.",
    terms_url: absoluteUrl("/.well-known/data-access-terms.json"),
    payment_required_page: absoluteUrl("/payment-required"),
    challenge_endpoint: absoluteUrl("/api/payment/challenge"),
    verify_endpoint: absoluteUrl("/api/payment/verify"),
    price_usd: paymentConfig.baseUsd,
    session_hours: paymentConfig.sessionHours,
    recommended_chains: paymentConfig.recommendedChains,
    wallets: paymentWallets,
    instructions: terms.automated_access.flow,
  };
}

export function buildPaymentRequiredResponse(): Response {
  const body = buildPaymentRequiredBody();
  return new Response(JSON.stringify(body, null, 2), {
    status: 402,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "WWW-Authenticate":
        'Payment realm="erollmaxhuni.com", charset="UTF-8", challenge="/api/payment/challenge", verify="/api/payment/verify"',
    },
  });
}
