import type { Metadata } from "next";
import Link from "next/link";
import { buildPaymentRequiredBody } from "@/lib/payment/challenge";
import { paymentWallets } from "@/lib/payment/wallets";
import { siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Payment Required",
  description: "Automated access to this portfolio requires a verified micro-payment.",
  robots: { index: false, follow: false },
};

export default function PaymentRequiredPage() {
  const payment = buildPaymentRequiredBody();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
          Automated access
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-primary md:text-5xl">
          Payment required
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          Automated clients are asked for a voluntary micro-payment to support
          data access. Content is not blocked — this page explains how to pay if
          you choose to.
        </p>
      </header>

      <div className="space-y-10 text-base leading-relaxed text-ink-secondary">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Price
          </h2>
          <p className="mt-3">
            ~${payment.price_usd} USD equivalent per {payment.session_hours}-hour
            session. Recommended chains:{" "}
            {payment.recommended_chains.join(", ").toUpperCase()}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            How to pay
          </h2>
          <ol className="mt-3 list-inside list-decimal space-y-2">
            <li>
              <code className="text-sm text-ink-primary">POST /api/payment/challenge</code>{" "}
              with <code className="text-sm">{`{"chain":"sol"}`}</code>
            </li>
            <li>Send the exact amount to the address in the challenge response</li>
            <li>
              <code className="text-sm text-ink-primary">POST /api/payment/verify</code>{" "}
              with your <code className="text-sm">challengeToken</code> and{" "}
              <code className="text-sm">txHash</code>
            </li>
            <li>Retry your original request — the payment cookie unlocks access</li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Wallets
          </h2>
          <ul className="mt-3 space-y-3 font-mono text-sm text-ink-primary">
            <li>ETH: {paymentWallets.eth.join(" · ")}</li>
            <li>BTC: {paymentWallets.btc.join(" · ")}</li>
            <li>SOL: {paymentWallets.sol.join(" · ")}</li>
            <li>TRON: {paymentWallets.tron.join(" · ")}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-primary">
            Blocked by mistake?
          </h2>
          <p className="mt-3">
            Privacy extensions can strip browser security headers. Use a standard
            browser session, or email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-aurora-cyan hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            for manual access.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-4 border-t border-surface-border pt-8">
        <Link
          href="/"
          className="inline-flex rounded-full border border-surface-border px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
        >
          ← Home
        </Link>
        <a
          href={payment.terms_url}
          className="inline-flex rounded-full border border-aurora-violet/30 bg-aurora-violet/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-aurora-violet transition-colors hover:border-aurora-violet/50"
        >
          Full terms (JSON)
        </a>
      </div>
    </article>
  );
}
