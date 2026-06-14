export const ANALYTICS_CONSENT_KEY = "analytics-consent";
export const COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export type AnalyticsConsentValue = "granted" | "denied";

export function readAnalyticsConsent(): AnalyticsConsentValue | null {
  if (typeof window === "undefined") return null;

  const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

export function writeAnalyticsConsent(value: AnalyticsConsentValue) {
  localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}
