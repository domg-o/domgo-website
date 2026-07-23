const rows = [['Followers', '90,846'], ['Campaign views', '19,243,900'], ['Best TikTok · Rains', '6.1M'], ['Best Reel · Unidays', '1.7M'], ['Overall grade', 'DISTINCTION'], ['Status', 'STUDENT → WORK'], ['Resit required', 'NO']] as const;

export default function Receipt() {
  return <aside aria-label="Creator results statement" className="relative rotate-[1.5deg] border border-ink/15 bg-paper-bright p-6 pl-10 shadow-2xl before:absolute before:inset-y-0 before:left-6 before:w-0.5 before:bg-stamp/60">
    <p className="text-center font-display text-lg font-extrabold uppercase tracking-[-.05em]">Statement of results</p><p className="mt-1 text-center font-mono text-[10px] tracking-wider text-ink-soft">CANDIDATE: DOM · CREATOR STUDIES</p>
    <div className="my-4 border-t-2 border-dashed border-ink" />
    <div className="space-y-2 font-mono text-xs">{rows.map(([label, value], index) => <div key={label} className={`flex items-end gap-2 ${index === 2 || index === 4 ? 'border-t-2 border-dashed border-ink pt-3' : ''}`}><span className={index === 4 ? 'font-bold' : ''}>{label.toUpperCase()}</span><span className="mb-1 flex-1 border-b-2 border-dotted border-ink/40" /><span className={`font-bold ${index === 4 ? 'bg-yellow-200 px-1' : ''}`}>{value}</span></div>)}</div>
    <div className="mx-auto mt-5 flex h-18 w-18 -rotate-6 flex-col items-center justify-center rounded-full border-[3px] border-stamp text-stamp"><b className="font-display text-xl">A*</b><span className="font-mono text-[8px] font-bold tracking-wider">VERIFIED</span></div><p className="mt-3 text-center font-mono text-[9px] tracking-wide text-ink-soft">ORGANIC &amp; PAID · FULL TRANSCRIPT ON REQUEST</p>
  </aside>;
}