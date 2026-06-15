import { isWalletForChain } from "@/lib/payment/wallets";
import type { ChallengeTokenPayload } from "@/lib/payment/token";
import type { PaymentVerificationResult } from "@/lib/payment/verify/index";

type MempoolTx = {
  status?: { confirmed?: boolean };
  vout?: Array<{
    value?: number;
    scriptpubkey_address?: string;
  }>;
};

export async function verifyBitcoinPayment(
  challenge: ChallengeTokenPayload,
  txHash: string,
): Promise<PaymentVerificationResult> {
  try {
    const response = await fetch(`https://mempool.space/api/tx/${txHash}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, reason: "transaction_not_found" };
    }

    const tx = (await response.json()) as MempoolTx;
    const expectedSats = Number(challenge.exactAmount);

    for (const output of tx.vout ?? []) {
      const address = output.scriptpubkey_address ?? "";
      const sats = Math.round((output.value ?? 0) * 1e8);
      if (isWalletForChain("btc", address) && sats === expectedSats) {
        return { ok: true, txHash };
      }
    }

    return { ok: false, reason: "amount_or_address_mismatch" };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "bitcoin_verification_error",
    };
  }
}
