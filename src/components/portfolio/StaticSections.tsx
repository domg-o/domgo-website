// Sections from the approved photo-led portfolio design.

export function Hero() {
  return (
<section className="hero"><div className="wrap hero-grid"><div>
      <div className="mono eyebrow">Creator portfolio · UK · 2026</div>
      <h1>Content for the awkward bit between <span>uni and real life.</span></h1>
      <p className="intro">Dom turns early-career chaos, first-job nerves and everyday student truths into social content people actually send to the group chat.</p>
      <div className="actions"><a className="button primary" href="#work">View campaign work</a><a className="button" href="#contact">Start a brief</a></div>
      <div className="hero-metrics"><div><strong>90.8K</strong><span className="mono">Combined following</span></div><div><strong>19.2M</strong><span className="mono">Campaign views</span></div><div><strong>11M</strong><span className="mono">Best campaign</span></div></div>
    </div><figure className="hero-visual"><div className="hero-photo"><img src="/images/dom-05.jpg" width="700" height="933" alt="Dom taking a mirror photo in a clothing store" fetchPriority="high" /></div><figcaption className="hero-caption"><strong>Useful to brands.<br />Natural in-feed.</strong><p>Social-first ideas with a voice already built in.</p></figcaption><span className="hero-photo-index mono" aria-hidden="true">01 / Dominic Go</span></figure></div></section>
  );
}

export function Partners() {
  return (
<section className="partners" aria-labelledby="partners-title"><div className="wrap"><div className="partners-head"><h2 id="partners-title" className="mono eyebrow">Selected partners &amp; appearances</h2><p>A few familiar names on the CV.</p></div><div className="brand-grid">
      <figure className="brand"><div className="logo-pair"><img className="brand-img unidays-icon" src="/portfolio-assets/unidays.png" alt="" /><span className="logo-name unidays-name">UNiDAYS</span></div><figcaption>Repeat partnership</figcaption></figure>
      <figure className="brand"><img className="brand-img" src="/portfolio-assets/rains.svg" alt="Rains" /><figcaption>UGC + organic</figcaption></figure>
      <figure className="brand"><img className="brand-img taco" src="/portfolio-assets/tacobell.png" alt="Taco Bell" /><figcaption>Account takeover</figcaption></figure>
      <figure className="brand"><img className="brand-img" src="/portfolio-assets/currys.svg" alt="Currys" /><figcaption>Brand work</figcaption></figure>
      <figure className="brand"><img className="brand-img acer" src="/portfolio-assets/acer.svg" alt="Acer" /><figcaption>Brand work</figcaption></figure>
      <figure className="brand"><img className="brand-img" src="/portfolio-assets/finalround.svg" alt="Final Round AI" /><figcaption>Sponsored content</figcaption></figure>
      <figure className="brand"><img className="brand-img daiu" src="/portfolio-assets/daiu.png" alt="Daiu" /><figcaption>Coventry feature</figcaption></figure>
      <figure className="brand"><div className="logo-pair"><img className="brand-img ryman" src="/portfolio-assets/ryman.png" alt="" /><span className="logo-name">Ryman</span></div><figcaption>Brand work</figcaption></figure>
      <figure className="brand"><img className="brand-img c4" src="/portfolio-assets/c4-mark.png" alt="C4 Energy" /><figcaption>Brand work</figcaption></figure>
      <figure className="brand"><img className="brand-img channel" src="/portfolio-assets/channel4.svg" alt="Channel 4" /><figcaption>The Intern · cast</figcaption></figure>
      <figure className="brand"><img className="brand-img" src="/portfolio-assets/newsweek.svg" alt="Newsweek" /><figcaption>Press feature</figcaption></figure>
      <figure className="brand"><span className="logo-name common">Make It Common</span><figcaption>Panel guest</figcaption></figure>
    </div></div></section>
  );
}

