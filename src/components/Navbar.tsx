import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useCurrency, CURRENCIES, type Currency } from '../context/CurrencyContext';
import MobileNav from './MobileNav';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string>('women');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const currencyRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useLanguage();
  const { totalItems, openDrawer } = useCart();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    if (currencyOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [currencyOpen]);

  function handleMegaEnter() {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }

  function handleMegaLeave() {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
          scrolled
            ? 'bg-brand-black/96 backdrop-blur-md border-b border-brand-gold/10 shadow-[0_2px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/images/ui/mulco_logo_blanco.png"
                alt="MULCO"
                className="h-8 md:h-9"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <button className="flex items-center gap-1 text-sm uppercase tracking-wider text-brand-white hover:text-brand-gold transition-colors duration-200">
                  {t('nav.collections')}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Mega Dropdown */}
                <div
                  style={{ backgroundColor: '#0A0A0A' }}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] border border-brand-gold/15 rounded-sm transition-all duration-250 ease-out ${
                    megaOpen
                      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                      : 'opacity-0 -translate-y-3 scale-[0.98] pointer-events-none'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-0">
                    <div className="p-6 space-y-4">
                      {[
                        { key: 'women', to: '/collections/women', label: t('nav.women'), className: 'text-brand-white hover:text-brand-gold' },
                        { key: 'men', to: '/collections/men', label: t('nav.men'), className: 'text-brand-white hover:text-brand-gold' },
                        { key: 'new-arrivals', to: '/collections/new-arrivals', label: t('nav.newArrivals'), className: 'text-brand-white hover:text-brand-gold' },
                        { key: 'all', to: '/collections', label: `${t('nav.collections')} →`, className: 'text-brand-gold hover:text-brand-white mt-6' },
                      ].map(({ key, to, label, className }) => (
                        <Link
                          key={key}
                          to={to}
                          onMouseEnter={() => setActiveCollection(key)}
                          className={`block text-sm uppercase tracking-wider transition-colors ${className}`}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                    <div className="relative overflow-hidden">
                      {[
                        { key: 'women', src: '/images/ui/Banners_mega_menu_mujer_1.jpg' },
                        { key: 'men', src: '/images/ui/Banners_mega_menu_hombre_1.jpg' },
                        { key: 'new-arrivals', src: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg' },
                        { key: 'all', src: '/images/ui/Banners_mega_menu_hombre_2.jpg' },
                      ].map(({ key, src }) => (
                        <img
                          key={key}
                          src={src}
                          alt=""
                          aria-hidden={activeCollection !== key}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            opacity: activeCollection === key ? 1 : 0,
                            transition: 'opacity 0.4s ease',
                          }}
                        />
                      ))}
                      {/* Spacer to give the container height */}
                      <div className="w-full h-full invisible" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/accessories"
                className="text-sm uppercase tracking-wider text-brand-white hover:text-brand-gold transition-colors duration-200"
              >
                {t('nav.accessories')}
              </Link>
              <Link
                to="/lookbook"
                className="text-sm uppercase tracking-wider text-brand-white hover:text-brand-gold transition-colors duration-200"
              >
                Lookbook
              </Link>
              <Link
                to="/our-story"
                className="text-sm uppercase tracking-wider text-brand-white hover:text-brand-gold transition-colors duration-200"
              >
                {t('nav.ourStory')}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={t('nav.search')}
                className="text-brand-white hover:text-brand-gold transition-colors duration-200"
              >
                <Search size={18} />
              </button>

              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-gold transition-colors duration-200 hidden sm:block"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>

              {/* Currency selector */}
              <div ref={currencyRef} className="relative hidden sm:block">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="flex items-center gap-0.5 text-xs uppercase tracking-widest text-brand-muted hover:text-brand-gold transition-colors duration-200"
                  aria-label="Select currency"
                >
                  {currency}
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {currencyOpen && (
                  <div
                    style={{ backgroundColor: '#0A0A0A' }}
                    className="absolute right-0 top-full mt-2 w-28 border border-brand-gold/15 shadow-lg z-50 py-1"
                  >
                    {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-[11px] font-sans uppercase tracking-widest transition-colors flex items-center justify-between ${
                          c === currency ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-white'
                        }`}
                      >
                        <span>{c}</span>
                        <span className="opacity-50">{CURRENCIES[c].symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={openDrawer}
                aria-label={t('nav.cart')}
                className="relative text-brand-white hover:text-brand-gold transition-colors duration-200"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-brand-white hover:text-brand-gold transition-colors duration-200"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
