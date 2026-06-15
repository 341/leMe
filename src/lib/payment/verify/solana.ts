import { paymentConfig } from "@/lib/payment/config";
import type { ChallengeTokenPayload } from "@/lib/payment/token";
import type { PaymentVerificationResult } from "@/lib/payment/verify/index";

async function solanaRpc<T>(method: string, params: unknown[]): Promise<T> {
  const heliusKey = paymentConfig.indexerKeys.helius;
  const url = heliusKey
    ? `https://mainnet.helius-rpc.com/?api-key=${heliusKey}`
    : "https://api.mainnet-beta.solana.com";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });

  const data = (await response.json()) as {
    result?: T;
    error?: { message: string };
  };

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result as T;
}

type ParsedTransaction = {
  meta?: {
    err: unknown;
    postBalances: number[];
    preBalances: number[];
  };
  transaction?: {
    message?: {
      accountKeys?: Array<string | { pubkey: string }>;
      instructions?: Array<{
        program?: string;
        programId?: string;
        parsed?: {
          type?: string;
          info?: {
            destination?: string;
            lamports?: number;
            source?: string;
          };
        };
      }>;
    };
  };
};

export async function verifySolanaPayment(
  challenge: ChallengeTokenPayload,
  txHash: string,
): Promise<PaymentVerificationResult> {
  try {
    const tx = await solanaRpc<ParsedTransaction | null>("getTransaction", [
      txHash,
      { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
    ]);

    if (!tx?.meta || tx.meta.err) {
      return { ok: false, reason: "transaction_failed_or_missing" };
    }

    const expectedLamports = Number(challenge.exactAmount);
    const destination = challenge.address;
    const memo = challenge.memo ?? "";

    const instructions = tx.transaction?.message?.instructions ?? [];
    let transferMatch = false;
    let memoMatch = memo.length === 0;

    for (const instruction of instructions) {
      const parsed = instruction.parsed;
      if (parsed?.type === "transfer" && parsed.info?.destination === destination) {
        if (parsed.info.lamports === expectedLamports) {
          transferMatch = true;
        }
      }
    }

    const raw = JSON.stringify(tx);
    if (memo && raw.includes(memo)) {
      memoMatch = true;
    }

    if (transferMatch && memoMatch) {
      return { ok: true, txHash };
    }

    return { ok: false, reason: "amount_address_or_memo_mismatch" };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "solana_verification_error",
    };
  }
}
