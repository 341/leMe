import type { ChallengeTokenPayload } from "@/lib/payment/token";
import { verifyBitcoinPayment } from "@/lib/payment/verify/bitcoin";
import { verifyEthereumPayment } from "@/lib/payment/verify/ethereum";
import { verifySolanaPayment } from "@/lib/payment/verify/solana";
import { verifyTronPayment } from "@/lib/payment/verify/tron";

export type PaymentVerificationResult =
  | { ok: true; txHash: string }
  | { ok: false; reason: string };

export async function verifyOnChainPayment(
  challenge: ChallengeTokenPayload,
  txHash: string,
): Promise<PaymentVerificationResult> {
  switch (challenge.chain) {
    case "sol":
      return verifySolanaPayment(challenge, txHash);
    case "tron":
      return verifyTronPayment(challenge, txHash);
    case "eth":
      return verifyEthereumPayment(challenge, txHash);
    case "btc":
      return verifyBitcoinPayment(challenge, txHash);
    default:
      return { ok: false, reason: "unsupported_chain" };
  }
}
