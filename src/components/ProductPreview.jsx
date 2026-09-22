import { useMemo, useState } from 'react';
import { activities, formatPrice, normalizeText, venues } from '../data/venues';
import { Brand, Icon, Modal, VenueImage } from './ui';

const STORAGE_KEY = 'findandgo-demo-favorites';
function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((id) => venues.some((venue) => venue.id === id)) : [];
  } catch { return []; }
}

function FloatingCard({ position, icon, title, subtitle }) {
  return <div className={`preview-float preview-float-${position}`} aria-hidden="true"><span className="float-icon"><Icon name={icon} size={19} /></span><div><strong>{title}</strong><span>{subtitle}</span></div></div>;
}

function VenueCard({ venue, saved, onSave, onDetails }) {
  return <article className="venue-card">
    <div className="venue-photo"><VenueImage src={venue.image} alt={venue.imageAlt} width="640" height="440" /><span className="venue-photo-tag"><Icon name={venue.tagIcon} size={12} />{venue.tag}</span><button className={`favorite-button ${saved ? 'is-saved' : ''}`} onClick={() => onSave(venue.id)} aria-label={`${saved ? 'Bỏ lưu' : 'Lưu'} ${venue.name}`} aria-pressed={saved}><Icon name="heart" size={17} /></button></div>
    <div className="venue-content"><span className="venue-category">{venue.category}</span><h3>{venue.name}</h3><p className="venue-description">{venue.description}</p><div className="venue-amenities">{venue.wifi && <span><Icon name="wifi" size={13} />Wi-Fi</span>}{venue.outlets && <span><Icon name="plug" size={13} />Ổ cắm</span>}<span><Icon name="users" size={13} />{venue.people} người</span></div><div className="venue-price">~ {formatPrice(venue.priceMin)}–{formatPrice(venue.priceMax)}đ<span> / người</span></div><p className="venue-location"><Icon name="pin" size={12} />{venue.area}</p><button className="venue-details" onClick={() => onDetails(venue)}>Xem chi tiết<Icon name="arrow-up-right" size={14} /></button></div>
  </article>;
}

