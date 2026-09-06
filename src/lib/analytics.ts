export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

type Gtag = (
  command: "event",
  eventName: string,
  params?: AnalyticsParams,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", eventName, params);
}
