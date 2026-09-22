import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Brand, Icon } from './ui';

export default function Header({ onNavigate, onLogin }) {
  const { lang, toggleLang, strings } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  const nav = strings.nav;

  const navigation = [
    { label: nav.home, href: '#hero', route: '/' },
    { label: nav.why, href: '#why', route: '/#why' },
    { label: nav.howItWorks, href: '#how-it-works', route: '/#how-it-works' },
    { label: nav.explore, href: '#explore', route: '/#explore' },
    { label: nav.faq, href: '#faq', route: '/#faq' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onKey = (event) => {
      if (
        event.key === 'Escape' &&
        toggleRef.current?.getAttribute('aria-expanded') === 'true' &&
        !document.querySelector('dialog[open]')
      ) {
        setMenuOpen(false);
        toggleRef.current.focus();
      }
    };
    const onOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const media = window.matchMedia('(min-width: 961px)');
    const onResize = () => {
      if (media.matches) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    media.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      media.removeEventListener('change', onResize);
    };
  }, []);

  const handleNavClick = (e, item) => {
    setMenuOpen(false);
    if (window.location.pathname === '/coming-soon') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('/' + (item.href.startsWith('#') ? item.href : ''));
      } else {
        window.location.href = '/' + item.href;
      }
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate('/coming-soon?feature=signin');
    } else {
      window.location.href = '/coming-soon?feature=signin';
    }
  };

  const handleGetStarted = (e) => {
    setMenuOpen(false);
    if (window.location.pathname === '/coming-soon') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('/#explore');
      } else {
        window.location.href = '/#explore';
      }
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} ref={headerRef}>
      <div className="shell">
        <div className="header-bar">
          <a
            href="#hero"
            aria-label="FIND&GO — Home"
            onClick={(e) => {
              if (window.location.pathname === '/coming-soon') {
                e.preventDefault();
                if (onNavigate) onNavigate('/');
                else window.location.href = '/';
              }
              setMenuOpen(false);
            }}
          >
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            {/* Color Mode Switcher */}
            <button
              className="icon-button theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={nav.themeToggle}
              title={nav.themeToggle}
            >
              <Icon name={isDark ? 'sun' : 'moon'} size={18} />
            </button>

            {/* Language Switcher (Inspired by DisNote's VI/EN toggle in screenshot) */}
            <button
              className="lang-toggle-btn"
              onClick={toggleLang}
              aria-label={nav.langToggle}
              title={nav.langToggle}
            >
              <Icon name="globe" size={15} />
              <span>{lang === 'en' ? 'VI' : 'EN'}</span>
            </button>

            {/* Sign In (Redirects to Coming Soon) */}
            <a
              href="/coming-soon?feature=signin"
              className="btn btn-secondary header-signin-btn"
              onClick={handleSignIn}
            >
              {nav.signIn}
            </a>

            {/* Get Started */}
            <a
              href="#explore"
              className="btn btn-primary header-cta-btn"
              onClick={handleGetStarted}
            >
              {nav.getStarted}
              <Icon name="arrow-right" size={16} />
            </a>
          </div>

          <button
            ref={toggleRef}
            className="menu-toggle icon-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile Navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}

            <div className="mobile-settings">
              <button
                className="mobile-setting-item"
                onClick={toggleTheme}
                aria-label={nav.themeToggle}
              >
                <Icon name={isDark ? 'sun' : 'moon'} size={18} />
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                className="mobile-setting-item"
                onClick={toggleLang}
                aria-label={nav.langToggle}
              >
                <Icon name="globe" size={18} />
                <span>{lang === 'en' ? 'Tiếng Việt (VI)' : 'English (EN)'}</span>
              </button>
            </div>

            <div className="mobile-actions">
              <a
                href="/coming-soon?feature=signin"
                className="btn btn-secondary"
                onClick={handleSignIn}
              >
                {nav.signIn}
              </a>
              <a
                href="#explore"
                className="btn btn-primary"
                onClick={handleGetStarted}
              >
                {nav.getStarted}
                <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
