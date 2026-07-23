"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

type Campaign = { brand: string; category: string; views?: string; detail?: string; description: string; image: string; href: string; tag?: string };

const campaigns: Campaign[] = [
  { brand: 'Rains', category: 'Outerwear · TikTok', views: '11M', detail: 'views · organic + UGC, 3 videos', description: 'Fashion and UGC content for the Danish rainwear brand.', image: '/images/dom-10.jpg', href: 'https://vm.tiktok.com/ZNRouE8Dr/', tag: 'UGC + organic' },
  { brand: 'The Intern', category: 'TV & broadcast · Channel 4.0', description: 'Cast on Channel 4.0’s The Intern alongside Nella, Chloe and HP.', image: '/images/dom-07.jpg', href: 'https://www.youtube.com/watch?v=ZKsDkcCC4yM', tag: 'TV feature' },
  { brand: '“Fed Up” With Rejections', category: 'Press · Newsweek', views: '3.6M', detail: 'views · 392K likes on featured TikTok', description: 'Interviewed by Newsweek after a job-interview TikTok went viral.', image: '/images/dom-08.jpg', href: 'https://www.newsweek.com/gen-z-man-job-rejections-novel-idea-1890664', tag: 'Press feature' },
  { brand: 'Unidays', category: 'Student discounts · Instagram & TikTok', views: '2.4M', detail: 'views across 6 posts', description: 'Repeat work with the student discount platform, right in front of the exact audience I built.', image: '/images/dom-09.jpg', href: 'https://www.instagram.com/reel/DHnkUKGMDAM/', tag: 'Collaboration' },
  { brand: 'Daiu Coventry', category: 'Local spotlight · IG + TikTok', views: '1.9M', detail: 'combined views · both platforms', description: 'An organic spotlight on a Coventry local that landed on both platforms.', image: '/images/dom-11.jpg', href: 'https://www.tiktok.com/@domg.o/video/7644886849533512982', tag: 'Organic' },
  { brand: 'Taco Bell UK', category: 'QSR · TikTok takeover', views: '160K', detail: 'views · 16K+ likes', description: 'Ran the Taco Bell UK TikTok for a day: BTS, store visits and staff takeovers.', image: '/images/dom-12.jpg', href: 'https://www.tiktok.com/@tacobell_uki/video/7374066747470564641', tag: 'Account takeover' },
  { brand: 'Final Round AI', category: 'Career tech · TikTok', views: '190K', detail: 'views · paid partnership', description: 'Career-tech sponsored content that landed with the graduate audience.', image: '/images/dom-13.jpg', href: 'https://www.tiktok.com/@domg.o', tag: 'Sponsored video' },
  { brand: 'Currys × Acer', category: 'Tech · TikTok & Instagram', description: 'A tech partnership and the first step into a category I’m actively growing.', image: '/images/dom-15.jpg', href: 'https://www.instagram.com/domg.0/', tag: 'Sponsored' },
];

function CampaignModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={campaign.brand}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm border-2 border-ink bg-paper-bright sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-content-center rounded-full bg-ink/60 text-white backdrop-blur-sm transition hover:bg-biro"
        >
          ✕
        </button>

        <div className="relative h-56 w-full flex-shrink-0 sm:h-auto sm:w-1/2">
          <img src={campaign.image} alt={campaign.brand} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-7 sm:p-9">
          <div>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
              {campaign.category}
            </p>
            <h3 className="font-display text-2xl font-bold tracking-[-.02em] text-ink">
              {campaign.brand}
            </h3>

            {campaign.views && (
              <div className="mt-4 mb-5">
                <strong className="block font-display text-5xl font-bold tracking-[-.04em] text-biro">
                  {campaign.views}
                </strong>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  {campaign.detail}
                </span>
              </div>
            )}

            <p className="text-sm leading-relaxed text-ink-soft">{campaign.description}</p>

            {campaign.tag && (
              <span className="mt-5 inline-flex w-fit items-center rounded-full border border-stamp/60 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-stamp">
                {campaign.tag}
              </span>
            )}
          </div>

          <a
            href={campaign.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-paper-bright transition hover:bg-biro"
          >
            View the post ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    breakpoints: {
      '(min-width: 1024px)': { active: false }
    }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="work" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-biro">Brand work</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.04em] sm:text-4xl">The results.</h2>
      </div>

      <div className="mx-auto mt-12 max-w-7xl overflow-hidden lg:overflow-visible px-5 pb-6 sm:px-8" ref={emblaRef}>
        <div className="flex touch-pan-y gap-6 lg:grid lg:grid-cols-6 lg:auto-rows-[minmax(260px,auto)]">

          {campaigns.map((campaign, index) => {
            const isTopRow = index < 3;
            const isLastOdd = index === campaigns.length - 1 && (campaigns.length - 3) % 2 !== 0;

            if (isLastOdd) {
              return (
                <article
                  key={campaign.brand}
                  className="group relative flex flex-col overflow-hidden rounded-sm border-2 border-ink bg-paper-bright transition-all duration-300 hover:-translate-y-1 min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] lg:col-span-6 lg:flex-auto"
                >
                  <button
                    type="button"
                    onClick={() => setActiveCampaign(campaign)}
                    className="flex h-full flex-col text-left lg:flex-row"
                    aria-label={`View details for ${campaign.brand}`}
                  >
                    {campaign.image && (
                      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden lg:h-auto lg:w-2/5">
                        <img
                          src={campaign.image}
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <img
                          src={campaign.image}
                          alt={campaign.brand}
                          className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:object-contain"
                        />
                        <span className="absolute bottom-4 right-4 grid h-9 w-9 place-content-center rounded-full bg-ink/50 text-xs text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-biro">
                          +
                        </span>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-center gap-2 p-7 lg:p-9">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                        {campaign.category}
                      </p>
                      <h3 className="font-display text-2xl font-bold tracking-[-.02em] text-ink">
                        {campaign.brand}
                      </h3>
                      <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                        {campaign.description}
                      </p>
                      {campaign.tag && (
                        <span className="mt-2 inline-flex w-fit items-center rounded-full border border-stamp/60 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-stamp">
                          {campaign.tag}
                        </span>
                      )}
                    </div>
                  </button>
                </article>
              );
            }

            return (
              <article
                key={campaign.brand}
                className={`
                  group relative flex flex-col overflow-hidden rounded-sm border-2 border-ink bg-paper-bright
                  transition-all duration-300 hover:-translate-y-1
                  min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%]
                  lg:flex-auto ${isTopRow ? 'lg:col-span-2' : 'lg:col-span-3'}
                `}
              >
                <button
                  type="button"
                  onClick={() => setActiveCampaign(campaign)}
                  className="flex h-full flex-col text-left"
                  aria-label={`View details for ${campaign.brand}`}
                >
                  {campaign.image && (
                    <div className="relative h-48 w-full overflow-hidden sm:h-56">
                      <img
                        src={campaign.image}
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                      />
                      <img
                        src={campaign.image}
                        alt={campaign.brand}
                        className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:object-contain"
                      />
                      <span className="absolute bottom-4 right-4 grid h-9 w-9 place-content-center rounded-full bg-ink/50 text-xs text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-biro">
                        +
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col justify-between gap-4 p-7">
                    <div>
                      <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                        {campaign.category}
                      </p>
                      <h3 className="font-display text-xl font-bold tracking-[-.02em] text-ink">
                        {campaign.brand}
                      </h3>

                      {campaign.views && (
                        <div className="mt-3 mb-3">
                          <strong className="block font-display text-4xl font-bold tracking-[-.04em] text-biro">
                            {campaign.views}
                          </strong>
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink-soft">
                            {campaign.detail}
                          </span>
                        </div>
                      )}

                      <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
                        {campaign.description}
                      </p>
                    </div>

                    {campaign.tag && (
                      <span className="inline-flex w-fit items-center rounded-full border border-stamp/60 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-stamp">
                        {campaign.tag}
                      </span>
                    )}
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3 px-5 lg:hidden">
        {campaigns.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'w-8 bg-ink' : 'w-2.5 bg-ink/20 hover:bg-ink/50'
            }`}
          />
        ))}
      </div>

      {activeCampaign && (
        <CampaignModal campaign={activeCampaign} onClose={() => setActiveCampaign(null)} />
      )}
    </section>
  );
}