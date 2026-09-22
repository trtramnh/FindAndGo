import { Icon } from './ui';
import ProductPreview from './ProductPreview';

const words = ['Coffee', 'Study', 'Food', 'Hangout', 'Friends', 'Explore', 'Budget', 'Nearby'];

export default function Hero() {
  return <section id="hero" className="hero">
    <div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow-left" aria-hidden="true" /><div className="hero-glow hero-glow-right" aria-hidden="true" /><div className="hero-glow hero-glow-center" aria-hidden="true" />
    <div className="hero-word" aria-hidden="true">EXPLORE</div>
    <div className="shell hero-content">
      <div className="hero-badge"><span className="pulse-dot" />KHÁM PHÁ ĐỊA ĐIỂM THEO CÁCH CỦA BẠN</div>
      <h1>Đi đâu hôm nay?<span className="hero-gradient">Tìm đúng nơi,<br className="desktop-break" /> tận hưởng đúng lúc.</span></h1>
      <p className="hero-description">FIND&GO giúp bạn khám phá địa điểm ăn uống, học tập và vui chơi phù hợp với mục đích, ngân sách và khoảng cách — tất cả trong một trải nghiệm tìm kiếm đơn giản.</p>
      <div className="hero-actions"><a href="#explore" className="btn btn-primary btn-hero">Khám phá ngay<Icon name="arrow-right" /></a><a href="#how-it-works" className="btn btn-secondary btn-hero">Xem cách hoạt động<Icon name="chevron-right" size={18} /></a></div>
      <p className="hero-support">Dành cho sinh viên muốn tìm đúng địa điểm cho mỗi cuộc hẹn, buổi học và cuộc vui.</p>
      <div className="hero-attributes"><span><Icon name="compass" size={16} />Tìm theo nhu cầu</span><span><Icon name="wallet" size={16} />Lọc theo ngân sách</span><span><Icon name="pin" size={16} />Khám phá quanh bạn</span></div>
      <div className="marquee" aria-label={words.join(', ')}><div className="marquee-track" aria-hidden="true">{[0, 1].map((copy) => <div className="marquee-group" key={copy}>{words.map((word) => <span key={word}>{word}<i /></span>)}</div>)}</div></div>
    </div>
    <div className="shell preview-wrap"><ProductPreview /></div>
  </section>;
}
