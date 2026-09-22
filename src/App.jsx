import { useEffect, useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductPreview from './components/ProductPreview';
import ComingSoonPage from './components/ComingSoonPage';
import {
  ProblemSection,
  IntroducingSection,
  HowItWorks,
  DiscoverByPurpose,
  WhyFindAndGo,
  EverydayUseCases,
  FaqSection,
  FinalCta,
  Footer,
} from './components/LandingSections';

function MainApp() {
  const { lang, strings } = useLanguage();
  const [currentRoute, setCurrentRoute] = useState(() => {
    return {
      path: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
  });
  const [selectedPurpose, setSelectedPurpose] = useState('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute({
        path: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (url) => {
    const u = new URL(url, window.location.origin);
    window.history.pushState({}, '', url);
    setCurrentRoute({
      path: u.pathname,
      search: u.search,
      hash: u.hash,
    });
    if (u.hash) {
      const el = document.querySelector(u.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPurpose = (purposeId) => {
    setSelectedPurpose(purposeId);
    const exploreEl = document.querySelector('#explore');
    if (exploreEl) exploreEl.scrollIntoView({ behavior: 'smooth' });
  };

  // Dedicated Coming Soon Route (/coming-soon or ?page=coming-soon)
  const isComingSoon =
    currentRoute.path === '/coming-soon' ||
    currentRoute.search.includes('page=coming-soon');

  if (isComingSoon) {
    return <ComingSoonPage onNavigate={navigate} />;
  }

  // Complete 12-Section Landing Page
  return (
    <>
      <a className="skip-link" href="#main">
        {lang === 'vi' ? 'Chuyển đến nội dung chính' : 'Skip to main content'}
      </a>

      {/* SECTION 01 — Navigation Bar */}
      <Header onNavigate={navigate} />

      <main id="main">
        {/* SECTION 02 — Hero */}
        <Hero />

        {/* SECTION 03 — The Problem */}
        <ProblemSection />

        {/* SECTION 04 — Introducing FIND&GO */}
        <IntroducingSection />

        {/* SECTION 05 — How It Works */}
        <HowItWorks />

        {/* SECTION 06 — Interactive Product Showcase */}
        <ProductPreview
          externalActivity={selectedPurpose}
          onNavigate={navigate}
        />

        {/* SECTION 07 — Discover by Purpose */}
        <DiscoverByPurpose onSelectPurpose={handleSelectPurpose} />

        {/* SECTION 08 — Why FIND&GO */}
        <WhyFindAndGo />

        {/* SECTION 09 — Everyday Use Cases */}
        <EverydayUseCases />

        {/* SECTION 10 — FAQ */}
        <FaqSection />

        {/* SECTION 11 — Final Call to Action */}
        <FinalCta onNavigate={navigate} />
      </main>

      {/* SECTION 12 — Dark Multi-Column Footer */}
      <Footer onNavigate={navigate} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
