import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency, CURRENCIES, type Currency } from '../context/CurrencyContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { to: '/collections/women', labelKey: 'nav.women' },
  { to: '/collections/men', labelKey: 'nav.men' },
  { to: '/collections/new-arrivals', labelKey: 'nav.newArrivals' },
  { to: '/collections', labelKey: 'nav.collections' },
];

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const { t, language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-400 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-brand-black" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`relative w-full h-full flex flex-col transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-brand-gold/15">
          <Link to="/" onClick={onClose}>
            <img
              src="/images/ui/mulco_logo_blanco.png"
              alt="MULCO"
              className="h-8"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="font-serif text-3xl leading-none text-brand-gold/40 hover:text-brand-gold transition-colors duration-[400ms]"
          >
            ×
          </button>
        </div>

        {/* Nav grid — 2×2, fills remaining height */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2">
          {NAV_ITEMS.map(({ to, labelKey }, i) => {
            const isTop = i < 2;
            const isLeft = i % 2 === 0;
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden"
                style={{
                  borderRight: isLeft ? '1px solid rgba(201,168,76,0.12)' : undefined,
                  borderBottom: isTop ? '1px solid rgba(201,168,76,0.12)' : undefined,
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 130}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 130}ms`,
                }}
              >
                {/* Gold hover fill */}
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/[0.03] transition-colors duration-[400ms]" />

                {/* Index number accent */}
                <span className="text-[10px] font-sans tracking-[0.3em] text-brand-gold/40 group-hover:text-brand-gold/60 transition-colors duration-[400ms]">
                  0{i + 1}
                </span>

                <span className="font-serif text-[2rem] text-brand-white group-hover:text-brand-gold transition-colors duration-[400ms] text-center leading-tight px-4">
                  {t(labelKey)}
                </span>

                {/* Animated gold underline */}
                <span className="h-px bg-brand-gold/20 w-6 overflow-hidden">
                  <span className="block h-full bg-brand-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[400ms]" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-brand-gold/15 flex items-center justify-between gap-4">
          {/* Language + currency */}
          <div className="flex items-center gap-3 text-[11px] font-sans uppercase tracking-[0.2em]">
            <button
              onClick={() => setLanguage('en')}
              className={`transition-colors duration-[400ms] ${language === 'en' ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-gold'}`}
            >
              EN
            </button>
            <span className="text-brand-gold/30">·</span>
            <button
              onClick={() => setLanguage('es')}
              className={`transition-colors duration-[400ms] ${language === 'es' ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-gold'}`}
            >
              ES
            </button>
            <span className="text-brand-gold/20">|</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-[11px] font-sans uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms] outline-none cursor-pointer border-0 border-b border-brand-gold/20 pb-0.5 appearance-none"
            >
              {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                <option key={c} value={c} style={{ backgroundColor: 'rgb(var(--brand-black))', color: 'rgb(var(--brand-white))' }}>{c}</option>
              ))}
            </select>
          </div>

          {/* Social — text only */}
          <div className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.2em] text-brand-muted">
            <a href="https://www.instagram.com/mulcowatches" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-[400ms]">Instagram</a>
            <span className="text-brand-gold/30"> · </span>
            <a href="https://www.facebook.com/mulcowatches" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-[400ms]">Facebook</a>
            <span className="text-brand-gold/30"> · </span>
            <a href="https://twitter.com/mulcowatches" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-[400ms]">Twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
}
