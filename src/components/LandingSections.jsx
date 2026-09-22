import { Icon, Brand } from './ui'

const features = [
  {
    icon: 'compass',
    tag: 'Khám phá',
    title: 'Khám phá theo mục đích',
    description: 'Tìm địa điểm cho một buổi học bài, bữa ăn, cuộc hẹn hay những lần tụ tập cùng bạn bè.',
  },
  {
    icon: 'sliders',
    tag: 'Cá nhân hóa',
    title: 'Bộ lọc phù hợp',
    description: 'Thu hẹp lựa chọn theo ngân sách, khoảng cách, số người và những tiện ích bạn quan tâm.',
  },
  {
    icon: 'heart',
    tag: 'Yêu thích',
    title: 'Lưu địa điểm yêu thích',
    description: 'Giữ những địa điểm thú vị trong một danh sách để dễ dàng tìm lại khi lên kế hoạch cho lần đi tiếp theo.',
  },
]

export function Features() {
  return (
    <section id="features" className="section-block section-white section-word" aria-labelledby="features-title">
      <span className="section-background-word section-background-word-right" aria-hidden="true">DISCOVER</span>
      <div className="shell section-content">
        <div className="section-heading">
          <p className="section-eyebrow">TÍNH NĂNG</p>
          <h2 id="features-title">Tìm đúng địa điểm cho mọi cuộc hẹn.</h2>
          <p>Từ một buổi học yên tĩnh đến cuộc gặp gỡ bạn bè, FIND&GO giúp bạn thu hẹp lựa chọn theo những tiêu chí quan trọng.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <article className={`feature-card feature-card-${index + 1}`} key={feature.title}>
              <span className="feature-tag">{feature.tag}</span>
              <span className="feature-icon"><Icon name={feature.icon} size={24} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a className="feature-link" href="#explore">Khám phá bản demo <Icon name="chevron-right" size={17} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Các giao diện nhỏ minh họa từng bước; bản demo tương tác nằm ở phần khám phá.
function ActivityPreview() {
  return (
    <div className="step-preview">
      <div className="step-preview-title"><Icon name="compass" size={15} /> Hôm nay, bạn muốn...</div>
      <div className="step-activities">
        {[['book', 'Học bài'], ['utensils', 'Ăn uống'], ['compass', 'Đi chơi']].map(([icon, label], index) => (
          <div className={`step-activity ${index === 0 ? 'step-activity-selected' : ''}`} key={label}>
            <Icon name={icon} size={21} />
            <span>{label}</span>
            {index === 0 && <span className="step-activity-check"><Icon name="check" size={9} /></span>}
          </div>
        ))}
      </div>
      <div className="step-selection-note"><span /> Một góc yên tĩnh để tập trung</div>
    </div>
  )
}

function FiltersPreview() {
  return (
    <div className="step-preview">
      <div className="step-preview-title"><Icon name="sliders" size={15} /> Tiêu chí của bạn</div>
      <div className="step-filter-row"><span>Ngân sách / người</span><strong>Dưới 70.000đ</strong></div>
      <div className="step-budget-track" aria-hidden="true"><span /></div>
      <div className="step-filter-row"><span>Số người</span><strong><Icon name="users" size={13} /> 4 người</strong></div>
      <div className="step-amenities"><span><Icon name="wifi" size={12} /> Wi-Fi <Icon name="check" size={10} /></span><span><Icon name="plug" size={12} /> Ổ cắm <Icon name="check" size={10} /></span></div>
    </div>
  )
}

function VenuePreview() {
  return (
    <div className="step-preview">
      <div className="step-preview-title"><Icon name="pin" size={15} /> Gợi ý cho buổi học <span className="step-demo-tag">Demo</span></div>
      {[
        { name: 'The Little Corner', detail: 'Yên tĩnh · Wi-Fi · Ổ cắm', image: '/assets/cafe-interior.jpg' },
        { name: 'The Garden Room', detail: 'Không gian xanh · Wi-Fi', image: '/assets/garden-cafe.jpg' },
      ].map((venue, index) => (
        <div className="step-venue" key={venue.name}>
          <img src={venue.image} alt="" loading="lazy" width="42" height="42" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/assets/venue-fallback.svg' }} />
          <div><strong>{venue.name}</strong><span>{venue.detail}</span></div>
          <span className={index === 0 ? 'step-saved-heart' : ''}><Icon name="heart" size={15} /></span>
        </div>
      ))}
    </div>
  )
}

export function HowItWorks() {
  const steps = [
    { icon: 'compass', title: 'Chọn nhu cầu', description: 'Bạn cần một góc học bài, một bữa ăn ngon hay một nơi để đi chơi? Bắt đầu từ điều bạn muốn làm.', preview: <ActivityPreview /> },
    { icon: 'sliders', title: 'Thiết lập tiêu chí', description: 'Chọn ngân sách, số người và tiện ích cần thiết để tìm không gian phù hợp với buổi hẹn của bạn.', preview: <FiltersPreview /> },
    { icon: 'pin', title: 'Khám phá và lựa chọn', description: 'Xem các gợi ý, tìm hiểu chi tiết và lưu lại những nơi thú vị cho hành trình tiếp theo.', preview: <VenuePreview /> },
  ]

  return (
    <section id="how-it-works" className="section-block section-soft" aria-labelledby="steps-title">
      <div className="shell">
        <div className="section-heading">
          <p className="section-eyebrow">CÁCH HOẠT ĐỘNG</p>
          <h2 id="steps-title">Chọn đúng địa điểm chỉ với 3 bước.</h2>
        </div>
        <div className="step-grid">
          <span className="step-connecting-line" aria-hidden="true" />
          {steps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <div className="step-heading"><span className="step-number">0{index + 1}</span><span className="step-icon"><Icon name={step.icon} size={20} /></span></div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.preview}
              <span className="step-preview-caption">Minh họa trải nghiệm</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  const values = [
    { icon: 'compass', title: 'Đúng nhu cầu', description: 'Bắt đầu từ mục đích của bạn để thu hẹp lựa chọn.' },
    { icon: 'sliders', title: 'Dễ lựa chọn', description: 'Xem các tiêu chí quan trọng trong một giao diện trực quan.' },
    { icon: 'heart', title: 'Thêm trải nghiệm', description: 'Lưu lại những địa điểm thú vị cho những lần gặp gỡ tiếp theo.' },
  ]

  return (
    <section id="about" className="section-block section-white section-word" aria-labelledby="about-title">
      <span className="section-background-word section-background-word-left" aria-hidden="true">JOURNEY</span>
      <div className="shell section-content about-grid">
        <div className="about-copy">
          <p className="section-eyebrow">VỀ FIND&GO</p>
          <h2 id="about-title">Mỗi cuộc hẹn đều bắt đầu từ một địa điểm phù hợp.</h2>
          <p className="about-description">FIND&GO được phát triển với mong muốn giúp sinh viên dễ dàng khám phá và lựa chọn địa điểm phù hợp với nhu cầu thực tế. Thay vì chỉ tìm kiếm bằng tên địa điểm, người dùng có thể bắt đầu từ mục đích, ngân sách, khoảng cách và những tiện ích mình quan tâm.</p>
          <div className="about-audience">
            {['Sinh viên', 'Nhóm bạn', 'Người thích khám phá'].map((label) => <span key={label}><Icon name="check" size={16} />{label}</span>)}
          </div>
          <a className="btn btn-primary" href="#explore">Khám phá FIND&GO <Icon name="arrow-right" size={19} /></a>
        </div>
        <div className="about-values">
          {values.map((value, index) => (
            <article className="about-value" key={value.title}>
              <span className="about-value-icon"><Icon name={value.icon} size={22} /></span>
              <div>
                <div className="about-value-title"><h3>{value.title}</h3><span>0{index + 1}</span></div>
                <p>{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="section-block section-soft" aria-labelledby="cta-title">
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
            <span className="cta-icon"><Icon name="compass" size={30} /></span>
            <h2 id="cta-title">Sẵn sàng tìm địa điểm tiếp theo của bạn?</h2>
            <p>Dù là học bài, ăn uống hay tụ tập bạn bè, hãy bắt đầu hành trình khám phá với FIND&GO.</p>
            <div className="cta-actions"><a className="btn btn-white" href="#explore">Khám phá ngay <Icon name="arrow-right" size={19} /></a><a className="btn btn-glass" href="#about">Tìm hiểu thêm</a></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="shell footer-content">
        <div className="footer-brand"><a href="#hero" aria-label="FIND&GO — về đầu trang"><Brand /></a><span>Find your place. Go your way.</span></div>
        <nav className="footer-links" aria-label="Điều hướng cuối trang"><a href="#about">Giới thiệu</a><a href="#features">Tính năng</a><a href="#how-it-works">Cách hoạt động</a><a href="#contact">Liên hệ</a></nav>
        <p className="footer-credit">Developed by <strong>SEEKERS.</strong></p>
      </div>
      <p className="shell footer-contact-note">Thông tin liên hệ sẽ được cập nhật khi dự án ra mắt.</p>
    </footer>
  )
}