export function CreatorStory() {
  return (
<section className="section" id="story"><div className="wrap"><div className="story-grid">
      <div className="profile-wrap story-profile"><article className="profile" aria-label="Dom’s creator profile and results">
        <div className="profile-top"><span className="mono">Creator profile</span><span className="mono">Class of figuring it out</span></div>
        <div className="portrait"><img src="/images/dom-03.png" width="600" height="600" alt="Dom’s signature Open to Work portrait" loading="lazy" /></div>
        <div className="profile-name"><strong>Dom</strong><span>@domg.o · creator &amp; graduate</span></div>
        <div className="transcript-title mono">Statement of results</div>
        <div className="transcript-row"><span>Combined following</span><strong>90,846</strong></div>
        <div className="transcript-row"><span>Campaign views</span><strong>19.2M</strong></div>
        <div className="profile-footer"><a className="profile-social" href="https://www.tiktok.com/@domg.o" target="_blank" rel="noopener noreferrer">Meet @domg.o on TikTok ↗</a><span className="stamp">Open to Work</span></div>
      </article><span className="margin-note mono" aria-hidden="true">Portfolio / not your average CV</span></div>
      <div className="story-copy"><span className="mono eyebrow">02 / A little background</span><h2 className="story-title">The CV doesn’t<br />cover this bit.</h2><p>The applications. The rejections. The first-day nerves. I make videos about the parts of growing up that don’t make it onto LinkedIn.</p><div className="timeline"><div className="timeline-row"><span className="mono">Student life</span><p>Uni life, internships and making the student budget stretch.</p></div><div className="timeline-row"><span className="mono">The job hunt</span><p>Trying to get a foot in the door. Finding the funny in the waiting.</p></div><div className="timeline-row"><span className="mono">Grad life</span><p>First jobs, first paycheques and figuring the rest out together.</p></div></div></div></div>
      <section className="press-feature" id="press" aria-labelledby="press-title">
        <div className="press-intro"><span className="mono eyebrow">Press &amp; appearances</span><h3 id="press-title">Beyond<br /> the feed.</h3><p>On screen, in print and in conversation.</p></div>
        <ul className="press-list">
          <li><a className="press-link" href="https://www.youtube.com/watch?v=ZKsDkcCC4yM" target="_blank" rel="noopener noreferrer"><div><span className="mono press-source">Channel 4.0 · Series</span><h4>The Intern</h4></div><span className="press-action"><span className="press-action-label">Watch episode</span><span className="press-arrow" aria-hidden="true">↗</span></span><span className="sr-only">Opens in a new tab</span></a></li>
          <li><a className="press-link" href="https://www.newsweek.com/gen-z-man-job-rejections-novel-idea-1890664" target="_blank" rel="noopener noreferrer"><div><span className="mono press-source">Newsweek · Press</span><h4>The job-rejection story</h4></div><span className="press-action"><span className="press-action-label">Read feature</span><span className="press-arrow" aria-hidden="true">↗</span></span><span className="sr-only">Opens in a new tab</span></a></li>
          <li><a className="press-link" href="https://youtu.be/aTyzfhN1t6g" target="_blank" rel="noopener noreferrer"><div><span className="mono press-source">Make It Common · Conversation</span><h4>Talking it through</h4></div><span className="press-action"><span className="press-action-label">Watch conversation</span><span className="press-arrow" aria-hidden="true">↗</span></span><span className="sr-only">Opens in a new tab</span></a></li>
        </ul>
      </section>
    </div></section>
  );
}

export function Services() {
  return (
<section className="services-section" id="services"><div className="wrap services-grid"><div className="services-intro"><span className="mono eyebrow">03 / What I bring</span><h2>Ready for the<br />next assignment.</h2></div><div className="services"><a className="service" href="#contact"><span className="mono service-number">01</span><div><h3>Brand partnerships &amp; UGC</h3><p>Your product, in a story people recognise. Social content made for the feed and the group chat.</p></div><span className="arrow" aria-hidden="true">↗</span></a><a className="service" href="#contact"><span className="mono service-number">02</span><div><h3>Takeovers &amp; event coverage</h3><p>Hand over the mic. Store visits, behind the scenes and a first-person take on the day.</p></div><span className="arrow" aria-hidden="true">↗</span></a><a className="service" href="#contact"><span className="mono service-number">03</span><div><h3>Student &amp; early-career stories</h3><p>Useful, relatable content for people making their first big adult decisions.</p></div><span className="arrow" aria-hidden="true">↗</span></a></div></div></section>
  );
}

export function Audience() {
  return (
<section className="section" id="audience"><div className="wrap"><div className="audience-head"><div><span className="mono eyebrow">04 / The people in my corner</span><h2>Same group chat.<br />New chapter.</h2></div><p>A community built through student life, now navigating graduation, the job hunt and everything that comes next.</p></div><div className="audience-table"><div className="audience-row"><a className="platform" href="https://www.tiktok.com/@domg.o" target="_blank" rel="noopener noreferrer"><strong>TikTok ↗</strong><span>@domg.o</span></a><div className="data"><strong>72,468</strong><span className="mono">Followers</span></div><div className="data"><strong>5.8%</strong><span className="mono">Engagement</span></div><div className="data"><strong>85.9%</strong><span className="mono">Aged 18–34</span></div></div><div className="audience-row"><a className="platform" href="https://www.instagram.com/domg.0/" target="_blank" rel="noopener noreferrer"><strong>Instagram ↗</strong><span>@domg.0</span></a><div className="data"><strong>18,378</strong><span className="mono">Followers</span></div><div className="data"><strong>6.4%</strong><span className="mono">Engagement</span></div><div className="data"><strong>84.5%</strong><span className="mono">Aged 18–34</span></div></div></div><div className="audience-foot"><p>44–48% UK audience <span>/</span> Students to early-career adults</p><a href="mailto:dominicgoofficial@gmail.com?subject=Media%20kit%20request">Request the full media kit ↗</a></div></div></section>
  );
}

export function Footer({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  return (
<footer><div className="wrap footer-inner"><span>© 2026 Dom · UK-based. Still figuring it out.</span><div className="socials"><button className="footer-link" type="button" onClick={onOpenPrivacy}>Privacy choices</button><a href="https://www.tiktok.com/@domg.o" target="_blank" rel="noopener noreferrer">TikTok ↗</a><a href="https://www.instagram.com/domg.0/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.youtube.com/@domg.o" target="_blank" rel="noopener noreferrer">YouTube ↗</a></div></div></footer>
  );
}
