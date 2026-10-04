import { useState } from 'react';

const campaigns = [
  { brand: 'Rains', title: ['Useful, quick', 'and very wet.'], result: '11M', label: 'Campaign views · three videos', type: 'UGC + organic · TikTok', description: 'Three videos for the Danish rainwear brand. Everyday situations, a little humour and a product with an actual part to play.', image: 'dom-10.jpg', link: 'https://vm.tiktok.com/ZNRouE8Dr/', action: 'Watch the Rains post' },
  { brand: 'UNiDAYS', title: ['A student budget.', 'A familiar face.'], result: '2.4M', label: 'Campaign views · six posts', type: 'Repeat partnership · Instagram + TikTok', description: 'Six posts for people who know their student discount by heart. A repeat partnership built around the realities of student life.', image: 'dom-09.jpg', link: 'https://www.instagram.com/reel/DHnkUKGMDAM/', action: 'Watch the UNiDAYS post' },
  { brand: 'Daiu Coventry', title: ['A local spot.', 'A bigger conversation.'], result: '1.9M', label: 'Campaign views', type: 'Organic local feature · Instagram + TikTok', description: 'A Coventry spotlight that travelled far beyond Coventry. Food, a first-person perspective and a reason to share it with a friend.', image: 'dom-11.jpg', link: 'https://www.tiktok.com/@domg.o/video/7644886849533512982', action: 'Watch the Daiu post' },
  { brand: 'Final Round AI', title: ['The job hunt,', 'without the homework.'], result: '190K', label: 'Campaign views', type: 'Sponsored video · TikTok', description: 'Career-tech content for people in the middle of applications, interviews and working out their next move.', image: 'dom-13.jpg', link: 'https://www.tiktok.com/@domg.o', action: 'Visit Dom’s TikTok' },
  { brand: 'Taco Bell UK', title: ['Clocking in.', 'Taking over.'], result: '160K', label: 'Views · 16K likes', type: 'Account takeover · TikTok', description: 'Behind the scenes, store visits and staff content. A shift with Taco Bell UK, seen through Dom’s eyes.', image: 'dom-12.jpg', link: 'https://www.tiktok.com/@tacobell_uki/video/7374066747470564641', action: 'Watch the Taco Bell post' },
] as const;

type Campaign = typeof campaigns[number];

function CampaignImage({ campaign }: { campaign: Campaign }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className="case-media" aria-busy={status === 'loading'}>
      {status === 'loading' && <div className="case-image-loading" aria-hidden="true" />}
      {status !== 'error' ? (
        <img src={`/images/${campaign.image}`} alt={`${campaign.brand} campaign video still`} width="700" height="700" onLoad={() => setStatus('loaded')} onError={() => setStatus('error')} />
      ) : (
        <div className="case-image-error" role="status">
          <p>The campaign preview couldn’t load.</p>
          <p>Use the campaign link beside this preview.</p>
        </div>
      )}
      <span className="case-badge mono">{campaign.type}</span>
    </div>
  );
}

export default function CampaignWork() {
  const [selected, setSelected] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const campaign = campaigns[selected];

  return (
    <section className="section work" id="work">
      <div className="wrap">
        <div className="section-head">
          <span className="mono eyebrow">01 / Work experience</span>
          <div><h2>The work behind<br />“Open to Work”.</h2><p>From student discounts to the first job hunt. Brand stories that fit into real life, with the results to show for them.</p></div>
        </div>
        <article className="case-study" aria-labelledby="case-title" id="campaign-detail">
          <CampaignImage key={campaign.brand} campaign={campaign} />
          <div className="case-copy">
            <span className="mono eyebrow">{String(selected + 1).padStart(2, '0')} / {campaign.brand}</span>
            <h3 id="case-title" aria-label={campaign.title.join(' ')}>{campaign.title[0]}<br />{campaign.title[1]}</h3>
            <strong className="case-result">{campaign.result}</strong>
            <span className="mono result-label">{campaign.label}</span>
            <p className="case-description">{campaign.description}</p>
            <a className="case-link" href={campaign.link} target="_blank" rel="noopener noreferrer"><span>{campaign.action}</span><span className="arrow" aria-hidden="true">↗</span></a>
          </div>
        </article>
        <div className="case-list" role="group" aria-label="Select a campaign">
          {campaigns.map((item, index) => (
            <button key={item.brand} type="button" aria-label={`${item.brand}, ${item.result} views`} aria-pressed={selected === index} aria-controls="campaign-detail" onClick={() => {
              if (selected === index) return;
              setSelected(index);
              setAnnouncement(`Showing ${item.brand} campaign. ${item.result} views.`);
            }}><strong>{item.brand}</strong><span className="mono">{item.result} views</span></button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{announcement}</p>
      </div>
    </section>
  );
}
