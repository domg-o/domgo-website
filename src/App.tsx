import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Community from './components/Community';
import Stats from './components/Stats';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BrandMarquee from './components/BrandMarquee';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-paper">Skip to content</a>
      <Nav />
      <main id="main"><Hero /><BrandMarquee /><About /><Community /><Stats /><Work /><Contact /></main>
      <Footer />
    </div>
  );
}
