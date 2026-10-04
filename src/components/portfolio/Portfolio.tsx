import { useEffect } from 'react';
import Header from './Header';
import CampaignWork from './CampaignWork';
import Contact from './Contact';
import { Hero, Partners, CreatorStory, Services, Audience, Footer } from './StaticSections';

type PortfolioProps = {
  onOpenPrivacy: () => void;
};

export default function Portfolio({ onOpenPrivacy }: PortfolioProps) {
  useEffect(() => {
    // React mounts after the initial document, so resolve incoming section links here.
    const fragment = window.location.hash.slice(1);
    if (!fragment) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <div id="top"><Hero /></div>
        <Partners />
        <CampaignWork />
        <div id="about"><CreatorStory /></div>
        <div id="formats"><Services /></div>
        <Audience />
        <Contact />
      </main>
      <Footer onOpenPrivacy={onOpenPrivacy} />
    </>
  );
}
