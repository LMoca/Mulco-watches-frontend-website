import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import Eyebrow from '../Eyebrow';

const collections = [
  {
    key: 'women',
    label: 'nav.women',
    eyebrow: 'FOR HER',
    href: '/collections/women',
    image: '/images/ui/Banners_mega_menu_mujer_1.jpg',
  },
  {
    key: 'men',
    label: 'nav.men',
    eyebrow: 'FOR HIM',
    href: '/collections/men',
    image: '/images/ui/Banners_mega_menu_hombre_1.jpg',
  },
  {
    key: 'new-arrivals',
    label: 'nav.newArrivals',
    eyebrow: 'JUST ARRIVED',
    href: '/collections/new-arrivals',
    image: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',
  },
  {
    key: 'accessories',
    label: 'nav.accessories',
    eyebrow: 'BEYOND THE WATCH',
    href: '/accessories',
    image: '/images/jewelry/havana_gold_chain_necklace/havana_gold_chain_necklace_01.jpg',
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
      className="group relative overflow-hidden aspect-[4/5] block gpu"
      style={{
        opacity: parentInView ? 1 : 0,
        transform: parentInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={t(item.label)}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Consistent gradient — no hover shift */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <Eyebrow text={item.eyebrow} className="mb-3" />
        <div className="relative inline-block">
          <h3 className="font-serif text-[2.5rem] text-brand-white leading-none">{t(item.label)}</h3>
          {/* Gold underline animates in on hover */}
          <span
            className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left"
            style={{
              transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
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
      className="py-24 md:py-40 lg:py-52 px-6 md:px-14 lg:px-24 max-w-[1440px] mx-auto"
    >
      <div
        className="text-center mb-16 md:mb-20"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <Eyebrow text="Our Collections" className="justify-center" />
        <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] text-brand-white mt-3 leading-[0.95] tracking-[-0.02em]">
          {t('collections.title')}
        </h2>
        <div
          className="mx-auto mt-5 h-px bg-brand-gold origin-center"
          style={{
            width: inView ? '48px' : '0px',
            transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s',
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-10">
        {collections.map((item, i) => (
          <CollectionCard key={item.key} item={item} index={i} parentInView={inView} />
        ))}
      </div>
    </section>
  );
}
