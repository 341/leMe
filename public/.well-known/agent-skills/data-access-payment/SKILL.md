---
name: data-access-payment
description: Learn about voluntary micro-payments for automated access to erollmaxhuni.com (soft mode — content not blocked).
---

# Data access payment

Automated access to this site may include a **voluntary** crypto micro-payment request. Content is **not blocked** in soft enforcement mode.

## Terms

`GET /.well-known/data-access-terms.json`

## Flow

1. Request any URL — content is served; bots may see `X-Data-Access-Notice` and payment `Link` headers
2. `POST /api/payment/challenge` with `{ "chain": "sol" | "tron" | "eth" | "btc" }`
3. Send the **exact** amount to the assigned wallet (include memo for SOL/TRON)
4. `POST /api/payment/verify` with `{ "challengeToken", "txHash" }`
5. Retry with the `payment_access` cookie set

## Recommended chains

SOL and TRON — lowest fees for micro-payments.

## Human exemption

Standard browser requests with `Sec-Fetch-*` headers do not require payment.

## Contact

info@erollmaxhuni.com
