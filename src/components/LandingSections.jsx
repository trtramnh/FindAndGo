import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Brand, Icon } from './ui';

// SECTION 03 — The Problem
export function ProblemSection() {
  const { strings } = useLanguage();
  const p = strings.problem;

  const problemCards = [
    {
      icon: 'search',
      title: p.card1Title,
      description: p.card1Desc,
      number: '01',
    },
    {
      icon: 'sliders',
      title: p.card2Title,
      description: p.card2Desc,
      number: '02',
    },
    {
      icon: 'users',
      title: p.card3Title,
      description: p.card3Desc,
      number: '03',
    },
  ];

  return (
    <section id="problem" className="section-block section-problem" aria-labelledby="problem-title">
      <div className="shell">
        <div className="section-heading text-center">
          <p className="section-eyebrow">{p.eyebrow}</p>
          <h2 id="problem-title">{p.title}</h2>
          <p className="section-sub">{p.description}</p>
        </div>

        <div className="problem-grid">
          {problemCards.map((card) => (
            <article className="problem-card" key={card.title}>
              <div className="problem-card-header">
                <span className="problem-icon">
                  <Icon name={card.icon} size={22} />
                </span>
                <span className="problem-num">{card.number}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 04 — Introducing FIND&GO
export function IntroducingSection() {
  const { strings } = useLanguage();
  const intro = strings.intro;

  const icons = ['compass', 'sliders', 'map', 'wallet', 'heart'];

  return (
    <section id="introducing" className="section-block section-white section-word" aria-labelledby="intro-title">
      <span className="section-background-word section-background-word-left" aria-hidden="true">
        CONNECT
      </span>
      <div className="shell section-content intro-layout">
        <div className="intro-copy">
          <p className="section-eyebrow">{intro.eyebrow}</p>
          <h2 id="intro-title">{intro.title}</h2>
          <p className="intro-description">{intro.description}</p>

          <div className="intro-points-list">
            {intro.points.map((pt, idx) => (
              <div className="intro-point-item" key={pt.title}>
                <span className="intro-point-icon">
                  <Icon name={icons[idx % icons.length]} size={18} />
                </span>
                <div>
                  <h4>{pt.title}</h4>
                  <p>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="intro-cta-row">
            <a href="#explore" className="btn btn-primary">
              <span>{strings.hero.primaryBtn}</span>
              <Icon name="arrow-right" size={17} />
            </a>
          </div>
        </div>

        <div className="intro-visual">
          <div className="intro-card-stack">
            <div className="intro-stack-card intro-card-1">
              <div className="intro-card-badge">
                <Icon name="compass" size={14} />
                <span>{intro.stack?.card1Badge || 'Purpose-Driven'}</span>
              </div>
              <p className="intro-card-highlight">{intro.stack?.card1Title || 'Solo Study or Group Hangout?'}</p>
              <div className="intro-tag-cloud">
                <span className="active-tag">{intro.stack?.card1Tag1 || 'Quiet Corner'}</span>
                <span>{intro.stack?.card1Tag2 || 'Plugs available'}</span>
                <span>{intro.stack?.card1Tag3 || 'Strong Wi-Fi'}</span>
              </div>
            </div>

            <div className="intro-stack-card intro-card-2">
              <div className="intro-card-badge intro-badge-teal">
                <Icon name="wallet" size={14} />
                <span>{intro.stack?.card2Badge || 'Strict Budget Filters'}</span>
              </div>
              <p className="intro-card-highlight">{intro.stack?.card2Title || 'Transparent Student Pricing'}</p>
              <div className="intro-price-slider">
                <span>{intro.stack?.card2SliderLabel || 'Budget ceiling'}</span>
                <strong>{intro.stack?.card2SliderValue || '< 70,000 VND / person'}</strong>
              </div>
            </div>

            <div className="intro-stack-card intro-card-3">
              <div className="intro-card-badge intro-badge-cyan">
                <Icon name="heart" size={14} />
                <span>{intro.stack?.card3Badge || 'Zero Guesswork'}</span>
              </div>
              <p className="intro-card-highlight">{intro.stack?.card3Title || 'Save, Compare & Go Together'}</p>
              <div className="intro-metric-row">
                <span>{intro.stack?.card3Metric1 || '⚡ Instant Filter'}</span>
                <span>{intro.stack?.card3Metric2 || '📍 Nearby Campus'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 05 — How It Works
export function HowItWorks() {
  const { strings } = useLanguage();
  const hw = strings.howItWorks;

  const steps = [
    {
      num: '01',
      icon: 'compass',
      title: hw.step1Title,
      description: hw.step1Desc,
      tag: hw.step1Tag || 'Step 1',
    },
    {
      num: '02',
      icon: 'sliders',
      title: hw.step2Title,
      description: hw.step2Desc,
      tag: hw.step2Tag || 'Step 2',
    },
    {
      num: '03',
      icon: 'pin',
      title: hw.step3Title,
      description: hw.step3Desc,
      tag: hw.step3Tag || 'Step 3',
    },
  ];

  return (
    <section id="how-it-works" className="section-block section-soft" aria-labelledby="steps-title">
      <div className="shell">
        <div className="section-heading text-center">
          <p className="section-eyebrow">{hw.eyebrow}</p>
          <h2 id="steps-title">{hw.title}</h2>
          <p className="section-sub">{hw.subtitle}</p>
        </div>

        <div className="step-grid">
          <span className="step-connecting-line" aria-hidden="true" />
          {steps.map((step) => (
            <article className="step-card" key={step.title}>
              <div className="step-heading">
                <span className="step-number">{step.num}</span>
                <span className="step-icon">
                  <Icon name={step.icon} size={22} />
                </span>
              </div>
              <span className="step-pill">{step.tag}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 07 — Discover by Purpose
export function DiscoverByPurpose({ onSelectPurpose }) {
  const { strings } = useLanguage();
  const dp = strings.purpose;

  return (
    <section id="purpose" className="section-block section-white" aria-labelledby="purpose-title">
      <div className="shell">
        <div className="section-heading text-center">
          <p className="section-eyebrow">{dp.eyebrow}</p>
          <h2 id="purpose-title">{dp.title}</h2>
          <p className="section-sub">{dp.subtitle}</p>
        </div>

        <div className="purpose-grid">
          {dp.cards.map((card) => (
            <article className="purpose-card" key={card.id}>
              <div className="purpose-card-media">
                <img src={card.img} alt={card.title} loading="lazy" />
                <span className="purpose-badge">{card.tag}</span>
              </div>
              <div className="purpose-card-body">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <a
                  href="#explore"
                  className="purpose-link"
                  onClick={() => onSelectPurpose && onSelectPurpose(card.id)}
                >
                  <span>{dp.exploreCategoryBtn}</span>
                  <Icon name="arrow-right" size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 08 — Why FIND&GO
export function WhyFindAndGo() {
  const { strings } = useLanguage();
  const w = strings.why;

  const cards = [
    { icon: 'compass', title: w.card1Title, desc: w.card1Desc },
    { icon: 'wallet', title: w.card2Title, desc: w.card2Desc },
    { icon: 'plug', title: w.card3Title, desc: w.card3Desc },
    { icon: 'sliders', title: w.card4Title, desc: w.card4Desc },
  ];

  return (
    <section id="why" className="section-block section-soft" aria-labelledby="why-title">
      <div className="shell">
        <div className="section-heading text-center">
          <p className="section-eyebrow">{w.eyebrow}</p>
          <h2 id="why-title">{w.title}</h2>
          <p className="section-sub">{w.subtitle}</p>
        </div>

        <div className="why-grid">
          {cards.map((c) => (
            <article className="why-card" key={c.title}>
              <span className="why-icon">
                <Icon name={c.icon} size={24} />
              </span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 09 — Everyday Use Cases
export function EverydayUseCases() {
  const { strings } = useLanguage();
  const uc = strings.useCases;

  const scenarios = [
    {
      title: uc.card1Title,
      desc: uc.card1Desc,
      badge: uc.card1Badge,
      img: '/assets/cafe-interior.jpg',
      icon: 'book',
    },
    {
      title: uc.card2Title,
      desc: uc.card2Desc,
      badge: uc.card2Badge,
      img: '/assets/friends-bistro.jpg',
      icon: 'utensils',
    },
    {
      title: uc.card3Title,
      desc: uc.card3Desc,
      badge: uc.card3Badge,
      img: '/assets/garden-cafe.jpg',
      icon: 'compass',
    },
  ];

  return (
    <section id="use-cases" className="section-block section-white" aria-labelledby="usecases-title">
      <div className="shell">
        <div className="section-heading text-center">
          <p className="section-eyebrow">{uc.eyebrow}</p>
          <h2 id="usecases-title">{uc.title}</h2>
          <p className="section-sub">{uc.subtitle}</p>
        </div>

        <div className="use-case-grid">
          {scenarios.map((item) => (
            <article className="use-case-card" key={item.title}>
              <div className="use-case-image">
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className="use-case-badge">
                  <Icon name={item.icon} size={14} />
                  <span>{item.badge}</span>
                </span>
              </div>
              <div className="use-case-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="#explore" className="use-case-link">
                  <span>{strings.hero.primaryBtn}</span>
                  <Icon name="chevron-right" size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 10 — FAQ Accordion
export function FaqSection() {
  const { strings } = useLanguage();
  const faq = strings.faq;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-block section-soft" aria-labelledby="faq-title">
      <div className="shell faq-shell">
        <div className="section-heading text-center">
          <p className="section-eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title">{faq.title}</h2>
          <p className="section-sub">{faq.subtitle}</p>
        </div>

        <div className="faq-accordion" role="region" aria-label="FAQ Accordion">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button
                  className="faq-question"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-btn-${index}`}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon-wrap" aria-hidden="true">
                    <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={18} />
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// SECTION 11 — Final Call to Action
export function FinalCta({ onNavigate }) {
  const { strings } = useLanguage();
  const c = strings.cta;

  const handleComingSoon = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/coming-soon');
    } else {
      window.location.href = '/coming-soon';
    }
  };

  return (
    <section className="section-block section-cta-wrap" aria-labelledby="cta-title">
      <div className="shell">
        <div className="cta-panel">
          <span className="cta-noise" aria-hidden="true" />
          <span className="cta-orb cta-orb-left" aria-hidden="true" />
          <span className="cta-orb cta-orb-right" aria-hidden="true" />
          <svg className="cta-art" viewBox="0 0 220 220" aria-hidden="true">
            <circle cx="128" cy="105" r="73" />
            <circle cx="128" cy="105" r="58" strokeDasharray="3 9" />
            <path d="m153 80-14 36-36 14 14-36 36-14Z" />
            <path d="m117 94 22 22M128 22v18m0 130v18M44 105h18m132 0h18" />
            <path d="M45 179s-25-25-25-43a25 25 0 0 1 50 0c0 18-25 43-25 43Z" />
            <circle cx="45" cy="135" r="8" />
          </svg>
          <div className="cta-content">
            <span className="cta-icon">
              <Icon name="compass" size={32} />
            </span>
            <h2 id="cta-title">{c.title}</h2>
            <p>{c.description}</p>
            <div className="cta-actions">
              <a className="btn btn-white" href="#explore">
                {c.primaryBtn}
                <Icon name="arrow-right" size={19} />
              </a>
              <a className="btn btn-glass" href="/coming-soon" onClick={handleComingSoon}>
                {c.secondaryBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SECTION 12 — Footer
export function Footer({ onNavigate }) {
  const { strings } = useLanguage();
  const f = strings.footer;

  const navigateTo = (e, target) => {
    if (target.startsWith('#')) {
      if (window.location.pathname === '/coming-soon') {
        e.preventDefault();
        if (onNavigate) {
          onNavigate('/' + target);
        } else {
          window.location.href = '/' + target;
        }
      }
    } else if (target.startsWith('/coming-soon')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(target);
      } else {
        window.location.href = target;
      }
    }
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="shell footer-shell">
        <div className="footer-columns">
          {/* Col 1: Brand */}
          <div className="footer-col footer-col-brand">
            <a
              href="#hero"
              className="footer-brand-link"
              onClick={(e) => navigateTo(e, '#hero')}
            >
              <Brand size={36} />
            </a>
            <p className="footer-tagline">{f.tagline}</p>
            <p className="footer-credit-line">
              <strong>{f.credit}</strong>
            </p>
          </div>

          {/* Col 2: Explore */}
          <div className="footer-col">
            <h4>{f.colExplore}</h4>
            <ul>
              <li>
                <a href="#hero" onClick={(e) => navigateTo(e, '#hero')}>
                  {f.linkHome}
                </a>
              </li>
              <li>
                <a href="#explore" onClick={(e) => navigateTo(e, '#explore')}>
                  {f.linkDiscover}
                </a>
              </li>
              <li>
                <a href="#purpose" onClick={(e) => navigateTo(e, '#purpose')}>
                  {f.linkCategories}
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => navigateTo(e, '#how-it-works')}>
                  {f.linkHowItWorks}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="footer-col">
            <h4>{f.colSupport}</h4>
            <ul>
              <li>
                <a href="#faq" onClick={(e) => navigateTo(e, '#faq')}>
                  {f.linkFaq}
                </a>
              </li>
              <li>
                <a
                  href="/coming-soon?feature=contact"
                  onClick={(e) => navigateTo(e, '/coming-soon?feature=contact')}
                >
                  {f.linkContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="footer-col">
            <h4>{f.colCompany}</h4>
            <ul>
              <li>
                <a href="#introducing" onClick={(e) => navigateTo(e, '#introducing')}>
                  {f.linkAbout}
                </a>
              </li>
              <li>
                <a
                  href="/coming-soon?feature=privacy"
                  onClick={(e) => navigateTo(e, '/coming-soon?feature=privacy')}
                >
                  {f.linkPrivacy}
                </a>
              </li>
              <li>
                <a
                  href="/coming-soon?feature=terms"
                  onClick={(e) => navigateTo(e, '/coming-soon?feature=terms')}
                >
                  {f.linkTerms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
