import { useState } from 'react';

type Project = { brand: string; type: string; result: string; detail: string; image: string; href: string; };

const projects: Project[] = [
  { brand: 'Rains', type: 'UGC + organic · TikTok', result: '11M views', detail: 'Three videos for the Danish rainwear brand. Useful, quick and very wet.', image: '/images/dom-10.jpg', href: 'https://vm.tiktok.com/ZNRouE8Dr/' },
  { brand: 'Unidays', type: 'Repeat partnership · IG + TikTok', result: '2.4M views', detail: 'Six posts, made for the people who check their bank balance before brunch.', image: '/images/dom-09.jpg', href: 'https://www.instagram.com/reel/DHnkUKGMDAM/' },
  { brand: 'Daiu Coventry', type: 'Organic local feature · IG + TikTok', result: '1.9M views', detail: 'A Coventry spotlight that travelled far beyond Coventry.', image: '/images/dom-11.jpg', href: 'https://www.tiktok.com/@domg.o/video/7644886849533512982' },
  { brand: 'Final Round AI', type: 'Sponsored video · TikTok', result: '190K views', detail: 'Career-tech content that did not make career-tech feel like homework.', image: '/images/dom-13.jpg', href: 'https://www.tiktok.com/@domg.o' },
  { brand: 'Taco Bell UK', type: 'Account takeover · TikTok', result: '160K views · 16K likes', detail: 'Behind the scenes, store visits and staff content for Taco Bell UK.', image: '/images/dom-12.jpg', href: 'https://www.tiktok.com/@tacobell_uki/video/7374066747470564641' },
];

const culture = [
  ['Newsweek', '3.6M-view story', 'https://www.newsweek.com/gen-z-man-job-rejections-novel-idea-1890664'],
  ['Channel 4.0', 'The Intern cast', 'https://www.youtube.com/watch?v=ZKsDkcCC4yM'],
  ['Make It Common', 'Panel guest', 'https://youtu.be/aTyzfhN1t6g?si=7v1ti439jMPSV0_v'],
] as const;

export default function Work() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return <section id="work" className="scroll-mt-20 py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="reveal flex flex-wrap items-end justify-between gap-6"><div><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-biro">Selected work</p><h2 className="mt-3 font-display text-4xl leading-[1.02] tracking-[-.065em] sm:text-6xl">The ones that<br /><span className="text-biro">landed.</span></h2></div><p className="max-w-sm text-sm leading-6 text-ink-soft">A few standout pieces. Click into the posts and see why they travelled.</p></div>
    <div className="reveal campaign-stage mt-12"><div className="campaign-image"><img src={project.image} alt={`${project.brand} campaign`} /><span>{project.type}</span></div><div className="campaign-detail"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-biro">Campaign result</p><h3>{project.brand}</h3><strong>{project.result}</strong><p>{project.detail}</p><a href={project.href} target="_blank" rel="noreferrer">Watch the post <span>↗</span></a></div></div>
    <div className="reveal campaign-selector mt-4" aria-label="Select a campaign">{projects.map((item, index) => <button key={item.brand} type="button" onClick={() => setSelected(index)} className={selected === index ? 'is-active' : ''} aria-pressed={selected === index}><img src={item.image} alt="" /><span><b>{item.brand}</b><em>{item.result}</em></span></button>)}</div>
    <div className="reveal mt-14 border-t-2 border-ink pt-7"><div className="flex flex-wrap items-baseline justify-between gap-4"><p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-biro">Also spotted outside the feed</p><p className="font-serif text-lg italic text-ink-soft">Press, panels and proper conversations.</p></div><div className="mt-6 grid divide-y-2 divide-ink border-y-2 border-ink md:grid-cols-3 md:divide-x-2 md:divide-y-0">{culture.map(([name, result, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" className="group p-5 transition hover:bg-yellow-200"><strong className="block font-display text-lg tracking-[-.05em]">{name} <span className="text-biro">↗</span></strong><span className="mt-3 block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">{result}</span></a>)}</div></div>
  </div></section>;
}
