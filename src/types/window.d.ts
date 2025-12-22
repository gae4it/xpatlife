// Extend Window interface for Google Tag Manager
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;

  __xpatlife_enableAnalytics?: () => void;
  __xpatlife_analytics_enabled?: boolean;
}
