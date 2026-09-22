import { useEffect, useRef, useState } from 'react';
import { Brand, Icon } from './ui';

export const navigation = [
  ['Tính năng', '#features'], ['Cách hoạt động', '#how-it-works'],
  ['Giới thiệu', '#about'], ['Liên hệ', '#contact'],
];

export default function Header({ onLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onKey = (event) => {
      if (event.key === 'Escape' && toggleRef.current?.getAttribute('aria-expanded') === 'true' && !document.querySelector('dialog[open]')) {
        setMenuOpen(false);
        toggleRef.current.focus();
      }
    };
    const onOutside = (event) => { if (!headerRef.current?.contains(event.target)) setMenuOpen(false); };
    const media = window.matchMedia('(min-width: 961px)');
    const onResize = () => { if (media.matches) setMenuOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    media.addEventListener('change', onResize);
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); media.removeEventListener('change', onResize); };
  }, []);

  const login = () => { setMenuOpen(false); onLogin(); };
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} ref={headerRef}>
    <div className="shell">
      <div className="header-bar">
        <a href="#hero" aria-label="FIND&GO — Trang chủ" onClick={() => setMenuOpen(false)}><Brand /></a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="header-actions"><button className="btn btn-secondary" onClick={login}>Đăng nhập</button><a href="#explore" className="btn btn-primary">Khám phá ngay<Icon name="arrow-up-right" size={16} /></a></div>
        <button ref={toggleRef} className="menu-toggle icon-button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'x' : 'menu'} size={24} /></button>
      </div>
      {menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Điều hướng di động">
        {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <div className="mobile-actions"><button className="btn btn-secondary" onClick={login}>Đăng nhập</button><a href="#explore" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Khám phá ngay<Icon name="arrow-right" size={16} /></a></div>
      </nav>}
    </div>
  </header>;
}
