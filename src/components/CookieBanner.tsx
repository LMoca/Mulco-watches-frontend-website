import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'mulco-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[300] bg-brand-black/95 backdrop-blur-sm border-t border-brand-gold/12"
      style={{ animation: 'fade-in-up 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 h-16 flex items-center justify-between gap-6">
        <p className="font-sans text-[12px] text-brand-muted leading-snug flex-1 min-w-0 truncate">
          We use cookies to enhance your experience.{' '}
          <Link
            to="/privacy-policy"
            className="text-brand-gold/60 hover:text-brand-gold transition-colors duration-[400ms] underline underline-offset-2"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-6 flex-shrink-0">
          <button
            onClick={decline}
            className="group relative font-sans text-[12px] text-brand-muted hover:text-brand-white transition-colors duration-[400ms]"
          >
            <span className="relative">
              Decline
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-muted/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
            </span>
          </button>
          <button
            onClick={accept}
            className="group relative font-sans text-[12px] text-brand-gold hover:text-brand-white transition-colors duration-[400ms]"
          >
            <span className="relative">
              Accept All
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
