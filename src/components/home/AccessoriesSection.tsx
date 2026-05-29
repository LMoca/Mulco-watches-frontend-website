import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

const categories = [
  {
    key: 'jewelry',
    label: 'Jewelry',
    desc: 'Crafted to complement.',
    href: '/accessories/jewelry',
    image: '/images/jewelry/havana_gold_chain_necklace/havana_gold_chain_necklace_01.jpg',
  },
  {
    key: 'straps',
    label: 'Straps',
    desc: 'Change the look. Keep the precision.',
    href: '/accessories/straps',
    image: '/images/straps/silicone_strap_yellow/silicone_strap_yellow_01.jpg',
  },
];

function CategoryCard({ cat, index, inView }: {
  cat: typeof categories[number];
  index: number;
  inView: boolean;
}) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={cat.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden aspect-[3/4] block gpu"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 110}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 110}ms`,
      }}
    >
      <img
        src={cat.image}
        alt={cat.label}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.75s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 55%, transparent 100%)'
            : 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.12) 55%, transparent 100%)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-2xl text-brand-white mb-1.5">{cat.label}</h3>

        <p
          className="text-sm text-brand-muted leading-snug mb-3"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {cat.desc}
        </p>

        <span
          className="inline-flex items-center gap-2 text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-brand-gold"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease 0.05s, transform 0.38s cubic-bezier(0.22,1,0.36,1) 0.05s',
          }}
        >
          {t('accessories.discover')} <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  );
}

export default function AccessoriesSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView(0.08);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-28 bg-brand-navy"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div
          className="mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
            Complete the Look
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-white mt-2">
            {t('accessories.title')}
          </h2>
          <div
            className="h-px bg-brand-gold mt-4 origin-left"
            style={{
              width: inView ? '40px' : '0px',
              transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s',
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.key} cat={cat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
