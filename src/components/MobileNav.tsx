import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
        className={`relative w-full h-full flex flex-col transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-brand-gold/20">
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
            className="text-brand-white hover:text-brand-gold transition-colors duration-200 p-1"
          >
            <X size={24} />
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
                  borderRight: isLeft ? '1px solid rgba(201,168,76,0.15)' : undefined,
                  borderBottom: isTop ? '1px solid rgba(201,168,76,0.15)' : undefined,
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60 + 100}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60 + 100}ms`,
                }}
              >
                {/* Gold hover fill */}
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-300" />

                {/* Index number accent */}
                <span className="text-[10px] font-sans tracking-[0.3em] text-brand-gold/50 group-hover:text-brand-gold transition-colors duration-200">
                  0{i + 1}
                </span>

                <span className="font-serif text-2xl sm:text-3xl text-brand-white group-hover:text-brand-gold transition-colors duration-200 text-center leading-tight px-4">
                  {t(labelKey)}
                </span>

                {/* Animated gold underline */}
                <span
                  className="h-px bg-brand-gold origin-center transition-all duration-350"
                  style={{ width: '24px' }}
                >
                  <span className="block h-full bg-brand-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-brand-gold/20 flex items-center justify-between">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-xs uppercase tracking-[0.25em] text-brand-muted hover:text-brand-gold transition-colors duration-200"
          >
            {language === 'en' ? 'Español' : 'English'}
          </button>
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold/40">
            Since 1958
          </span>
        </div>
      </div>
    </div>
  );
}
