import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-black border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link to="/">
            <img
              src="https://mulco.com/cdn/shop/files/mulco_logo_blanco.png?v=1613552939"
              alt="MULCO"
              className="h-8"
            />
          </Link>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-14">
          {/* Shop */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold mb-4">
              {t('footer.shop')}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/collections/men" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.men')}
              </Link>
              <Link to="/collections/women" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.women')}
              </Link>
              <Link to="/collections/new-arrivals" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.newArrivals')}
              </Link>
              <Link to="/accessories" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.accessories')}
              </Link>
              <Link to="/collections" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.collections')}
              </Link>
            </nav>
          </div>

          {/* About */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold mb-4">
              {t('footer.about')}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/our-story" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.ourStory')}
              </Link>
              <Link to="/faq" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('footer.warranty')}
              </Link>
              <Link to="/faq" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('footer.repairs')}
              </Link>
              <Link to="/faq" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('nav.faq')}
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold mb-4">
              {t('footer.support')}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/faq" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('footer.shippingPolicy')}
              </Link>
              <Link to="/faq" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('footer.returns')}
              </Link>
              <Link to="/support" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('footer.contact')}
              </Link>
              <Link to="/support" className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                {t('footer.storeLocation')}
              </Link>
            </nav>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-10">
          <a
            href="https://www.instagram.com/mulcowatches"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-brand-muted hover:text-brand-gold transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/mulcowatches"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-brand-muted hover:text-brand-gold transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://twitter.com/mulcowatches"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-brand-muted hover:text-brand-gold transition-colors"
          >
            <Twitter size={20} />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-gold/10 pt-6 text-center">
          <p className="text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-xs text-brand-muted mt-1">
            19790 W Dixie Hwy, Suite 201, Aventura, FL 33180
          </p>
        </div>
      </div>
    </footer>
  );
}
