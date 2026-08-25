import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PaymentIcons from './PaymentIcons';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-black border-t border-brand-gold/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-20 md:py-28">

        {/* Logo — centered, 120px max */}
        <div className="flex justify-center mb-16">
          <Link to="/">
            <img
              src="/images/ui/mulco_logo_blanco.png"
              alt="MULCO"
              style={{ maxWidth: '120px' }}
              className="h-auto opacity-80 hover:opacity-100 transition-opacity duration-[400ms]"
            />
          </Link>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 mb-5">{t('footer.shop')}</p>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/collections/men', label: t('nav.men') },
                { to: '/collections/women', label: t('nav.women') },
                { to: '/collections/new-arrivals', label: t('nav.newArrivals') },
                { to: '/accessories', label: t('nav.accessories') },
                { to: '/collections', label: t('nav.collections') },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="font-sans text-[13px] text-brand-muted hover:text-brand-white transition-colors duration-[400ms]">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 mb-5">{t('footer.about')}</p>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/our-story', label: t('nav.ourStory') },
                { to: '/membership', label: 'Membership' },
                { to: '/lookbook', label: 'Lookbook' },
                { to: '/campaign-films', label: 'Campaign Films' },
                { to: '/warranty-registration', label: 'Warranty Registration' },
                { to: '/watch-care', label: 'Watch Care Guide' },
                { to: '/faq', label: t('nav.faq') },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="font-sans text-[13px] text-brand-muted hover:text-brand-white transition-colors duration-[400ms]">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 mb-5">{t('footer.support')}</p>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/support', label: t('footer.contact') },
                { to: '/find-a-retailer', label: 'Find a Retailer' },
                { to: '/shipping', label: t('footer.shippingPolicy') },
                { to: '/returns', label: t('footer.returns') },
                { to: '/support', label: t('footer.storeLocation') },
              ].map(({ to, label }) => (
                <Link key={label} to={to} className="font-sans text-[13px] text-brand-muted hover:text-brand-white transition-colors duration-[400ms]">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Policies column */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 mb-5">Policies</p>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/returns', label: 'Refunds & Returns' },
                { to: '/discounts', label: 'Discounts & Promotions' },
                { to: '/shipping', label: 'Domestic Shipping' },
                { to: '/shipping', label: 'International Shipping' },
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
              ].map(({ to, label }) => (
                <Link key={label} to={to} className="font-sans text-[13px] text-brand-muted hover:text-brand-white transition-colors duration-[400ms]">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect column — social + payment */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 mb-5">Connect</p>
            <div className="flex flex-col gap-4 mb-8">
              <a href="https://www.instagram.com/mulcowatches" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-3 text-brand-muted hover:text-brand-gold transition-colors duration-[400ms]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                <span className="font-sans text-[13px]">Instagram</span>
              </a>
              <a href="https://www.facebook.com/mulcowatches" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center gap-3 text-brand-muted hover:text-brand-gold transition-colors duration-[400ms]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <span className="font-sans text-[13px]">Facebook</span>
              </a>
              <a href="https://twitter.com/mulcowatches" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="flex items-center gap-3 text-brand-muted hover:text-brand-gold transition-colors duration-[400ms]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="font-sans text-[13px]">X / Twitter</span>
              </a>
            </div>

            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold/80 mb-4">We Accept</p>
            <PaymentIcons />
          </div>
        </div>

        {/* As Seen In — text-only row */}
        <div className="border-t border-b border-brand-gold/10 py-7 mb-10 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-muted mb-4">As Seen In</p>
          <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">
            <a href="https://www.youtube.com/watch?v=Yp-FUcrB92M" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-[400ms]">E! Entertainment</a>
            <span className="text-brand-gold/30">·</span>
            <a href="https://www.fratellowatches.com/watchbrands/mulco/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-[400ms]">Fratello Watches</a>
            <span className="text-brand-gold/30">·</span>
            <a href="https://www.youtube.com/watch?v=Yp-FUcrB92M" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-[400ms]">The Grammy Awards</a>
          </div>
        </div>

        {/* Bottom bar — single line */}
        <div className="border-t border-brand-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 flex-wrap text-[11px] font-sans text-brand-muted">
          <span>&copy; {new Date().getFullYear()} {t('footer.copyright')}</span>
          <span className="hidden sm:inline text-brand-gold/25">·</span>
          <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors duration-[400ms]">Privacy Policy</Link>
          <span className="text-brand-gold/25">·</span>
          <Link to="/terms" className="hover:text-brand-gold transition-colors duration-[400ms]">Terms</Link>
          <span className="text-brand-gold/25">·</span>
          <Link to="/shipping" className="hover:text-brand-gold transition-colors duration-[400ms]">Shipping</Link>
          <span className="text-brand-gold/25">·</span>
          <Link to="/returns" className="hover:text-brand-gold transition-colors duration-[400ms]">Returns</Link>
        </div>
      </div>
    </footer>
  );
}
