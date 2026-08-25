import { Link } from 'react-router-dom';
import { Shield, Award, Truck, RefreshCcw, Wrench } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Eyebrow from '../Eyebrow';

const trustItems = [
  { icon: Shield,      key: 'trust.swissMovement' },
  { icon: Award,       key: 'trust.warranty' },
  { icon: Truck,       key: 'trust.shipping' },
  { icon: RefreshCcw,  key: 'trust.returns' },
  { icon: Wrench,      key: 'trust.service' },
];

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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-brand-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-brand-black/10" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">
        <div className="mb-6 animate-fade-in-up flex items-center gap-3">
          <span className="font-sans text-[13px] font-bold tracking-[0.22em] uppercase text-brand-gold">
            Swiss Luxury Timepieces · Since 1958
          </span>
        </div>

        <h1
          className="font-serif text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] text-brand-white leading-[0.95] tracking-[-0.02em] mb-8 animate-fade-in-up"
          style={{ animationDelay: '80ms' }}
        >
          <span className="block">{t('hero.headline')}</span>
        </h1>

        <p
          className="font-sans text-brand-white text-[15px] font-bold tracking-[0.15em] uppercase mb-12 animate-fade-in-up"
          style={{ animationDelay: '180ms' }}
        >
          {t('hero.subtext')}
        </p>

        <div
          className="animate-fade-in-up flex flex-col sm:flex-row items-start sm:items-center gap-6"
          style={{ animationDelay: '300ms' }}
        >
          {/* Primary CTA — bordered gold, fills on hover */}
          <Link
            to="/collections"
            className="group inline-flex items-center h-14 px-10 bg-brand-gold text-brand-black text-[13px] font-sans uppercase tracking-[0.15em] hover:opacity-75 transition-all duration-500 ease-out"
          >
            {t('hero.cta')}
          </Link>

          {/* Secondary CTA — text only with animated underline */}
          <Link
            to="/our-story"
            className="group relative inline-flex items-center gap-2 text-[13px] font-sans uppercase tracking-[0.15em] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms]"
          >
            <span className="relative">
              Our Story
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </span>
            <span className="text-base leading-none text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Trust strip — bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-brand-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 py-6 flex items-center justify-between gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {trustItems.map(({ icon: Icon, key }) => (
            <div key={key} className="flex items-center gap-3 flex-shrink-0">
              <Icon size={22} className="text-brand-gold flex-shrink-0" strokeWidth={1.5} />
              <span className="font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand-white whitespace-nowrap">
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
