// Extend Window interface for Google Tag Manager
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
