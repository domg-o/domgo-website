import { useState } from 'react';
import Analytics, { isValidMeasurementId } from './components/Analytics';
import PrivacyPreferences, { getSavedAnalyticsPreference, saveAnalyticsPreference } from './components/PrivacyPreferences';
import Portfolio from './components/portfolio/Portfolio';

export default function App() {
  const analyticsConfigured = isValidMeasurementId(import.meta.env.VITE_GA_MEASUREMENT_ID);
  const [analyticsPreference, setAnalyticsPreference] = useState(() => analyticsConfigured ? getSavedAnalyticsPreference() : 'denied');
  const [privacyOpen, setPrivacyOpen] = useState(analyticsConfigured && analyticsPreference === null);

  const chooseAnalytics = (allowed: boolean) => {
    const nextPreference = allowed ? 'granted' : 'denied';
    saveAnalyticsPreference(nextPreference);
    setAnalyticsPreference(nextPreference);
    setPrivacyOpen(false);
  };

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
