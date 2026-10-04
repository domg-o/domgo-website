import { useEffect } from 'react';

type AnalyticsProps = {
  enabled: boolean;
  measurementId?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Activates only after the visitor opts in and a valid GA measurement ID exists.
 */
export default function Analytics({ enabled, measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID }: AnalyticsProps) {
  useEffect(() => {
    if (!enabled || !measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return;

    const library = document.createElement('script');
    library.async = true;
    library.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    library.dataset.analytics = 'domgo';

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      anonymize_ip: true,
    });

    document.head.append(library);
    return () => {
      document.querySelectorAll('script[data-analytics="domgo"]').forEach(element => element.remove());
      delete window.gtag;
      delete window.dataLayer;
    };
  }, [enabled, measurementId]);

  return null;
}
