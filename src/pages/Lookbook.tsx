import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useCurrency } from '../context/CurrencyContext';

interface Chapter {
  id: string;
  eyebrow: string;
  headline: string;
  quote: string;
  body: string;
  bg: string;
  watchImg: string;
  watchName: string;
  watchCollection: string;
  watchPrice: string;
  watchHref: string;
  collectionHref: string;
  flip?: boolean;
}

const chapters: Chapter[] = [
  {
    id: 'blue-marine',
    eyebrow: 'Chapter I',
    headline: 'The Ocean Edit',
    quote: 'Depth without limits.\nColor without restraint.',
    body: 'Born from the open sea, the Blue Marine collection channels the raw beauty of ocean depths — mother-of-pearl dials that shift with the light, Swarovski crystal indices that catch every wave. For women who move between worlds without slowing down.',
    bg: '/images/ui/Banners_mega_menu_mujer_1.jpg',
    watchImg: '/images/watches/blue_marine_fusion/white/blue_marine_fusion_white.jpg',
    watchName: 'Blue Marine Fusion',
    watchCollection: 'Blue Marine',
    watchPrice: '$205',
    watchHref: '/product/blue-marine-fusion',
    collectionHref: '/collections/women',
  },
  {
    id: 'buzo',
    eyebrow: 'Chapter II',
    headline: 'The Dive',
    quote: 'Built for those\nwho go deeper.',
    body: 'The Buzo collection is unapologetic — engineered for 100-metre water resistance, wrapped in ion-plated steel and high-performance silicone. Worn by those who treat the ocean not as a backdrop but as a destination.',
    bg: '/images/ui/Banners_mega_menu_hombre_1.jpg',
    watchImg: '/images/watches/buzo_dive_silicone/orange/buzo_dive_silicone_orange.jpg',
    watchName: 'Buzo Dive Silicone',
    watchCollection: 'Buzo',
    watchPrice: '$220',
    watchHref: '/product/buzo-dive-silicone',
    collectionHref: '/collections/men',
    flip: true,
  },
  {
    id: 'enchanted',
    eyebrow: 'Chapter III',
    headline: 'The Garden',
    quote: 'Every petal,\na new palette.',
    body: 'The Enchanted collection draws from the language of flowers — seasonal pigments, rose gold accents, and dials that bloom in every direction. A timepiece that refuses to be invisible, for women who feel the same.',
    bg: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',
    watchImg: '/images/watches/enchanted_maple/pink/enchanted_maple_pink.jpg',
    watchName: 'Enchanted Maple',
    watchCollection: 'Enchanted',
    watchPrice: '$195',
    watchHref: '/product/enchanted-maple',
    collectionHref: '/collections/women',
  },
  {
    id: 'cobra',
    eyebrow: 'Chapter IV',
    headline: 'The Strike',
    quote: 'Bold enough to be seen.\nPrecise enough to mean it.',
    body: 'The Cobra collection commands attention — ion-plated steel, aggressive lines, and a presence that clears the room before you say a word. Swiss movement inside. Statement maker outside.',
    bg: '/images/ui/Banners_mega_menu_hombre_2.jpg',
    watchImg: '/images/watches/cobra/yellow/cobra_yellow.jpg',
    watchName: 'Cobra',
    watchCollection: 'Cobra',
    watchPrice: '$205',
    watchHref: '/product/cobra',
    collectionHref: '/collections/men',
    flip: true,
  },
];

const featuredGrid = [
  { name: 'Kripton Lady',        href: '/product/kripton-lady',        img: '/images/watches/kripton_lady/white/kripton_lady_white.jpg',                   price: 215 },
  { name: 'Buzo Atlantis',       href: '/product/buzo-atlantis',       img: '/images/watches/buzo_atlantis/black_and_blue/buzo_atlantis_black_and_blue.jpg', price: 245 },
  { name: 'Blue Marine Medusa',  href: '/product/blue-marine-medusa',  img: '/images/watches/blue_marine_medusa/beige/blue_marine_medusa_beige.jpg',         price: 196 },
  { name: 'Evol Reloaded',       href: '/product/evol-reloaded',       img: '/images/watches/evol_reloaded/black/evol_reloaded_black.jpg',                  price: 215 },
  { name: 'Frost Full Moon',     href: '/product/frost-full-moon',     img: '/images/watches/frost_full_moon/white/frost_full_moon_white.jpg',               price: 195 },
  { name: 'Kripton Viper',       href: '/product/kripton-viper',       img: '/images/watches/kripton_viper/black/kripton_viper_black.jpg',                  price: 210 },
];

function FadeSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ChapterSection({ chapter }: { chapter: Chapter }) {
  const { ref, inView } = useInView(0.06);
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src={chapter.bg}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.35)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-brand-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${chapter.flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>

          {/* Text side */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-gold mb-3">{chapter.eyebrow} · {chapter.watchCollection}</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-white leading-none mb-6">{chapter.headline}</h2>
            <div className="w-10 h-px bg-brand-gold mb-8" />
            <blockquote className="font-serif text-2xl md:text-3xl text-brand-white/80 italic leading-snug mb-8 whitespace-pre-line">
              "{chapter.quote}"
            </blockquote>
            <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-md mb-10">{chapter.body}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={chapter.watchHref}
                className="inline-flex items-center gap-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-brand-white transition-colors duration-200"
              >
                Shop {chapter.watchName} <ArrowRight size={12} />
              </Link>
              <Link
                to={chapter.collectionHref}
                className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold text-xs font-sans tracking-[0.2em] uppercase px-8 py-3.5 hover:border-brand-gold hover:text-brand-white transition-colors duration-200"
              >
                Full Collection
              </Link>
            </div>
          </div>

          {/* Watch image side */}
          <div
            ref={imgRef}
            className={`flex ${chapter.flip ? 'justify-start' : 'justify-end'}`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
              transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1) 150ms, transform 1s cubic-bezier(0.22,1,0.36,1) 150ms',
            }}
          >
            <div className="relative w-72 md:w-96 group">
              {/* Decorative frame */}
              <div className="absolute -inset-3 border border-brand-gold/15 pointer-events-none" />
              <div className="absolute -inset-6 border border-brand-gold/6 pointer-events-none" />
              <img
                src={chapter.watchImg}
                alt={chapter.watchName}
                className="w-full aspect-square object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              {/* Price tag */}
              <div className="absolute bottom-4 left-4 bg-brand-black/80 backdrop-blur-sm px-4 py-2 border-l-2 border-brand-gold">
                <p className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold">{chapter.watchCollection}</p>
                <p className="font-serif text-base text-brand-white">{chapter.watchName}</p>
                <p className="font-serif text-brand-gold text-sm mt-0.5">{chapter.watchPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter divider number */}
      <div className="absolute bottom-8 right-8 font-serif text-[120px] text-brand-white/[0.03] leading-none pointer-events-none select-none">
        {chapter.id === 'blue-marine' ? 'I' : chapter.id === 'buzo' ? 'II' : chapter.id === 'enchanted' ? 'III' : 'IV'}
      </div>
    </section>
  );
}

export default function Lookbook() {
  const { formatPrice } = useCurrency();
  return (
    <div className="min-h-screen bg-brand-black">

      {/* ── Hero ── */}
      <div className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <img
          src="/images/ui/Banner_principal_web_Usa_Spring_2800x1000_crop_center.jpg"
          alt="MULCO Spring Campaign"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-brand-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-8">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Lookbook</span>
          </nav>

          <p
            className="text-[10px] font-sans tracking-[0.4em] uppercase text-brand-gold mb-4 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            Spring / Summer 2026 · The Bold Edit
          </p>
          <h1
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-white leading-none animate-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            Look<br />book
          </h1>
          <div
            className="w-12 h-px bg-brand-gold mt-6 mb-6 animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          />
          <p
            className="font-sans text-sm text-white/70 max-w-xs leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            Four collections. Four perspectives on what it means to wear time boldly.
          </p>

          {/* Scroll cue */}
          <div
            className="mt-12 flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: '360ms' }}
          >
            <div className="w-px h-10 bg-brand-gold/40" />
            <span className="text-[9px] font-sans tracking-[0.35em] uppercase text-brand-muted">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* ── Chapters ── */}
      {chapters.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      {/* ── Featured grid ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-brand-black border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-14">
              <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-gold mb-3">Also In the Edit</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-white">More Pieces Worth Wearing</h2>
              <div className="w-10 h-px bg-brand-gold mx-auto mt-5" />
            </div>
          </FadeSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {featuredGrid.map((item, i) => (
              <FadeSection key={item.href} delay={i * 80}>
                <Link to={item.href} className="group block relative overflow-hidden aspect-square">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div
                    className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350"
                  >
                    <p className="font-serif text-base text-brand-white">{item.name}</p>
                    <p className="font-serif text-brand-gold text-sm mt-0.5">{formatPrice(item.price)}</p>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <FadeSection>
        <section className="py-24 px-6 text-center border-t border-brand-gold/10">
          <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-gold mb-4">The Full Collection</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-white mb-3">Every Timepiece. Every Story.</h2>
          <p className="font-sans text-sm text-brand-muted max-w-sm mx-auto leading-relaxed mb-10">
            Explore the complete MULCO universe — over 26 watches across 16 iconic collections.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.22em] uppercase px-10 py-4 hover:bg-brand-white transition-colors duration-200"
            >
              Shop All Watches <ArrowRight size={13} />
            </Link>
            <Link
              to="/our-story"
              className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-gold text-xs font-sans tracking-[0.2em] uppercase px-10 py-4 hover:border-brand-gold hover:text-brand-white transition-colors duration-200"
            >
              Our Story
            </Link>
          </div>
        </section>
      </FadeSection>

    </div>
  );
}
