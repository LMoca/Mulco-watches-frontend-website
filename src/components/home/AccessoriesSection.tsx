import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import Eyebrow from '../Eyebrow';

const categories = [
  {
    key: 'jewelry',
    label: 'Jewelry',
    eyebrow: 'ADORNMENT',
    href: '/accessories/jewelry',
    image: '/images/jewelry/havana_gold_chain_necklace/havana_gold_chain_necklace_01.jpg',
  },
  {
    key: 'straps',
    label: 'Straps',
    eyebrow: 'EXPRESSION',
    href: '/accessories/straps',
    image: '/images/straps/silicone_strap_yellow/silicone_strap_yellow_01.jpg',
  },
];

function CategoryStrip({ cat, index, inView }: {
  cat: typeof categories[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={cat.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden block gpu"
      style={{
        height: '50vh',
        minHeight: '320px',
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
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/75 via-brand-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
        <Eyebrow text={cat.eyebrow} className="mb-4" />
        <div className="relative inline-block self-start">
          <h3 className="font-serif text-[2.25rem] md:text-[2.75rem] text-brand-white leading-none">
            {cat.label}
          </h3>
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

export default function AccessoriesSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView(0.08);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-40 lg:py-52 bg-brand-navy"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24">
        <div
          className="mb-16 md:mb-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <Eyebrow text="Complete the Look" />
          <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] text-brand-white mt-3 leading-[0.95] tracking-[-0.02em]">
            {t('accessories.title')}
          </h2>
          <div
            className="h-px bg-brand-gold mt-5 origin-left"
            style={{
              width: inView ? '40px' : '0px',
              transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s',
            }}
          />
        </div>

        <div className="flex flex-col gap-5 md:gap-10 lg:gap-14">
          {categories.map((cat, i) => (
            <CategoryStrip key={cat.key} cat={cat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
