import { type NextRequest, NextResponse } from "next/server";
import {
  createPaymentChallenge,
  buildPaymentRequiredBody,
} from "@/lib/payment/challenge";
import { paymentConfig, type PaymentChain } from "@/lib/payment/config";

export const dynamic = "force-dynamic";

const validChains = new Set<PaymentChain>(["sol", "tron", "eth", "btc"]);

export async function POST(request: NextRequest) {
  if (!paymentConfig.enabled) {
    return NextResponse.json(
      { error: "payment_disabled" },
      { status: 503 },
    );
  }

  let body: { chain?: string };
  try {
    body = (await request.json()) as { chain?: string };
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const chain = body.chain as PaymentChain;
  if (!chain || !validChains.has(chain)) {
    return NextResponse.json(
      {
        error: "invalid_chain",
        allowed: [...validChains],
        recommended: paymentConfig.recommendedChains,
      },
      { status: 400 },
    );
  }

  try {
    const challenge = await createPaymentChallenge(chain);
    return NextResponse.json({
      ...challenge,
      terms: buildPaymentRequiredBody().terms_url,
      instructions: [
        `Send exactly ${challenge.displayAmount} to ${challenge.address}`,
        challenge.memo ? `Include memo: ${challenge.memo}` : "Send the exact unique amount shown",
        "POST the challengeToken and txHash to /api/payment/verify",
      ],
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "challenge_failed",
        message: error instanceof Error ? error.message : "unknown_error",
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    method: "POST",
    body: { chain: "sol | tron | eth | btc" },
    recommended: paymentConfig.recommendedChains,
    price_usd: paymentConfig.baseUsd,
  });
}
