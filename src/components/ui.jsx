import { useLayoutEffect, useRef } from 'react';

const paths = {
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.7" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16.5 7.5-3 6-6 3 3-6 6-3Z" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  search: <><circle cx="10.8" cy="10.8" r="7.3" /><path d="m16 16 5 5" /></>,
  sliders: <><path d="M4 7h6m4 0h6M4 17h10m4 0h2" /><circle cx="12" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></>,
  'arrow-right': <path d="M4 12h16m-6-6 6 6-6 6" />,
  'arrow-left': <path d="M20 12H4m6-6-6 6 6 6" />,
  'arrow-up-right': <path d="M6 18 18 6M6 6h12v12" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-left': <path d="m15 18-6-6 6-6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  coffee: <><path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm13 1h1a3 3 0 1 1 0 6h-1M3 22h16M7 2v3m4-3v3m4-3v3" /></>,
  book: <><path d="M12 5C9 3 5 3 2 4v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1Zm0 0v15" /></>,
  utensils: <><path d="M4 2v7c0 3 6 3 6 0V2M7 2v20M20 2c-4 2-5 6-5 10h5m0-10v20" /></>,
  users: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-2-4" /></>,
  wifi: <><path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-10 4a5 5 0 0 1 6 0" /><circle cx="12" cy="20" r=".8" fill="currentColor" /></>,
  plug: <><path d="M8 2v5m8-5v5M6 7h12v4a6 6 0 0 1-12 0V7Zm6 10v5" /></>,
  sparkles: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4" /></>,
  map: <><path d="m9 3 6 3 6-3v18l-6 3-6-3-6 3V6l6-3Zm0 0v18m6-15v18" transform="translate(0 -1) scale(1 .92)" /></>,
  wallet: <><path d="M20 8V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v11H5a3 3 0 0 1-3-3V6m18 6h-5v5h5" /><path d="M16.5 14.5h.1" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  x: <path d="m6 6 12 12M6 18 18 6" />,
  user: <><circle cx="12" cy="7" r="4" /><path d="M4 22v-3a8 8 0 0 1 16 0v3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10h.01" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  rocket: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3m7.5-6.5a6.5 6.5 0 0 1 4.5-4.5c0 0-1.5 5-4.5 7.5L13.5 11l-2.5-2.5 5.5-3z" />,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
};

export function Icon({ name, size = 20, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`icon ${className}`}
      {...props}
    >
      {paths[name] || paths.compass}
    </svg>
  );
}

export function Brand({ size = 32, showText = true }) {
  return (
    <span className="brand">
      <span className="brand-mark">
        <img
          src="/assets/logo.png"
          alt="FIND&GO Logo"
          className="brand-logo-img"
          width={size}
          height={size}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </span>
      {showText && (
        <span className="brand-text">
          FIND<span className="brand-amp">&</span>GO
        </span>
      )}
    </span>
  );
}

export function VenueImage({ src, alt, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      {...props}
      onError={(event) => {
        event.currentTarget.onerror = null;
        if (!event.currentTarget.src.endsWith('/assets/venue-fallback.svg')) {
          event.currentTarget.src = '/assets/venue-fallback.svg';
        }
      }}
    />
  );
}

export function Modal({ title, children, onClose }) {
  const dialogRef = useRef(null);
  const openerRef = useRef(document.activeElement);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      const opener = openerRef.current;
      const menuToggle = document.querySelector('.menu-toggle');
      const fallback = menuToggle?.getClientRects().length ? menuToggle : document.querySelector('.header-bar a');
      (opener?.isConnected && opener.getClientRects().length ? opener : fallback)?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            onClose();
          }
        }
      }}
    >
      <div className="modal-header">
        <h2 id="dialog-title">{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="Close dialog" autoFocus>
          <Icon name="x" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
