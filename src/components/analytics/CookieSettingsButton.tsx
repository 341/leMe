"use client";

import { openCookieSettings } from "@/lib/analytics/consent";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink-primary"
    >
      Cookie settings
    </button>
  );
}
