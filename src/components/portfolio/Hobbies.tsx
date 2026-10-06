import { useState } from 'react';
import { getHobbies, playlistUrl } from './content';
import { ExternalArrow } from './Icons';

const viewsLabel = (views?: number) => views === undefined ? 'Episode' : `${new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 }).format(views)} views`;

export default function Hobbies() {
  const [filter, setFilter] = useState<'popular' | 'recent'>('recent');
  const [feature, ...others] = getHobbies(filter);
  return <section className="section series-section" id="hobbies" aria-labelledby="hobbies-title">
    <div className="wrap">
      <div className="series-heading"><div><span className="mono eyebrow">03 / Outside office hours · 100 Hobbies</span><h2 id="hobbies-title">100 ways to<br /><span>log off.</span></h2></div><p>One hobby an episode. Including the bits that go badly. I’m getting off my phone and trying something new. You can come with me.</p></div>
      <div className="series-toolbar"><div className="series-filters" role="group" aria-label="Filter hobby videos">
        <button type="button" aria-pressed={filter === 'popular'} aria-controls="hobby-videos" onClick={() => setFilter('popular')}>Popular picks</button>
        <button type="button" aria-pressed={filter === 'recent'} aria-controls="hobby-videos" onClick={() => setFilter('recent')}>Episodes</button>
      </div></div>
      <div className="hobby-grid" id="hobby-videos" aria-live="polite" aria-atomic="true">
        {feature ? <><a className="hobby-feature" href={feature.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${feature.name}; opens in a new tab`}>
          <div className="hobby-feature-top mono"><span>{filter === 'popular' ? 'Featured clip' : 'Featured episode'}</span><span>{viewsLabel(feature.views)}</span></div>
          <div className="episode-number">{feature.episode ? String(feature.episode).padStart(2, '0') : '100'}<small>{feature.episode ? '/ 100' : 'hobbies'}</small></div>
          <div><h3>{feature.name}</h3><p>{feature.detail}</p><span className="hobby-watch-label">{feature.url.includes('instagram') ? 'Watch on Instagram' : 'Watch this TikTok'} <ExternalArrow /></span></div>
        </a><div className="hobby-rows">{others.map((item, index) => <a key={item.name} className="hobby-row" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${item.name}; opens in a new tab`}>
          <span className="mono">{String(index + 2).padStart(2, '0')}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><div className="hobby-row-end"><span className="hobby-views mono">{viewsLabel(item.views)}</span><ExternalArrow /></div>
        </a>)}</div></> : <p className="series-empty">New attempts are on the way. In the meantime, <a href={playlistUrl} target="_blank" rel="noopener noreferrer">browse the playlist</a>.</p>}
      </div>
      <div className="series-foot"><a href={playlistUrl} target="_blank" rel="noopener noreferrer">Open the full TikTok playlist <ExternalArrow /></a></div>
    </div>
  </section>;
}
