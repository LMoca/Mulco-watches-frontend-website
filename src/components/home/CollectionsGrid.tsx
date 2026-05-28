import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

const collections = [
  {
    key: 'women',
    label: 'nav.women',
    desc: 'Elegance in motion.',
    href: '/collections/women',
    image: '/images/ui/Banners_mega_menu_mujer_1.jpg',
    hoverImage: null,
  },
  {
    key: 'men',
    label: 'nav.men',
    desc: 'Bold precision.',
    href: '/collections/men',
    image: '/images/ui/Banners_mega_menu_hombre_1.jpg',
    hoverImage: '/images/ui/Banners_mega_menu_hombre_2.jpg',
  },
  {
    key: 'new-arrivals',
    label: 'nav.newArrivals',
    desc: 'Just arrived.',
    href: '/collections/new-arrivals',
    image: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',
    hoverImage: '/images/ui/Banners_mega_menu_mujer_1.jpg',
  },
  {
    key: 'all',
    label: 'nav.collections',
    desc: 'Every collection, every story.',
    href: '/collections',
    image: '/images/ui/Banners_mega_menu_hombre_2.jpg',
    hoverImage: '/images/ui/Banners_mega_menu_hombre_1.jpg',
  },
];

interface CardProps {
  item: (typeof collections)[number];
  index: number;
  parentInView: boolean;
}

function CollectionCard({ item, index, parentInView }: CardProps) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden aspect-[3/4] block gpu"
      style={{
        opacity: parentInView ? 1 : 0,
        transform: parentInView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.98)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}
    >
      {/* Base image */}
      <img
        src={item.image}
        alt={t(item.label)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          opacity: item.hoverImage ? (hovered ? 0 : 1) : 1,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'opacity 0.55s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Hover image (cross-fade) */}
      {item.hoverImage && (
        <img
          src={item.hoverImage}
          alt={`${t(item.label)} alternate`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1.06)' : 'scale(1.01)',
            transition: 'opacity 0.55s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      )}

      {/* Overlay — deepens on hover for text legibility */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.25) 55%, transparent 100%)'
            : 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.08) 55%, transparent 100%)',
        }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-2xl text-brand-white mb-1.5 drop-shadow-lg">{t(item.label)}</h3>

        <p
          className="text-sm text-brand-muted leading-snug transition-all duration-350 ease-out"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {item.desc}
        </p>

        <div className="mt-3 flex items-center gap-2 overflow-hidden">
          <div
            className="h-px bg-brand-gold origin-left"
            style={{
              width: '24px',
              transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.05s',
            }}
          />
          <span
            className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold flex items-center gap-1.5"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'opacity 0.3s ease 0.08s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.08s',
            }}
          >
            Explore <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CollectionsGrid() {
  const { t } = useLanguage();
  const { ref, inView } = useInView(0.08);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-28 px-4 max-w-7xl mx-auto"
    >
      <div
        className="text-center mb-12"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(22px)',
          transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
          Our Collections
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-brand-white mt-2">
          {t('collections.title')}
        </h2>
        <div
          className="mx-auto mt-4 h-px bg-brand-gold origin-center"
          style={{
            width: inView ? '48px' : '0px',
            transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s',
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {collections.map((item, i) => (
          <CollectionCard key={item.key} item={item} index={i} parentInView={inView} />
        ))}
      </div>
    </section>
  );
}
