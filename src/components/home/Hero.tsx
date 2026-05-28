import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Static background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url(/images/ui/Banner_principal_web_Usa_Spring_2800x1000_crop_center.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-brand-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/75 to-brand-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <p
          className="text-xs uppercase tracking-[0.38em] text-brand-gold mb-5 animate-fade-in-up drop-shadow-[0_1px_8px_rgba(0,0,0,1)]"
          style={{ animationDelay: '0ms' }}
        >
          Swiss Luxury Timepieces · Since 1958
        </p>

        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.05] mb-6 animate-fade-in-up drop-shadow-[0_2px_24px_rgba(0,0,0,1)]"
          style={{ animationDelay: '80ms' }}
        >
          <span className="block">{t('hero.headline')}</span>
        </h1>

        <p
          className="text-white/90 text-base sm:text-lg max-w-sm mb-10 animate-fade-in-up leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,1)]"
          style={{ animationDelay: '180ms' }}
        >
          {t('hero.subtext')}
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-3 border border-brand-gold text-brand-gold text-xs uppercase tracking-[0.22em] px-10 py-4 hover:bg-brand-gold hover:text-brand-black transition-all duration-300 ease-out"
          >
            <span>{t('hero.cta')}</span>
            <span className="w-4 h-px bg-brand-gold group-hover:bg-brand-black group-hover:translate-x-1 transition-all duration-300 ease-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}
