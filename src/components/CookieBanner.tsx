import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

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
      className="fixed bottom-0 left-0 right-0 z-[300] px-4 pb-4 pointer-events-none"
      style={{ animation: 'slide-up 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-[#111111] border border-brand-gold/20 shadow-[0_-4px_40px_rgba(0,0,0,0.6)]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-1">Cookie Notice</p>
            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              We use cookies to enhance your browsing experience and analyse site traffic.
              By clicking <span className="text-brand-white">Accept All</span>, you consent to our use of cookies.{' '}
              <Link to="/privacy-policy" className="text-brand-gold hover:text-brand-white transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={decline}
              className="text-[10px] font-sans tracking-widest uppercase text-brand-muted border border-brand-gold/20 px-5 py-2.5 hover:border-brand-gold/40 hover:text-brand-white transition-colors duration-200"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="text-[10px] font-sans font-semibold tracking-widest uppercase bg-brand-gold text-brand-black px-5 py-2.5 hover:bg-brand-white transition-colors duration-200"
            >
              Accept All
            </button>
            <button
              onClick={decline}
              aria-label="Close"
              className="text-brand-muted hover:text-brand-gold transition-colors ml-1"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
