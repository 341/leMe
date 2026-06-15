import { paymentConfig } from "@/lib/payment/config";
import type { ChallengeTokenPayload } from "@/lib/payment/token";
import type { PaymentVerificationResult } from "@/lib/payment/verify/index";

function hexToUtf8(hex: string): string {
  const cleaned = hex.replace(/^0x/, "");
  if (!cleaned) return "";
  let result = "";
  for (let i = 0; i < cleaned.length; i += 2) {
    const code = Number.parseInt(cleaned.slice(i, i + 2), 16);
    if (code === 0) break;
    result += String.fromCharCode(code);
  }
  return result;
}

export async function verifyTronPayment(
  challenge: ChallengeTokenPayload,
  txHash: string,
): Promise<PaymentVerificationResult> {
  try {
    const apiKey = paymentConfig.indexerKeys.trongrid;
    const response = await fetch(
      `https://apilist.tronscanapi.com/api/transaction-info?hash=${encodeURIComponent(txHash)}`,
      {
        headers: apiKey ? { "TRON-PRO-API-KEY": apiKey } : {},
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { ok: false, reason: "tron_transaction_not_found" };
    }

    const tx = (await response.json()) as {
      contractRet?: string;
      toAddress?: string;
      amount?: string;
      contractData?: { data?: string };
      confirmed?: boolean;
    };

    if (tx.contractRet && tx.contractRet !== "SUCCESS") {
      return { ok: false, reason: "transaction_not_successful" };
    }

    const expectedSun = Number(challenge.exactAmount);
    const amount = Number(tx.amount ?? 0);
    const toAddress = (tx.toAddress ?? "").toLowerCase();
    const expectedAddress = challenge.address.toLowerCase();
    const memo = challenge.memo ?? "";

    const addressMatch = toAddress === expectedAddress;
    const amountMatch = amount === expectedSun;
    const memoMatch =
      !memo ||
      JSON.stringify(tx).includes(memo) ||
      hexToUtf8(tx.contractData?.data ?? "").includes(memo);

    if (addressMatch && amountMatch && memoMatch) {
      return { ok: true, txHash };
    }

    return { ok: false, reason: "amount_address_or_memo_mismatch" };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "tron_verification_error",
    };
  }
}
