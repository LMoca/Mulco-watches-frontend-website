import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, ChevronDown, ShoppingBag, User, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useCurrency, CURRENCIES, type Currency } from '../context/CurrencyContext';
import { useAccount } from '../context/AccountContext';
import { useTheme } from '../context/ThemeContext';
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
  const { account, openMiniDashboard } = useAccount();
  const { theme, toggleTheme } = useTheme();
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
                className="h-8 md:h-9 transition-[filter] duration-300"
                style={theme === 'light' ? { filter: 'invert(1)' } : undefined}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <button className="flex items-center gap-1 text-[12px] font-sans uppercase tracking-[0.2em] text-brand-white hover:text-brand-gold transition-colors duration-[400ms]">
                  {t('nav.collections')}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-[400ms] ${megaOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Mega Dropdown */}
                <div
                  style={{ backgroundColor: 'rgb(var(--brand-black))' }}
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
                          className={`block text-[12px] font-sans uppercase tracking-[0.2em] transition-colors duration-[400ms] ${className}`}
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
                className="text-[12px] font-sans uppercase tracking-[0.2em] text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                {t('nav.accessories')}
              </Link>
              <Link
                to="/lookbook"
                className="text-[12px] font-sans uppercase tracking-[0.2em] text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                Lookbook
              </Link>
              <Link
                to="/our-story"
                className="text-[12px] font-sans uppercase tracking-[0.2em] text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                {t('nav.ourStory')}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={t('nav.search')}
                className="text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                <Search size={17} strokeWidth={1.5} />
              </button>

              {/* Language: EN · ES */}
              <div className="hidden sm:flex items-center gap-1 text-[12px] font-sans uppercase tracking-[0.2em]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-colors duration-[400ms] ${language === 'en' ? 'text-brand-gold' : 'text-brand-white/60 hover:text-brand-gold'}`}
                >
                  EN
                </button>
                <span className="text-brand-white/30">·</span>
                <button
                  onClick={() => setLanguage('es')}
                  className={`transition-colors duration-[400ms] ${language === 'es' ? 'text-brand-gold' : 'text-brand-white/60 hover:text-brand-gold'}`}
                >
                  ES
                </button>
              </div>

              {/* Currency: text display with ↓ */}
              <div ref={currencyRef} className="relative hidden sm:block">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="font-sans text-[12px] uppercase tracking-[0.2em] text-brand-white/80 hover:text-brand-gold transition-colors duration-[400ms]"
                  aria-label="Select currency"
                >
                  {currency} ↓
                </button>
                {currencyOpen && (
                  <div
                    style={{ backgroundColor: 'rgb(var(--brand-black))' }}
                    className="absolute right-0 top-full mt-3 w-28 border border-brand-gold/15 z-50 py-1"
                  >
                    {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.15em] transition-colors duration-[400ms] flex items-center justify-between ${
                          c === currency ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-white'
                        }`}
                      >
                        <span>{c}</span>
                        <span className="opacity-40">{CURRENCIES[c].symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Account icon / monogram */}
              {account ? (
                <button
                  onClick={openMiniDashboard}
                  aria-label="My account"
                  className="w-7 h-7 rounded-full border border-brand-gold/50 flex items-center justify-center hover:border-brand-gold transition-colors duration-[400ms] flex-shrink-0"
                >
                  <span className="font-serif text-[11px] text-brand-gold leading-none">
                    {account.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                  </span>
                </button>
              ) : (
                <a
                  href="/account/login"
                  aria-label="Sign in"
                  className="text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
                >
                  <User size={17} strokeWidth={1.5} />
                </a>
              )}

              {/* Cart — icon with count badge */}
              <button
                onClick={openDrawer}
                aria-label={t('nav.cart')}
                className="relative text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-gold text-brand-black text-[9px] font-sans font-bold flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                {theme === 'dark'
                  ? <Sun size={17} strokeWidth={1.5} />
                  : <Moon size={17} strokeWidth={1.5} />
                }
              </button>

              <button
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-brand-white hover:text-brand-gold transition-colors duration-[400ms]"
              >
                <Menu size={20} strokeWidth={1.5} />
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
