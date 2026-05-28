import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';

const CAMPAIGN_IMAGE = 'https://mulco.com/cdn/shop/collections/X2A2691.jpg?v=1777411699';

export default function BrandStory() {
  const { ref: headlineRef, inView: headlineInView } = useInView(0.2);
  const { ref: contentRef, inView: contentInView } = useInView(0.1);
  const { t } = useLanguage();

  return (
    <section className="bg-brand-black relative overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-28">
        {/* Headline block */}
        <div
          ref={headlineRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-20"
          style={{
            opacity: headlineInView ? 1 : 0,
            transform: headlineInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-xs tracking-[0.3em] text-brand-gold uppercase font-sans font-medium">
            Heritage
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-brand-white mt-3 leading-none">
            {t('story.headline')}
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto mt-6" />
        </div>

        {/* Two-column layout */}
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
          style={{
            opacity: contentInView ? 1 : 0,
            transform: contentInView ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1) 0.12s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.12s',
          }}
        >
          {/* Left: Editorial copy */}
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="font-sans text-brand-white/80 leading-relaxed text-base md:text-lg">
              In the watchmaking ateliers of Switzerland, 1958 marked a turning point. Muller & Co. set out not merely to build timepieces, but to challenge the assumption that precision had to be conservative.
            </p>
            <p className="font-sans text-brand-white/70 leading-relaxed text-base">
              For decades, MULCO earned its reputation among collectors who valued both the mechanics within and the statement without. Swiss movements, hand-finished cases, water resistance built for the bold — each piece carried an unspoken promise: this watch would be noticed.
            </p>
            <p className="font-sans text-brand-white/70 leading-relaxed text-base">
              When Jennifer Muller took the helm, she brought an entirely new vocabulary to fine watchmaking. Her conviction — that fashion and precision engineering belonged together, not in opposition — reshaped every collection that followed. Swarovski crystals met Swiss quartz. Mother-of-pearl dials arrived alongside ion-plated steel. The Cobra. The Buzo. The Kripton. Names that meant something.
            </p>
            <p className="font-sans text-brand-white/70 leading-relaxed text-base">
              Today, MULCO is worn in 47 countries. Not because it is the oldest name in watchmaking, but because it remains the most willing to be different. Every collection is a wager that the people who wear MULCO would rather stand out than fit in.
            </p>

            <div className="pt-4">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-widest text-brand-gold uppercase border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-200 group"
              >
                {t('story.cta')}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Campaign image */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
              <img
                src={CAMPAIGN_IMAGE}
                alt="MULCO campaign — Swiss precision meets bold fashion design"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent pointer-events-none" />
              {/* Corner accent */}
              <div className="absolute bottom-6 left-6">
                <span className="font-serif text-brand-white/60 text-sm tracking-widest">Switzerland · 1958</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
