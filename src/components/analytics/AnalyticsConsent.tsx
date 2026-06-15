"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { googleTagId } from "@/lib/analytics/google-tag";
import {
  COOKIE_SETTINGS_EVENT,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsentValue,
} from "@/lib/analytics/consent";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<AnalyticsConsentValue | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = readAnalyticsConsent();
    setConsent(stored);
    setShowBanner(stored === null);
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setShowBanner(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  const accept = () => {
    writeAnalyticsConsent("granted");
    setConsent("granted");
    setShowBanner(false);
  };

  const decline = () => {
    writeAnalyticsConsent("denied");
    setConsent("denied");
    setShowBanner(false);
  };

  return (
    <>
      {consent === "granted" && <GoogleAnalytics gaId={googleTagId} />}

      {showBanner && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-surface-border bg-void/95 p-4 backdrop-blur-xl md:p-6"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2
                id="cookie-consent-title"
                className="font-display text-sm font-semibold text-ink-primary"
              >
                Cookie preferences
              </h2>
              <p
                id="cookie-consent-description"
                className="mt-2 text-sm leading-relaxed text-ink-secondary"
              >
                This site uses a Google Tag to understand traffic and improve
                the portfolio experience. Analytics cookies are only loaded if you
                accept. Read the{" "}
                <a href="/privacy" className="text-aurora-cyan hover:underline">
                  Privacy Policy
                </a>
                . You can change your choice anytime via Cookie settings.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={decline}
                className="rounded-full border border-surface-border px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-secondary transition-colors hover:border-aurora-violet/40 hover:text-ink-primary"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={accept}
                className="rounded-full bg-gradient-to-r from-aurora-violet to-aurora-cyan px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-void"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
