const eras = [
  { title: 'The student ', accent: 'text-biro', status: 'The foundation', items: ['Relatable, everyday uni-life videos', 'Internship stories and behind-the-scenes', 'Student discounts and deals, incl. repeat Unidays work', 'Budget challenges and cheapest-vs-most-expensive formats'] },
  { title: 'The graduate ', accent: 'text-biro-soft', status: 'Now building', items: ['Going to work for the first time: new routine, new nerves', 'Trying new hobbies now there’s time (and money) for them', 'Budgeting on a first salary, and what actually changes', 'The same honesty, now with real money on the line'] },
] as const;
export default function Community() {
  return <section id="community"
    className="scroll-mt-20 pb-16 sm:pb-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-bold uppercase tracking-[.16em] text-biro">
          The community
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.06em] sm:text-4xl">
          One audience, two eras.
        </h2>
        <p className="mt-4 text-ink-soft">
          Students, aspiring workers and those already in work: a community built over years and growing stronger.
        </p>
      </div>
      <div className="mt-10 grid overflow-hidden rounded-sm border-2 border-ink md:grid-cols-2">
        {eras.map((era, i) => <div key={era.title} className={`p-7 sm:p-10 ${i ? 'bg-ink text-paper' : 'border-b-2 border-ink bg-paper-bright md:border-b-0 md:border-r-2'}`}>
          <span className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${i ? 'bg-biro-soft/20 text-biro-soft' : 'bg-biro/10 text-biro'}`}>
            {era.status}
          </span>
          <h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-.06em]">
            {era.title}
            <span className={era.accent}>
              era
            </span>
          </h3>
          <ul className="mt-5 font-serif text-lg italic">
            {era.items.map(item => <li key={item} className={`border-b border-dashed py-3 ${i ? 'border-paper/20' : 'border-ink/20'}`}>→ {item}</li>)}
          </ul>
        </div>)}
      </div><p className="mt-6 border-2 border-ink border-l-8 border-l-biro bg-paper-bright p-6 text-lg leading-7">
        <strong className="text-biro">
          Why this matters for brands:
        </strong>
        the audience stayed for the personality, not just the deals. That makes this a natural fit for finance, fashion, tech, food &amp; drink and career brands.
      </p>
    </div>
  </section>;
}
