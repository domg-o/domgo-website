const links = [['About', '#about'], ['Community', '#community'], ['Brand work', '#work'], ['Contact', '#contact']] as const;

export default function Nav() {
  return <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur">
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
      <a href="#top" aria-label="domg.o home" className="font-display text-xl font-extrabold tracking-[-.08em] sm:text-2xl">domg<span className="text-biro">.o</span></a>
      <nav aria-label="Site" className="hidden md:block"><ul className="flex gap-7 font-mono text-xs font-bold uppercase tracking-wider">{links.map(([label, href]) => <li key={href}><a className="transition-colors hover:text-biro" href={href}>{label}</a></li>)}</ul></nav>
      <a href="#contact" className="flex items-center gap-2 rounded-full border-2 border-ink bg-paper-bright py-1 pl-1 pr-3 font-mono text-[11px] font-bold uppercase tracking-wide transition hover:-translate-y-0.5 hover:bg-biro hover:text-white">
        <img className="h-7 w-7 rounded-full border-2 border-ink object-cover" src="/images/dom-01.jpg" alt="" />
        Open to work
      </a>
    </div>
  </header>;
}