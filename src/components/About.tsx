const socials = [
  { label: '@domg.0 · Instagram', image: '/images/dom-04.jpg', url: 'https://www.instagram.com/domg.0/', accent: 'border-b-[#C13584]' },
  { label: '@domg.o · TikTok', image: '/images/dom-05.jpg', url: 'https://www.tiktok.com/@domg.o', accent: 'border-b-[#25F4EE]' },
  { label: '@domg.o · YouTube', image: '/images/dom-06.jpg', url: 'https://www.youtube.com/@domg.o', accent: 'border-b-[#FF0000]' },
] as const;

export default function About() {
  return <section id="about" className="scroll-mt-20 py-16 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8">
    <div className="grid items-start gap-10 md:grid-cols-[.8fr_1.2fr]">
      <div className="max-w-sm"><img className="aspect-square w-full rounded-sm object-cover" src="/images/dom-03.png" alt="Dom, creator behind @domg.o" /><a href="#contact" className="mt-3 block bg-biro px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-ink">Let&apos;s work together →</a></div>
      <div><p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-biro">About</p><h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-.06em] sm:text-4xl">The personality behind the feed.</h2><blockquote className="my-6 border-l-4 border-biro pl-5 font-serif text-2xl italic leading-tight">“I&apos;m @domg.o, a relatable, personable content creator taking you through my life, from the ups and downs of each stage.”</blockquote><div className="max-w-2xl space-y-4 leading-7 text-ink-soft"><p>My personality is <strong className="text-biro">funny, witty and direct</strong>. I often say what people don&apos;t want to say, and that&apos;s what brings people back to relate to the experiences we all go through.</p><p>I take an audience-first approach: I create briefs that my fans, and yours, actually want to see. My community comes with me everywhere: through uni life and now into work permanently for the first time.</p></div><span className="mt-6 inline-block rounded-full border-2 border-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide">Open to representation</span></div>
    </div>
    <div className="mt-14 grid gap-7 sm:grid-cols-3">{socials.map(({ label, image, url, accent }, i) => <a key={label} href={url} target="_blank" rel="noreferrer" className={`block border border-ink/15 border-b-5 bg-paper-bright p-2 pb-4 shadow-lg transition hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl ${accent} ${i === 0 ? '-rotate-2' : i === 1 ? 'rotate-1' : '-rotate-1'}`}><img className="aspect-[4/5] w-full object-cover" src={image} alt="" /><span className="mt-3 block text-center font-mono text-xs font-bold text-ink-soft">{label}</span></a>)}</div>
  </div></section>;
}
