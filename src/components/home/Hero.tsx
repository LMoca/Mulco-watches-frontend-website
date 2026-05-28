import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let currentY = 0;
    let targetY = 0;

    function onScroll() {
      targetY = window.scrollY * 0.3;
    }

    function tick() {
      // Lerp for silky smooth parallax
      currentY += (targetY - currentY) * 0.08;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0,${currentY}px,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.15] will-change-transform gpu"
        style={{
          backgroundImage:
            'url(https://mulco.com/cdn/shop/files/Banner_principal_web_Usa_Spring_2800x1000_crop_center.jpg?v=1772208511)',
          backgroundSize: 'contain',
          backgroundPosition: 'center top',
        }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/88 via-brand-black/55 to-brand-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/75 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        <p
          className="text-xs uppercase tracking-[0.38em] text-brand-gold mb-5 animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          Swiss Luxury Timepieces · Since 1958
        </p>

        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.05] mb-6 animate-fade-in-up drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]"
          style={{ animationDelay: '80ms' }}
        >
          <span className="block">{t('hero.headline')}</span>
        </h1>

        <p
          className="text-[#D4D4CC] text-base sm:text-lg max-w-sm mb-10 animate-fade-in-up leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
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
