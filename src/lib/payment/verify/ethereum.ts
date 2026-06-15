import { paymentConfig } from "@/lib/payment/config";
import { isWalletForChain } from "@/lib/payment/wallets";
import type { ChallengeTokenPayload } from "@/lib/payment/token";
import type { PaymentVerificationResult } from "@/lib/payment/verify/index";

type EtherscanTx = {
  result?: {
    to?: string;
    value?: string;
    isError?: string;
    txreceipt_status?: string;
  };
};

export async function verifyEthereumPayment(
  challenge: ChallengeTokenPayload,
  txHash: string,
): Promise<PaymentVerificationResult> {
  try {
    const apiKey = paymentConfig.indexerKeys.etherscan;
    const url = new URL("https://api.etherscan.io/api");
    url.searchParams.set("module", "proxy");
    url.searchParams.set("action", "eth_getTransactionByHash");
    url.searchParams.set("txhash", txHash);
    if (apiKey) url.searchParams.set("apikey", apiKey);

    const response = await fetch(url, { cache: "no-store" });
    const data = (await response.json()) as EtherscanTx;
    const tx = data.result;

    if (!tx?.to || !tx.value) {
      return { ok: false, reason: "transaction_not_found" };
    }

    if (!isWalletForChain("eth", tx.to)) {
      return { ok: false, reason: "recipient_mismatch" };
    }

    const expected = BigInt(challenge.exactAmount);
    const actual = BigInt(tx.value);

    if (actual !== expected) {
      return { ok: false, reason: "amount_mismatch" };
    }

    return { ok: true, txHash };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "ethereum_verification_error",
    };
  }
}
