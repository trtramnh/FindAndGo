import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Features, HowItWorks, About, FinalCta, Footer } from './components/LandingSections';
import { Icon, Modal } from './components/ui';

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  return <>
    <a className="skip-link" href="#main">Chuyển đến nội dung chính</a>
    <Header onLogin={() => setLoginOpen(true)} />
    <main id="main"><Hero /><Features /><HowItWorks /><About /><FinalCta /></main>
    <Footer />
    {loginOpen && <Modal title="Hẹn bạn ở phiên bản tiếp theo" onClose={() => setLoginOpen(false)}>
      <div className="info-modal-icon"><Icon name="user" size={28} /></div>
      <p>FIND&GO đang trong giai đoạn phát triển MVP. Đăng nhập chưa khả dụng trong bản trải nghiệm này.</p>
      <p>Bạn vẫn có thể tìm kiếm, thử bộ lọc và lưu địa điểm mẫu ngay trên thiết bị này, không cần tài khoản.</p>
      <a href="#explore" className="btn btn-primary" onClick={() => setLoginOpen(false)}>Khám phá bản demo<Icon name="arrow-right" /></a>
    </Modal>}
  </>;
}
