import { type NextRequest, NextResponse } from "next/server";
import { paymentConfig } from "@/lib/payment/config";
import { verifyChallengeToken, createAccessToken } from "@/lib/payment/token";
import { verifyOnChainPayment } from "@/lib/payment/verify";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!paymentConfig.enabled) {
    return NextResponse.json(
      { error: "payment_disabled" },
      { status: 503 },
    );
  }

  let body: { challengeToken?: string; txHash?: string };
  try {
    body = (await request.json()) as { challengeToken?: string; txHash?: string };
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { challengeToken, txHash } = body;
  if (!challengeToken || !txHash) {
    return NextResponse.json(
      { error: "missing_fields", required: ["challengeToken", "txHash"] },
      { status: 400 },
    );
  }

  const challenge = await verifyChallengeToken(challengeToken);
  if (!challenge) {
    return NextResponse.json(
      { error: "invalid_or_expired_challenge" },
      { status: 400 },
    );
  }

  const verification = await verifyOnChainPayment(challenge, txHash);
  if (!verification.ok) {
    return NextResponse.json(
      {
        error: "verification_failed",
        reason: verification.reason,
        challengeId: challenge.challengeId,
      },
      { status: 402 },
    );
  }

  const accessToken = await createAccessToken(
    challenge.challengeId,
    challenge.chain,
  );

  const response = NextResponse.json({
    ok: true,
    challengeId: challenge.challengeId,
    chain: challenge.chain,
    txHash: verification.txHash,
    expires_in_hours: paymentConfig.sessionHours,
    message: "Payment verified. Retry your request with the payment_access cookie.",
  });

  response.cookies.set({
    name: paymentConfig.cookieName,
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: paymentConfig.sessionHours * 3600,
  });

  return response;
}

export function GET() {
  return NextResponse.json({
    method: "POST",
    body: { challengeToken: "string", txHash: "string" },
  });
}
