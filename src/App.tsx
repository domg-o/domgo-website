import { useEffect, useState } from 'react';
import Analytics, { isValidMeasurementId } from './components/Analytics';
import PrivacyPreferences, { getSavedAnalyticsPreference, saveAnalyticsPreference } from './components/PrivacyPreferences';
import Portfolio from './components/portfolio/Portfolio';
import LegalPage from './components/portfolio/LegalPage';

export default function App() {
  const route = window.location.pathname.replace(/\/+$/u, '') || '/';
  const legalPage = route === '/privacy' ? 'privacy' : route === '/terms' ? 'terms' : null;
  const analyticsConfigured = isValidMeasurementId(import.meta.env.VITE_GA_MEASUREMENT_ID);
  const [analyticsPreference, setAnalyticsPreference] = useState(() => analyticsConfigured ? getSavedAnalyticsPreference() : 'denied');
  const [privacyOpen, setPrivacyOpen] = useState(analyticsConfigured && analyticsPreference === null);

  const chooseAnalytics = (allowed: boolean) => {
    const nextPreference = allowed ? 'granted' : 'denied';
    saveAnalyticsPreference(nextPreference);
    setAnalyticsPreference(nextPreference);
    setPrivacyOpen(false);
  };

  useEffect(() => {
    if (!legalPage) return;
    const title = legalPage === 'privacy' ? 'Privacy Policy · Domg.o' : 'Terms of Use · Domg.o';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      legalPage === 'privacy'
        ? 'Privacy policy for Domgo, the creator portfolio of Dominic George-Oppong.'
        : 'Terms of Use for Domgo, the creator portfolio of Dominic George-Oppong.',
    );
  }, [legalPage]);

  if (legalPage) return <LegalPage page={legalPage} />;

  return (
    <>
      <Analytics enabled={analyticsPreference === 'granted'} />
      <Portfolio onOpenPrivacy={analyticsConfigured ? () => setPrivacyOpen(true) : undefined} />
      <PrivacyPreferences
        currentPreference={analyticsPreference}
        open={privacyOpen}
        onChoose={chooseAnalytics}
        onClose={() => setPrivacyOpen(false)}
      />
    </>
  );
}
