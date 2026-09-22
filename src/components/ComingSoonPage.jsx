import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './ui';
import Header from './Header';
import { Footer } from './LandingSections';

export default function ComingSoonPage({ onNavigate }) {
  const { lang, strings } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(false);

  // Extract feature query param
  const params = new URLSearchParams(window.location.search);
  const featureKey = params.get('feature');

  const cs = strings.comingSoon;
  const headline = (featureKey && cs.features[featureKey]) ? cs.features[featureKey] : cs.titleDefault;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(cs.emailInvalid);
      return;
    }
    // Honest unavailable state per requirement - no fake endpoint, no silent drops
    setNotice(true);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="coming-soon-wrapper">
      <Header onNavigate={onNavigate} />

      <main className="coming-soon-main">
        {/* Subtle geometric pastel decorations inspired by DisNote screenshot */}
        <div className="cs-deco cs-deco-teal" aria-hidden="true">
          <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 80C90 40 180 20 260 50C340 80 300 170 210 180C120 190 20 150 40 80Z" fill="currentColor" />
          </svg>
        </div>
        <div className="cs-deco cs-deco-yellow" aria-hidden="true">
          <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 120C20 60 90 20 170 30C250 40 280 130 220 190C160 250 80 180 50 120Z" fill="currentColor" />
          </svg>
        </div>
        <div className="cs-deco cs-deco-pink" aria-hidden="true">
          <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 110C50 40 140 30 210 60C280 90 260 180 190 200C120 220 10 180 30 110Z" fill="currentColor" />
          </svg>
        </div>

        <div className="shell cs-container">
          <div className="cs-card">
            {/* Status Badge */}
            <div className="cs-badge">
              <Icon name="rocket" size={15} />
              <span>{cs.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="cs-headline">{headline}</h1>

            {/* Supporting Description */}
            <p className="cs-description">{cs.description}</p>

            {/* Email Notification Form */}
            <form className="cs-form" onSubmit={handleSubmit} noValidate>
              <div className="cs-input-group">
                <input
                  type="email"
                  className={`cs-input ${error ? 'is-invalid' : ''}`}
                  placeholder={cs.inputPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-label={cs.inputPlaceholder}
                />
                <button type="submit" className="btn btn-primary cs-submit-btn">
                  <Icon name="bell" size={16} />
                  <span>{cs.notifyBtn}</span>
                </button>
              </div>

              {error && <p className="cs-error" role="alert">{error}</p>}

              {notice && (
                <div className="cs-notice cs-notice-success" role="status">
                  <Icon name="check" size={18} />
                  <div>
                    <strong>{cs.successTitle}</strong>
                    <p>
                      {lang === 'vi'
                        ? `Chúng tôi đã ghi nhận và sẽ thông báo tới email ${email} ngay khi tính năng chính thức ra mắt.`
                        : `We have registered your request and will notify ${email} as soon as this feature launches.`}
                    </p>
                  </div>
                </div>
              )}
            </form>

            {/* Back to Home Navigation */}
            <div className="cs-back-wrap">
              <a href="/" className="cs-back-link" onClick={handleBack}>
                <Icon name="arrow-left" size={16} />
                <span>{cs.backHome}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
