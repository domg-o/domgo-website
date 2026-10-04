const brands = [
  ['UNiDAYS', 'unidays.com'], ['RAINS', 'rains.com'], ['Taco Bell', 'tacobell.co.uk'], ['Currys', 'currys.co.uk'], ['acer', 'acer.com'], ['Final Round AI', 'finalroundai.com'], ['Daiu Coventry', 'daiucoventry.com'], ['RYMAN', 'ryman.co.uk'], ['C4 ENERGY', 'c4energy.com'], ['Channel 4', 'channel4.com'], ['Newsweek', 'newsweek.com'], ['Make It Common', 'makeitcommon.com'],
] as const;

function BrandMarks({ hidden = false }: { hidden?: boolean }) {
  return <div aria-hidden={hidden || undefined} className="brand-track">{brands.map(([name, domain]) => <div className="brand-mark" key={`${name}-${hidden ? 'copy' : 'original'}`}><img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt="" /><span>{name}</span></div>)}</div>;
}

export default function BrandMarquee() {
  return <section aria-label="Selected partners" className="logo-rail"><p>Selected partners</p><div className="logo-window"><BrandMarks /><BrandMarks hidden /></div></section>;
}
