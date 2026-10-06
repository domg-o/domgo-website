import { useState } from 'react';

const audiences = {
  TikTok: { ages: [['18–24', 49.8], ['25–34', 36.7], ['35–44', 7], ['45–54', 4.1], ['55+', 2.4]], locations: [['United Kingdom', 40.8], ['United States', 9.2], ['South Africa', 2.4], ['Canada', 2.3]] },
  Instagram: { ages: [['13–17', 4.3], ['18–24', 54.3], ['25–34', 28.8], ['35–44', 6.5], ['45–54', 3.7], ['55+', 2.4]], locations: [['United Kingdom', 41.8], ['United States', 12.8], ['Nigeria', 3.4], ['Canada', 3]] },
} satisfies Record<string, { ages: [string, number][]; locations: [string, number][] }>;

export default function AudienceDetails() {
  const [platform, setPlatform] = useState<keyof typeof audiences>('TikTok');
  const data = audiences[platform];
  return <details className="audience-extra" data-platform={platform.toLowerCase()}><summary>Explore age &amp; location breakdown</summary><div className="audience-filters" role="group" aria-label="Choose an audience platform">{(Object.keys(audiences) as (keyof typeof audiences)[]).map(name => <button key={name} type="button" aria-pressed={name === platform} onClick={() => setPlatform(name)}>{name}</button>)}</div>
    <div className="audience-charts" aria-live="polite" aria-atomic="true"><div><h3>{platform} · Age range</h3>{data.ages.map(([label, value]) => <div className="age-row" key={label}><span>{label}</span><div className="age-track" aria-hidden="true"><div className="age-fill" style={{ width: `${value}%` }} /></div><span className="mono">{value.toFixed(1)}%</span></div>)}</div><div><h3>{platform} · Top locations</h3>{data.locations.map(([label, value]) => <div className="location-row" key={label}><span>{label}</span><span className="mono">{value.toFixed(1)}%</span></div>)}</div></div>
  </details>;
}
