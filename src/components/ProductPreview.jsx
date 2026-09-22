import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { activities, formatPrice, normalizeText, venues } from '../data/venues';
import { Brand, Icon, Modal, VenueImage } from './ui';

const STORAGE_KEY = 'findandgo-demo-favorites';

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved)
      ? saved.filter((id) => venues.some((venue) => venue.id === id))
      : [];
  } catch {
    return [];
  }
}

function FloatingCard({ position, icon, title, subtitle }) {
  return (
    <div className={`preview-float preview-float-${position}`} aria-hidden="true">
      <span className="float-icon">
        <Icon name={icon} size={19} />
      </span>
      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

function VenueCard({ venue, saved, onSave, onDetails, lang, strings }) {
  const sc = strings.showcase;
  const desc = lang === 'vi' ? venue.descriptionVi : venue.description;
  const tag = lang === 'vi' ? venue.tagVi : venue.tag;
  const area = lang === 'vi' ? venue.areaVi : venue.area;

  return (
    <article className="venue-card">
      <div className="venue-photo">
        <VenueImage
          src={venue.image}
          alt={lang === 'vi' ? venue.imageAltVi : venue.imageAlt}
          width="640"
          height="440"
        />
        <span className="venue-photo-tag">
          <Icon name={venue.tagIcon} size={12} />
          {tag}
        </span>
        <button
          className={`favorite-button ${saved ? 'is-saved' : ''}`}
          onClick={() => onSave(venue.id)}
          aria-label={`${saved ? 'Remove' : 'Save'} ${venue.name}`}
          aria-pressed={saved}
        >
          <Icon name="heart" size={17} />
        </button>
      </div>

      <div className="venue-content">
        <span className="venue-category">{venue.category}</span>
        <h3>{venue.name}</h3>
        <p className="venue-description">{desc}</p>

        <div className="venue-amenities">
          {venue.wifi && (
            <span>
              <Icon name="wifi" size={13} />
              {sc.wifi}
            </span>
          )}
          {venue.outlets && (
            <span>
              <Icon name="plug" size={13} />
              {sc.outlets}
            </span>
          )}
          <span>
            <Icon name="users" size={13} />
            {venue.people} {lang === 'vi' ? 'người' : 'people'}
          </span>
        </div>

        <div className="venue-price">
          ~ {formatPrice(venue.priceMin, lang)}–{formatPrice(venue.priceMax, lang)} {lang === 'vi' ? 'đ' : 'VND'}
          <span> {sc.perPerson}</span>
        </div>

        <p className="venue-location">
          <Icon name="pin" size={12} />
          {area}
        </p>

        <button className="venue-details" onClick={() => onDetails(venue)}>
          {sc.viewDetails}
          <Icon name="arrow-up-right" size={14} />
        </button>
      </div>
    </article>
  );
}

export default function ProductPreview({ externalActivity, onNavigate }) {
  const { lang, strings } = useLanguage();
  const sc = strings.showcase;

  const [query, setQuery] = useState('');
  const [activity, setActivity] = useState(externalActivity || '');
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

  // Update activity if changed from outside (e.g. Purpose section click)
  useMemo(() => {
    if (externalActivity !== undefined && externalActivity !== activity) {
      setActivity(externalActivity);
    }
  }, [externalActivity]);

  const matches = useMemo(() => {
    return venues.filter((venue) => {
      const activityLabels = venue.activities.map((id) => {
        const item = activities.find((a) => a.id === id);
        return item ? `${item.label} ${item.labelVi}` : '';
      });

      const searchable = normalizeText(
        [
          venue.name,
          venue.category,
          venue.description,
          venue.descriptionVi,
          venue.area,
          venue.areaVi,
          venue.category.startsWith('Coffee') ? 'coffee cafe quan ca phe' : 'food restaurant quan an',
          ...activityLabels,
        ].join(' ')
      );

      return (
        (!query.trim() || searchable.includes(normalizeText(query.trim()))) &&
        (!activity || venue.activities.includes(activity)) &&
        (!budget || venue.priceMax < Number(budget)) &&
        (!distance || venue.distanceBand <= Number(distance)) &&
        (!people || venue.people >= Number(people)) &&
        (!wifi || venue.wifi) &&
        (!outlets || venue.outlets) &&
        (view !== 'favorites' || favorites.includes(venue.id)) &&
        (view !== 'nearby' || venue.distanceBand <= 2)
      );
    });
  }, [query, activity, budget, distance, people, wifi, outlets, view, favorites]);

  const resetFilters = () => {
    setQuery('');
    setActivity('');
    setBudget('');
    setDistance('');
    setPeople('');
    setWifi(false);
    setOutlets(false);
  };

  const applyExample = () => {
    resetFilters();
    setView('explore');
    setActivity('study');
    setBudget('70000');
    setPeople('4');
    setWifi(true);
    setOutlets(true);
    setAnnouncement(
      lang === 'vi'
        ? 'Đã áp dụng ví dụ: học nhóm 4 người, dưới 70.000đ, có Wi-Fi và ổ cắm.'
        : 'Applied example: 4-person study session, under 70,000 VND, with Wi-Fi & outlets.'
    );
  };

  const toggleFavorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    const venueObj = venues.find((v) => v.id === id);
    const venueName = venueObj ? venueObj.name : '';
    let message = next.includes(id)
      ? (lang === 'vi' ? `Đã lưu ${venueName} trên thiết bị này.` : `Saved ${venueName} locally.`)
      : (lang === 'vi' ? `Đã bỏ lưu ${venueName}.` : `Removed ${venueName}.`);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      message +=
        lang === 'vi'
          ? ' Trình duyệt không cho phép lưu lâu dài; chỉ giữ trong phiên này.'
          : ' Local storage not permitted; retained for this session only.';
    }
    setAnnouncement(message);
  };

  const changeView = (nextView) => {
    setView(nextView);
    resetFilters();
  };

  const hasFilters = Boolean(
    query || activity || budget || distance || people || wifi || outlets
  );

  return (
    <div
      className="product-preview"
      id="explore"
      role="region"
      aria-label={lang === 'vi' ? 'Bản trải nghiệm khám phá FIND&GO' : 'FIND&GO Discovery Interactive Demo'}
    >
      <FloatingCard
        position="top"
        icon="sliders"
        title={lang === 'vi' ? 'Tìm theo nhu cầu' : 'Purpose Matching'}
        subtitle={lang === 'vi' ? 'Học nhóm · 4 người · Wi-Fi' : 'Study Group · 4 People · Wi-Fi'}
      />
      <FloatingCard
        position="bottom"
        icon="wallet"
        title={lang === 'vi' ? 'Phù hợp ngân sách' : 'Strict Budget Tiers'}
        subtitle={lang === 'vi' ? 'Gợi ý theo mức chi bạn chọn' : 'Clear price ranges per person'}
      />
      <FloatingCard
        position="side"
        icon="heart"
        title={lang === 'vi' ? 'Lưu địa điểm yêu thích' : 'Save & Compare'}
        subtitle={lang === 'vi' ? 'Xem lại khi cần' : 'Access offline on this device'}
      />

      <div className="preview-label" aria-hidden="true">
        <span />
        {sc.sidebarQuote} · {sc.sidebarSub}
      </div>

      <div className="browser-frame">
        <div className="browser-chrome">
          <div className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-address">
            <Icon name="lock" size={10} />
            {sc.browserAddress}
          </div>
          <span className="chrome-extra">
            <Icon name="sliders" size={14} />
          </span>
        </div>

        <div className="discovery-app">
          {/* App Sidebar */}
          <aside className="preview-sidebar">
            <div className="sidebar-brand">
              <Brand size={26} />
            </div>
            <p className="sidebar-label">{sc.sidebarTitle}</p>
            <nav aria-label="Demo Navigation">
              <button
                className={view === 'explore' ? 'active' : ''}
                onClick={() => changeView('explore')}
                aria-pressed={view === 'explore'}
                title={sc.navExplore}
              >
                <Icon name="compass" size={17} />
                <span>{sc.navExplore}</span>
              </button>
              <button
                className={view === 'nearby' ? 'active' : ''}
                onClick={() => changeView('nearby')}
                aria-pressed={view === 'nearby'}
                title={sc.navNearby}
              >
                <Icon name="pin" size={17} />
                <span>{sc.navNearby}</span>
              </button>
              <button
                className={view === 'favorites' ? 'active' : ''}
                onClick={() => changeView('favorites')}
                aria-pressed={view === 'favorites'}
                title={sc.navFavorites}
              >
                <Icon name="heart" size={17} />
                <span>{sc.navFavorites}</span>
                {favorites.length > 0 && <small>{favorites.length}</small>}
              </button>
              <button
                onClick={() => setProfileOpen(true)}
                title={sc.navProfile}
              >
                <Icon name="user" size={17} />
                <span>{sc.navProfile}</span>
              </button>
            </nav>

            <div className="sidebar-tip">
              <Icon name="sparkles" size={22} />
              <strong>{sc.sidebarQuote}</strong>
              <p>{sc.sidebarSub}</p>
              <span>
                FIND&amp;GO
                <br />
                {strings.footer.tagline}
              </span>
            </div>

            <div className="sidebar-user">
              <span className="avatar">
                <Icon name="user" size={16} />
              </span>
              <div>
                <strong>{sc.userLabel}</strong>
                <span>{sc.userStatus}</span>
              </div>
              <Icon name="chevron-right" size={14} />
            </div>
          </aside>

          {/* App Main Body */}
          <div className="preview-main">
            <div className="preview-heading">
              <div>
                <p>{sc.greetingSub}</p>
                <h2>{sc.greetingHeading}</h2>
              </div>
              <span className="demo-badge">
                <span />
                {sc.demoBadge}
              </span>
            </div>

            {/* Search Input */}
            <div className="preview-search">
              <Icon name="search" size={18} />
              <input
                id="venue-search"
                type="search"
                aria-label={sc.searchPlaceholder}
                placeholder={sc.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="search-decoration" aria-hidden="true">
                <Icon name="sliders" size={16} />
              </span>
            </div>

            {/* Category / Activity Chips */}
            <div className="category-chips" role="group" aria-label="Purpose / Activity Filter">
              {activities.map((item) => (
                <button
                  key={item.id}
                  className={activity === item.id ? 'active' : ''}
                  aria-pressed={activity === item.id}
                  onClick={() => setActivity(activity === item.id ? '' : item.id)}
                >
                  <Icon name={item.icon} size={15} />
                  <span>{lang === 'vi' ? item.labelVi : item.label}</span>
                </button>
              ))}
            </div>

            {/* Combined Filters Row */}
            <div className="filter-row" role="group" aria-label="Venue Filter Criteria">
              <label className={`select-filter ${distance ? 'is-selected' : ''}`}>
                <Icon name="pin" size={13} />
                <select
                  aria-label={sc.filterDistance}
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                >
                  <option value="">{sc.filterDistance}</option>
                  <option value="2">{sc.filterDistanceOpt1}</option>
                  <option value="5">{sc.filterDistanceOpt2}</option>
                </select>
                <Icon name="chevron-down" size={12} />
              </label>

              <label className={`select-filter ${budget ? 'is-selected' : ''}`}>
                <Icon name="wallet" size={13} />
                <select
                  aria-label={sc.filterBudget}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">{sc.filterBudget}</option>
                  <option value="50000">{sc.filterBudgetOpt1}</option>
                  <option value="70000">{sc.filterBudgetOpt2}</option>
                  <option value="100000">{sc.filterBudgetOpt3}</option>
                </select>
                <Icon name="chevron-down" size={12} />
              </label>

              <label className={`select-filter ${people ? 'is-selected' : ''}`}>
                <Icon name="users" size={13} />
                <select
                  aria-label={sc.filterPeople}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                >
                  <option value="">{sc.filterPeople}</option>
                  <option value="1">{sc.filterPeopleOpt1}</option>
                  <option value="4">{sc.filterPeopleOpt2}</option>
                  <option value="6">{sc.filterPeopleOpt3}</option>
                  <option value="8">{sc.filterPeopleOpt4}</option>
                </select>
                <Icon name="chevron-down" size={12} />
              </label>

              <button
                className={`toggle-filter ${wifi ? 'is-selected' : ''}`}
                aria-pressed={wifi}
                onClick={() => setWifi(!wifi)}
              >
                <Icon name="wifi" size={13} />
                <span>{sc.wifi}</span>
              </button>

              <button
                className={`toggle-filter ${outlets ? 'is-selected' : ''}`}
                aria-pressed={outlets}
                onClick={() => setOutlets(!outlets)}
              >
                <Icon name="plug" size={13} />
                <span>{sc.outlets}</span>
              </button>
            </div>

            {/* Results Header */}
            <div className="results-heading">
              <div>
                <h3>
                  {view === 'favorites'
                    ? sc.resultsSavedTitle
                    : view === 'nearby'
                    ? sc.resultsNearbyTitle
                    : sc.resultsDefaultTitle}
                  <span aria-live="polite">
                    {matches.length} {sc.resultsCount}
                  </span>
                </h3>
                <p>{hasFilters ? sc.hasFiltersDesc : sc.defaultDesc}</p>
              </div>

              {hasFilters && (
                <button className="reset-filters" onClick={resetFilters}>
                  {sc.resetFilters}
                  <Icon name="x" size={12} />
                </button>
              )}
            </div>

            {/* Venue Cards Grid */}
            <div className="venue-grid">
              {matches.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  saved={favorites.includes(venue.id)}
                  onSave={toggleFavorite}
                  onDetails={setSelectedVenue}
                  lang={lang}
                  strings={strings}
                />
              ))}
            </div>

            {/* Empty State */}
            {matches.length === 0 && (
              <div className="empty-results">
                <Icon name={view === 'favorites' ? 'heart' : 'search'} size={32} />
                <h3>
                  {view === 'favorites' && favorites.length === 0
                    ? sc.emptyFavTitle
                    : sc.emptyTitle}
                </h3>
                <p>
                  {view === 'favorites' && favorites.length === 0
                    ? sc.emptyFavDesc
                    : sc.emptyDesc}
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    resetFilters();
                    if (view === 'favorites' && favorites.length === 0) setView('explore');
                  }}
                >
                  {view === 'favorites' && favorites.length === 0
                    ? sc.emptyBtnExplore
                    : sc.emptyBtnReset}
                </button>
              </div>
            )}

            {/* Quick Example Search */}
            <div className="example-search">
              <span>
                <Icon name="sparkles" size={15} />
                <span>{sc.exampleQuery}</span>
              </span>
              <button onClick={applyExample}>
                <span>{sc.exampleBtn}</span>
                <Icon name="arrow-right" size={14} />
              </button>
            </div>

            <p className="demo-note">
              <Icon name="info" size={12} />
              {sc.disclaimer}
            </p>
            <p className="sr-only" role="status">
              {announcement}
            </p>
          </div>
        </div>
      </div>

      <div className="preview-glow" aria-hidden="true" />

      {/* Venue Detail Modal */}
      {selectedVenue && (
        <Modal title={selectedVenue.name} onClose={() => setSelectedVenue(null)}>
          <VenueImage
            className="modal-venue-image"
            src={selectedVenue.image}
            alt={lang === 'vi' ? selectedVenue.imageAltVi : selectedVenue.imageAlt}
            width="640"
            height="400"
          />
          <span className="modal-demo-label">
            {lang === 'vi' ? 'ĐỊA ĐIỂM MINH HỌA' : 'DEMO VENUE'} · {selectedVenue.category}
          </span>
          <p>{lang === 'vi' ? selectedVenue.detailsVi : selectedVenue.details}</p>

          <div className="modal-facts">
            <span>
              <Icon name="wallet" size={18} />~{' '}
              {formatPrice(selectedVenue.priceMin, lang)}–
              {formatPrice(selectedVenue.priceMax, lang)}{' '}
              {lang === 'vi' ? 'đ' : 'VND'} {sc.perPerson}
            </span>
            <span>
              <Icon name="users" size={18} />
              {sc.maxPeople} {selectedVenue.people}
            </span>
            <span>
              <Icon name="pin" size={18} />
              {lang === 'vi' ? selectedVenue.areaVi : selectedVenue.area}
            </span>
            {selectedVenue.wifi && (
              <span>
                <Icon name="wifi" size={18} />
                {lang === 'vi' ? `Có sẵn ${sc.wifi}` : `${sc.wifi} available`}
              </span>
            )}
            {selectedVenue.outlets && (
              <span>
                <Icon name="plug" size={18} />
                {lang === 'vi' ? `Có sẵn ${sc.outlets}` : `${sc.outlets} available`}
              </span>
            )}
          </div>

          <p className="modal-disclaimer">{sc.modalVerifiedNotice}</p>

          <button
            className="btn btn-primary"
            aria-pressed={favorites.includes(selectedVenue.id)}
            onClick={() => toggleFavorite(selectedVenue.id)}
          >
            <Icon name="heart" size={17} />
            <span>
              {favorites.includes(selectedVenue.id)
                ? sc.savedVenue
                : sc.saveVenue}
            </span>
          </button>
        </Modal>
      )}

      {/* Profile Info Modal */}
      {profileOpen && (
        <Modal
          title={lang === 'vi' ? 'Hồ sơ người dùng' : 'Explorer Profile'}
          onClose={() => setProfileOpen(false)}
        >
          <div className="info-modal-icon">
            <Icon name="user" size={28} />
          </div>
          <p>
            {lang === 'vi'
              ? 'Bạn đang trải nghiệm chế độ demo, chưa cần tạo tài khoản. Tính năng đồng bộ đám mây sẽ khả dụng trong phiên bản tiếp theo.'
              : 'You are using the interactive guest demo. Cloud synchronization and personalized profiles will be available in the upcoming release.'}
          </p>
          <p>
            {lang === 'vi'
              ? 'Danh sách yêu thích được lưu cục bộ trong trình duyệt trên thiết bị này.'
              : 'Your bookmarked venues are safely stored locally in your browser.'}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setProfileOpen(false);
              changeView('favorites');
            }}
          >
            <span>{sc.resultsSavedTitle}</span>
            <Icon name="heart" size={17} />
          </button>
        </Modal>
      )}
    </div>
  );
}