export default function ProductPreview() {
  const [query, setQuery] = useState('');
  const [activity, setActivity] = useState('');
  const [budget, setBudget] = useState('');
  const [distance, setDistance] = useState('');
  const [people, setPeople] = useState('');
  const [wifi, setWifi] = useState(false);
  const [outlets, setOutlets] = useState(false);
  const [view, setView] = useState('explore');
  const [favorites, setFavorites] = useState(loadFavorites);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  // Lọc hoàn toàn tại trình duyệt; không gọi API hay lấy vị trí thật.
  const matches = useMemo(() => venues.filter((venue) => {
    const searchable = normalizeText([venue.name, venue.category, venue.description, venue.category.startsWith('Coffee') ? 'quán cà phê' : 'nhà hàng', ...venue.activities.map((id) => activities.find((item) => item.id === id)?.label)].join(' '));
    return (!query.trim() || searchable.includes(normalizeText(query.trim())))
      && (!activity || venue.activities.includes(activity))
      && (!budget || venue.priceMax < Number(budget))
      && (!distance || venue.distanceBand <= Number(distance))
      && (!people || venue.people >= Number(people))
      && (!wifi || venue.wifi) && (!outlets || venue.outlets)
      && (view !== 'favorites' || favorites.includes(venue.id))
      && (view !== 'nearby' || venue.distanceBand <= 2);
  }), [query, activity, budget, distance, people, wifi, outlets, view, favorites]);

  const resetFilters = () => { setQuery(''); setActivity(''); setBudget(''); setDistance(''); setPeople(''); setWifi(false); setOutlets(false); };
  const applyExample = () => { resetFilters(); setView('explore'); setActivity('study'); setBudget('70000'); setPeople('4'); setWifi(true); setOutlets(true); setAnnouncement('Đã áp dụng ví dụ: học nhóm 4 người, dưới 70.000đ, có Wi-Fi và ổ cắm.'); };
  const toggleFavorite = (id) => {
    const next = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    setFavorites(next);
    const venueName = venues.find((venue) => venue.id === id).name;
    let message = next.includes(id) ? `Đã lưu ${venueName} trên thiết bị này.` : `Đã bỏ lưu ${venueName}.`;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
    catch { message += ' Trình duyệt không cho phép lưu lâu dài; thay đổi chỉ được giữ trong phiên này.'; }
    setAnnouncement(message);
  };
  const changeView = (nextView) => { setView(nextView); resetFilters(); };
  const hasFilters = Boolean(query || activity || budget || distance || people || wifi || outlets);

  return <div className="product-preview" id="explore" role="region" aria-label="Bản trải nghiệm khám phá FIND&GO">
    <FloatingCard position="top" icon="sliders" title="Tìm theo nhu cầu" subtitle="Học nhóm · 4 người · Có Wi-Fi" />
    <FloatingCard position="bottom" icon="wallet" title="Phù hợp ngân sách" subtitle="Gợi ý theo mức chi bạn chọn" />
    <FloatingCard position="side" icon="heart" title="Lưu địa điểm yêu thích" subtitle="Xem lại khi cần" />
    <div className="preview-label" aria-hidden="true"><span />MỘT NƠI CHO MỌI CUỘC HẸN</div>
    <div className="browser-frame">
      <div className="browser-chrome"><div className="browser-dots" aria-hidden="true"><i /><i /><i /></div><div className="browser-address"><Icon name="lock" size={10} />findandgo.app · Khám phá</div><span className="chrome-extra"><Icon name="sliders" size={14} /></span></div>
      <div className="discovery-app">
        <aside className="preview-sidebar"><div className="sidebar-brand"><Brand /></div><p className="sidebar-label">KHÔNG GIAN CỦA BẠN</p><nav aria-label="Điều hướng bản demo">
          {[['explore', 'compass', 'Khám phá'], ['nearby', 'pin', 'Địa điểm gần đây'], ['favorites', 'heart', 'Yêu thích']].map(([id, icon, label]) => <button key={id} className={view === id ? 'active' : ''} onClick={() => changeView(id)} aria-pressed={view === id} title={label}><Icon name={icon} size={17} /><span>{label}</span>{id === 'favorites' && favorites.length > 0 && <small>{favorites.length}</small>}</button>)}
          <button onClick={() => setProfileOpen(true)} title="Hồ sơ bản demo"><Icon name="user" size={17} /><span>Hồ sơ</span></button>
        </nav><div className="sidebar-tip"><Icon name="sparkles" size={22} /><strong>Đi đâu cũng có gu.</strong><p>Bắt đầu từ điều bạn thích, tìm một nơi thật phù hợp.</p><span>Find your place.<br />Go your way.</span></div><div className="sidebar-user"><span className="avatar"><Icon name="user" size={16} /></span><div><strong>Người khám phá</strong><span>Chế độ trải nghiệm</span></div><Icon name="chevron-right" size={14} /></div></aside>
        <div className="preview-main">
          <div className="preview-heading"><div><p>MỘT NGÀY MỚI, MỘT ĐIỂM HẸN MỚI</p><h2>Bạn muốn đi đâu hôm nay?</h2></div><span className="demo-badge"><span />Bản demo</span></div>
          <div className="preview-search"><Icon name="search" size={18} /><input id="venue-search" type="search" aria-label="Tìm địa điểm mẫu" placeholder="Tìm quán cà phê, nhà hàng, địa điểm..." value={query} onChange={(event) => setQuery(event.target.value)} /><span className="search-decoration" aria-hidden="true"><Icon name="sliders" size={16} /></span></div>
          <div className="category-chips" role="group" aria-label="Mục đích chuyến đi">{activities.map((item) => <button key={item.id} className={activity === item.id ? 'active' : ''} aria-pressed={activity === item.id} onClick={() => setActivity(activity === item.id ? '' : item.id)}><Icon name={item.icon} size={15} />{item.label}</button>)}</div>
          <div className="filter-row" role="group" aria-label="Bộ lọc địa điểm mẫu">
            <label className={`select-filter ${distance ? 'is-selected' : ''}`}><Icon name="pin" size={13} /><select aria-label="Khoảng cách minh họa" value={distance} onChange={(event) => setDistance(event.target.value)}><option value="">Khoảng cách</option><option value="2">Trong 2 km (mẫu)</option><option value="5">Trong 5 km (mẫu)</option></select><Icon name="chevron-down" size={12} /></label>
            <label className={`select-filter ${budget ? 'is-selected' : ''}`}><Icon name="wallet" size={13} /><select aria-label="Ngân sách mỗi người" value={budget} onChange={(event) => setBudget(event.target.value)}><option value="">Ngân sách</option><option value="50000">Dưới 50.000đ</option><option value="70000">Dưới 70.000đ</option><option value="100000">Dưới 100.000đ</option></select><Icon name="chevron-down" size={12} /></label>
            <label className={`select-filter ${people ? 'is-selected' : ''}`}><Icon name="users" size={13} /><select aria-label="Số người" value={people} onChange={(event) => setPeople(event.target.value)}><option value="">Số người</option><option value="1">1 người</option><option value="4">4 người</option><option value="6">6 người</option><option value="8">8 người</option></select><Icon name="chevron-down" size={12} /></label>
            <button className={`toggle-filter ${wifi ? 'is-selected' : ''}`} aria-pressed={wifi} onClick={() => setWifi(!wifi)}><Icon name="wifi" size={13} />Wi-Fi</button><button className={`toggle-filter ${outlets ? 'is-selected' : ''}`} aria-pressed={outlets} onClick={() => setOutlets(!outlets)}><Icon name="plug" size={13} />Ổ cắm</button>
          </div>
          <div className="results-heading"><div><h3>{view === 'favorites' ? 'Địa điểm đã lưu' : view === 'nearby' ? 'Quanh bạn · minh họa' : 'Một vài nơi dành cho bạn'}<span aria-live="polite">{matches.length} địa điểm mẫu</span></h3><p>{hasFilters ? 'Những gợi ý theo tiêu chí bạn vừa chọn.' : 'Lấy cảm hứng cho điểm hẹn tiếp theo của bạn.'}</p></div>{hasFilters && <button className="reset-filters" onClick={resetFilters}>Xóa bộ lọc<Icon name="x" size={12} /></button>}</div>
          <div className="venue-grid">{matches.map((venue) => <VenueCard key={venue.id} venue={venue} saved={favorites.includes(venue.id)} onSave={toggleFavorite} onDetails={setSelectedVenue} />)}</div>
          {matches.length === 0 && <div className="empty-results"><Icon name={view === 'favorites' ? 'heart' : 'search'} size={30} /><h3>{view === 'favorites' && favorites.length === 0 ? 'Lưu một nơi bạn muốn ghé' : 'Chưa có địa điểm mẫu phù hợp'}</h3><p>{view === 'favorites' && favorites.length === 0 ? 'Chạm vào trái tim trên thẻ địa điểm để lưu vào danh sách này.' : 'Thử bớt một tiêu chí hoặc tìm bằng tên địa điểm.'}</p><button className="btn btn-secondary" onClick={() => { resetFilters(); if (view === 'favorites' && favorites.length === 0) setView('explore'); }}>{view === 'favorites' && favorites.length === 0 ? 'Khám phá địa điểm' : 'Xóa bộ lọc'}</button></div>}
          <div className="example-search"><span><Icon name="sparkles" size={15} /><span>Học nhóm 4 người, dưới 70.000đ?</span></span><button onClick={applyExample}>Thử tìm ngay<Icon name="arrow-right" size={14} /></button></div>
          <p className="demo-note"><Icon name="info" size={12} />Địa điểm, hình ảnh, giá, khoảng cách và tiện ích chỉ để minh họa, chưa được xác minh.</p>
          <p className="sr-only" role="status">{announcement}</p>
        </div>
      </div>
    </div><div className="preview-glow" aria-hidden="true" />
    {selectedVenue && <Modal title={selectedVenue.name} onClose={() => setSelectedVenue(null)}>
      <VenueImage className="modal-venue-image" src={selectedVenue.image} alt={selectedVenue.imageAlt} width="640" height="400" />
      <span className="modal-demo-label">ĐỊA ĐIỂM MINH HỌA · {selectedVenue.category}</span><p>{selectedVenue.details}</p>
      <div className="modal-facts"><span><Icon name="wallet" size={18} />~ {formatPrice(selectedVenue.priceMin)}–{formatPrice(selectedVenue.priceMax)}đ / người</span><span><Icon name="users" size={18} />Nhóm tối đa {selectedVenue.people} người (mẫu)</span><span><Icon name="pin" size={18} />{selectedVenue.area}</span>{selectedVenue.wifi && <span><Icon name="wifi" size={18} />Có Wi-Fi (mẫu)</span>}{selectedVenue.outlets && <span><Icon name="plug" size={18} />Có ổ cắm (mẫu)</span>}</div>
      <p className="modal-disclaimer">Đây là dữ liệu thử nghiệm, không phải địa điểm đã được xác minh. Hình ảnh mang tính minh họa.</p>
      <button className="btn btn-primary" aria-pressed={favorites.includes(selectedVenue.id)} onClick={() => toggleFavorite(selectedVenue.id)}><Icon name="heart" size={17} />{favorites.includes(selectedVenue.id) ? 'Đã lưu · Bỏ lưu địa điểm' : 'Lưu địa điểm này'}</button>
    </Modal>}
    {profileOpen && <Modal title="Hồ sơ người khám phá" onClose={() => setProfileOpen(false)}><div className="info-modal-icon"><Icon name="user" size={28} /></div><p>Bạn đang dùng bản demo, chưa cần tạo tài khoản. Tính năng hồ sơ sẽ được phát triển trong phiên bản tiếp theo.</p><p>Danh sách yêu thích được lưu riêng trong trình duyệt trên thiết bị này.</p><button className="btn btn-primary" onClick={() => { setProfileOpen(false); changeView('favorites'); }}>Xem địa điểm đã lưu<Icon name="heart" size={17} /></button></Modal>}
  </div>;
}
