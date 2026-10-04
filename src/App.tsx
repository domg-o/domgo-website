import { useState } from 'react';
import Analytics from './components/Analytics';
import PrivacyPreferences, { getSavedAnalyticsPreference, saveAnalyticsPreference } from './components/PrivacyPreferences';
import Portfolio from './components/portfolio/Portfolio';

export default function App() {
  const [analyticsPreference, setAnalyticsPreference] = useState(getSavedAnalyticsPreference);
  const [privacyOpen, setPrivacyOpen] = useState(analyticsPreference === null);

  const chooseAnalytics = (allowed: boolean) => {
    const nextPreference = allowed ? 'granted' : 'denied';
    saveAnalyticsPreference(nextPreference);
    setAnalyticsPreference(nextPreference);
    setPrivacyOpen(false);
  };

  return (
    <>
      <Analytics enabled={analyticsPreference === 'granted'} />
      <Portfolio onOpenPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyPreferences
        currentPreference={analyticsPreference}
        open={privacyOpen}
        onChoose={chooseAnalytics}
        onClose={() => setPrivacyOpen(false)}
      />
    </>
  );
}
