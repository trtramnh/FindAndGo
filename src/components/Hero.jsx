import { useLanguage } from '../context/LanguageContext';
import { Icon } from './ui';

const words = ['Coffee', 'Study', 'Food', 'Hangout', 'Friends', 'Explore', 'Budget', 'Nearby'];

export default function Hero() {
  const { strings } = useLanguage();
  const h = strings.hero;

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />
      <div className="hero-glow hero-glow-center" aria-hidden="true" />
      <div className="hero-word" aria-hidden="true">DISCOVER</div>

      <div className="shell hero-content">
        {/* Status / Category Badge */}
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>{h.badge}</span>
        </div>

        {/* Headline */}
        <h1>
          {h.titleLine1}{' '}
          <span className="hero-gradient">{h.titleGradient}</span>
        </h1>

        {/* Description */}
        <p className="hero-description">{h.description}</p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a href="#explore" className="btn btn-primary btn-hero">
            {h.primaryBtn}
            <Icon name="arrow-right" size={18} />
          </a>
          <a href="#how-it-works" className="btn btn-secondary btn-hero">
            {h.secondaryBtn}
            <Icon name="chevron-right" size={18} />
          </a>
        </div>

        {/* Audience / Support Note */}
        <p className="hero-support">{h.support}</p>

        {/* Value Attributes */}
        <div className="hero-attributes">
          <span>
            <Icon name="compass" size={16} />
            {h.attrPurpose}
          </span>
          <span>
            <Icon name="wallet" size={16} />
            {h.attrBudget}
          </span>
          <span>
            <Icon name="pin" size={16} />
            {h.attrNearby}
          </span>
        </div>

        {/* Modern Marquee */}
        <div className="marquee" aria-label={(h.marqueeWords || words).join(', ')}>
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {(h.marqueeWords || words).map((word) => (
                  <span key={word}>
                    {word}
                    <i />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Realistic UI Mockup (DisNote style) */}
      <div className="shell hero-mockup-wrap">
        <div className="hero-mockup-frame">
          <div className="hero-mockup-topbar">
            <div className="hero-mockup-dots" aria-hidden="true">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="hero-mockup-address">
              <Icon name="lock" size={12} />
              <span>findandgo.app/explore</span>
            </div>
            <div className="hero-mockup-tag">
              <Icon name="sparkles" size={13} />
              <span>{h.mockup?.smartMatch || 'Smart Match'}</span>
            </div>
          </div>

          <div className="hero-mockup-content">
            <div className="mockup-header-row">
              <div className="mockup-search-preview">
                <Icon name="search" size={15} />
                <span>{h.mockup?.searchPlaceholder || 'Quiet study cafés with fast Wi-Fi and outlets...'}</span>
              </div>
              <div className="mockup-pill-group">
                <span className="mockup-pill is-active">{h.mockup?.pillStudy || 'Study'}</span>
                <span className="mockup-pill">{h.mockup?.pillBudget || 'Under 70k'}</span>
                <span className="mockup-pill">{h.mockup?.pillDistance || '< 2 km'}</span>
              </div>
            </div>

            <div className="mockup-cards-row">
              <div className="mockup-card">
                <div className="mockup-card-img">
                  <img src="/assets/cafe-interior.jpg" alt="Study Cafe" />
                  <span className="mockup-card-badge">{h.mockup?.card1Badge || 'Top Match · 98%'}</span>
                </div>
                <div className="mockup-card-body">
                  <h4>{h.mockup?.card1Title || 'The Little Corner'}</h4>
                  <p>{h.mockup?.card1Desc || 'Quiet ambient, natural light, abundant desk sockets'}</p>
                  <div className="mockup-card-meta">
                    <span><Icon name="wifi" size={12} /> {h.mockup?.card1Wifi || 'Fast Wi-Fi'}</span>
                    <span><Icon name="plug" size={12} /> {h.mockup?.card1Outlets || 'Outlets'}</span>
                    <strong>{h.mockup?.card1Price || '~ 35k–65k VND'}</strong>
                  </div>
                </div>
              </div>

              <div className="mockup-card">
                <div className="mockup-card-img">
                  <img src="/assets/friends-bistro.jpg" alt="Dining Bistro" />
                  <span className="mockup-card-badge">{h.mockup?.card2Badge || 'Popular with Groups'}</span>
                </div>
                <div className="mockup-card-body">
                  <h4>{h.mockup?.card2Title || 'Gather & Eat'}</h4>
                  <p>{h.mockup?.card2Desc || 'Cozy student meals, large tables, friendly vibes'}</p>
                  <div className="mockup-card-meta">
                    <span><Icon name="users" size={12} /> {h.mockup?.card2Group || 'Up to 8'}</span>
                    <span><Icon name="pin" size={12} /> 1.2 km</span>
                    <strong>{h.mockup?.card2Price || '~ 55k–69k VND'}</strong>
                  </div>
                </div>
              </div>

              <div className="mockup-card">
                <div className="mockup-card-img">
                  <img src="/assets/garden-cafe.jpg" alt="Garden Cafe" />
                  <span className="mockup-card-badge">{h.mockup?.card3Badge || 'Chill & Relax'}</span>
                </div>
                <div className="mockup-card-body">
                  <h4>{h.mockup?.card3Title || 'The Garden Room'}</h4>
                  <p>{h.mockup?.card3Desc || 'Lush green space, open air, great espresso'}</p>
                  <div className="mockup-card-meta">
                    <span><Icon name="coffee" size={12} /> {h.mockup?.card3Specialty || 'Specialty'}</span>
                    <span><Icon name="heart" size={12} /> {h.mockup?.card3Rating || '4.9 / 5'}</span>
                    <strong>{h.mockup?.card3Price || '~ 45k–85k VND'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
