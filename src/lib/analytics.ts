export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

type Gtag = {
  (command: "event", eventName: string, params?: AnalyticsParams): void;
  (command: "js", date: Date): void;
  (command: "config", measurementId: string): void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsParams): void {
  if (typeof window === "undefined") return;

  const eventArgs = ["event", eventName, params] as const;
  const gtag = window.gtag;

  if (typeof gtag === "function") {
    gtag(...eventArgs);
    if (process.env.NODE_ENV !== "production") {
      console.debug("[GA4] event sent", eventName, params);
    }
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventArgs);
  if (process.env.NODE_ENV !== "production") {
    console.debug("[GA4] event queued until gtag is ready", eventName, params);
  }
}
