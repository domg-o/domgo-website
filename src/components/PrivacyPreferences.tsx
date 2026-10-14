import { useEffect, useRef } from 'react';

export type AnalyticsPreference = 'granted' | 'denied' | null;

const preferenceKey = 'domgo-analytics-preference';

export function getSavedAnalyticsPreference(): AnalyticsPreference {
  try {
    const saved = window.localStorage.getItem(preferenceKey);
    return saved === 'granted' || saved === 'denied' ? saved : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsPreference(preference: Exclude<AnalyticsPreference, null>) {
  try {
    window.localStorage.setItem(preferenceKey, preference);
  } catch {
    // A blocked storage API must not prevent the visitor from using the site.
  }
}

type PrivacyPreferencesProps = {
  currentPreference: AnalyticsPreference;
  open: boolean;
  onChoose: (allowed: boolean) => void;
  onClose: () => void;
};

export default function PrivacyPreferences({ currentPreference, open, onChoose, onClose }: PrivacyPreferencesProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (open && currentPreference !== null) headingRef.current?.focus();
  }, [currentPreference, open]);

  if (!open) return null;

  return (
    <aside className="privacy-panel" aria-labelledby="privacy-title">
      <div className="privacy-panel-inner">
        <span className="mono eyebrow">Privacy choices</span>
        <h2 id="privacy-title" ref={headingRef} tabIndex={-1}>Your privacy choices</h2>
        <p>
          This portfolio uses necessary browser storage to remember your choice. Optional Google Analytics only loads if you allow it, helping Dom understand aggregate visits and which pages are useful.
        </p>
        <details>
          <summary>What optional analytics collects</summary>
          <p>
            When allowed, Google Analytics may process pages viewed, device and browser information, approximate location and referral source. It is configured without advertising signals and is used only to improve this portfolio. You can withdraw permission here at any time.
          </p>
        </details>
        <div className="privacy-actions">
          <button className="button primary" type="button" onClick={() => onChoose(true)}>Allow analytics</button>
          <button className="button" type="button" onClick={() => onChoose(false)}>Use necessary only</button>
          {currentPreference !== null && <button className="privacy-close" type="button" onClick={onClose}>Keep current choice</button>}
        </div>
      </div>
    </aside>
  );
}
