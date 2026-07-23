import Receipt from './Receipt';

export default function Hero() {
  return <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.15fr_.85fr] md:py-24">
    <div>
      <a href="#contact" className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper-bright py-1.5 pl-1.5 pr-4 font-mono text-xs font-bold uppercase tracking-wide transition hover:-translate-y-0.5 hover:shadow-lg"><img className="h-9 w-9 rounded-full border-2 border-ink object-cover" src="/images/dom-01.jpg" alt="" />Open to work · booking now</a>
      <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[.16em] text-biro">Creator media kit · @domg.o · UK</p>
      <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-[-.06em] sm:text-5xl lg:text-6xl">I built a student community.<span className="block text-biro">Now we&apos;re going to work.</span></h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">I&apos;ve built a strong community of students, aspiring workers and those already in work. My personality is <strong className="text-biro">funny, witty and direct</strong> — and that community comes with me, from uni life into work. 90K+ followers and 19.2M+ campaign views.</p>
      <div className="mt-8 flex flex-wrap gap-3"><a href="#work" className="rounded-sm border-2 border-biro bg-biro px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:border-ink hover:bg-ink">See the campaigns</a><a href="#about" className="rounded-sm border-2 border-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider transition hover:-translate-y-0.5 hover:bg-ink hover:text-paper">About Dom</a></div>
    </div>
    <div className="mx-auto w-full max-w-sm md:justify-self-end"><Receipt /></div>
  </section>;
}
