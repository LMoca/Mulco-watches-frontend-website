import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { useCart } from '../../context/CartContext';

interface Watch {
  id: string;
  name: string;
  collection: string;
  price: string;
  priceNumber: number;
  originalPrice?: string;
  image: string;
  imageAlt: string;
  tags: string[];
}

const womenWatches: Watch[] = [
  {
    id: 'blue-marine-fusion',
    name: 'Blue Marine Fusion',
    collection: 'Blue Marine',
    price: '$205',
    priceNumber: 205,
    image: '/images/watches/blue_marine_fusion/blue_marine_fusion_white.jpg',
    imageAlt: 'MULCO Blue Marine Fusion ladies watch in white',
    tags: ['Swarovski Crystals', '100M WR'],
  },
  {
    id: 'blue-marine-infinity',
    name: 'Blue Marine Infinity',
    collection: 'Blue Marine',
    price: '$185',
    priceNumber: 185,
    image: '/images/watches/blue_marine_infinity/blue_marine_infinity_blue.jpg',
    imageAlt: 'MULCO Blue Marine Infinity ladies watch in blue',
    tags: ['Mother of Pearl', 'Quartz'],
  },
  {
    id: 'blue-marine-medusa',
    name: 'Blue Marine Medusa',
    collection: 'Blue Marine',
    price: '$196',
    priceNumber: 196,
    image: '/images/watches/blue_marine_medusa/blue_marine_medusa_beige.jpg',
    imageAlt: 'MULCO Blue Marine Medusa ladies watch',
    tags: ['Quartz Multifunctional', '100M WR'],
  },
  {
    id: 'enchanted-maple',
    name: 'Enchanted Maple',
    collection: 'Enchanted',
    price: '$195',
    priceNumber: 195,
    image: '/images/watches/enchanted_maple/enchanted_maple_pink.jpg',
    imageAlt: 'MULCO Enchanted Maple ladies watch in pink',
    tags: ['Rose Gold Details', '100M WR'],
  },
  {
    id: 'kripton-lady',
    name: 'Kripton Lady',
    collection: 'Kripton',
    price: '$215',
    priceNumber: 215,
    image: '/images/watches/kripton_lady/kripton_lady_white.jpg',
    imageAlt: 'MULCO Kripton Lady watch in white',
    tags: ['Pearl Finish', 'Rose Gold Accents'],
  },
  {
    id: 'titans-snap-ladies',
    name: 'Titans Snap Ladies',
    collection: 'Titans',
    price: '$140',
    priceNumber: 140,
    originalPrice: '$195',
    image: '/images/watches/titans_snap_ladies/titans_snap_ladies_blue.jpg',
    imageAlt: 'MULCO Titans Snap Ladies watch',
    tags: ['Quartz', '100M WR'],
  },
];

const menWatches: Watch[] = [
  {
    id: 'buzo-tentacles',
    name: 'Buzo Tentacles',
    collection: 'Buzo',
    price: '$215',
    priceNumber: 215,
    image: '/images/watches/buzo_tentacles/buzo_tentacles_black.jpg',
    imageAlt: "MULCO Buzo Tentacles men's watch",
    tags: ['IP Black Steel', '100M WR'],
  },
  {
    id: 'buzo-atlantis',
    name: 'Buzo Atlantis',
    collection: 'Buzo',
    price: '$245',
    priceNumber: 245,
    image: '/images/watches/buzo_atlantis/buzo_atlantis_black_and_blue.jpg',
    imageAlt: "MULCO Buzo Atlantis men's watch",
    tags: ['Quartz Multifunctional', '100M WR'],
  },
  {
    id: 'buzo-dive-silicone',
    name: 'Buzo Dive Silicone',
    collection: 'Buzo',
    price: '$220',
    priceNumber: 220,
    image: '/images/watches/buzo_dive_silicone/buzo_dive_silicone_orange.jpg',
    imageAlt: "MULCO Buzo Dive Silicone men's watch",
    tags: ['Chronograph', '100M WR'],
  },
  {
    id: 'buzo-dive-stainless-steel',
    name: 'Buzo Dive Stainless Steel',
    collection: 'Buzo',
    price: '$245',
    priceNumber: 245,
    image: '/images/watches/buzo_dive_stainless/buzo_dive_stainless_gold.jpg',
    imageAlt: "MULCO Buzo Dive Stainless Steel men's watch",
    tags: ['Chronograph', 'Steel Bracelet'],
  },
  {
    id: 'cobra',
    name: 'COBRA',
    collection: 'Cobra',
    price: '$205',
    priceNumber: 205,
    image: '/images/watches/cobra/cobra_yellow.jpg',
    imageAlt: "MULCO COBRA men's watch in yellow",
    tags: ['Ion-Plated Steel', '100M WR'],
  },
];

function WatchCard({ watch }: { watch: Watch }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: watch.id, name: watch.name, collection: watch.collection, price: watch.priceNumber, image: watch.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div
      className="group flex-shrink-0 w-52 sm:w-60 overflow-hidden gpu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${watch.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={watch.image}
          alt={watch.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />

        {/* Collection badge */}
        <span className="absolute top-2.5 left-2.5 text-[9px] font-sans font-semibold tracking-[0.18em] uppercase text-brand-gold bg-brand-black/75 px-2 py-1 backdrop-blur-sm">
          {watch.collection}
        </span>

        {/* Quick-view on hover */}
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center pb-3"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[9px] font-sans tracking-[0.22em] uppercase text-brand-white bg-brand-black/80 backdrop-blur-sm px-4 py-1.5">
            View Details
          </span>
        </div>
      </Link>

      <div className="pt-3 pb-1 px-0.5">
        <Link to={`/product/${watch.id}`} className="font-serif text-base text-brand-white hover:text-brand-gold transition-colors duration-200 leading-tight block">
          {watch.name}
        </Link>
        <p className="text-[10px] font-sans text-brand-muted mt-1">
          {watch.tags.join(' · ')}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-brand-gold text-base">{watch.price}</span>
            {watch.originalPrice && (
              <span className="font-serif text-brand-muted text-xs line-through">{watch.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${watch.name} to cart`}
            className="flex items-center gap-1.5 text-[10px] font-sans font-medium tracking-widest uppercase px-2.5 py-1.5 border transition-all duration-250 ease-out"
            style={{
              borderColor: added ? 'rgba(201,168,76,0.8)' : 'rgba(201,168,76,0.35)',
              backgroundColor: added ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: '#C9A84C',
              transform: added ? 'scale(0.97)' : 'scale(1)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                transform: added ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)',
              }}
            >
              {added ? <CheckCircle size={11} /> : <ShoppingBag size={11} />}
            </span>
            <span style={{ transition: 'opacity 0.15s ease' }}>
              {added ? 'Added' : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function WatchCarousel({ watches, label, viewAllHref, delay, inView }: {
  watches: Watch[];
  label: string;
  viewAllHref: string;
  delay: number;
  inView: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  }

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-2xl text-brand-white">{label}</h3>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-1.5">
            <button
              onClick={() => scroll('left')}
              aria-label={`Scroll ${label} left`}
              className="w-8 h-8 flex items-center justify-center border border-brand-gold/20 text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-200 active:scale-95"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label={`Scroll ${label} right`}
              className="w-8 h-8 flex items-center justify-center border border-brand-gold/20 text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-all duration-200 active:scale-95"
            >
              <ChevronRight size={15} />
            </button>
          </div>
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold hover:gap-2.5 transition-all duration-200"
          >
            View All <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]"
      >
        {watches.map((w) => (
          <div key={w.id} className="snap-start flex-shrink-0">
            <WatchCard watch={w} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductSpotlight() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-24 bg-brand-black"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 space-y-12">
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
            Handpicked
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-white mt-2">Featured Watches</h2>
          <div
            className="h-px bg-brand-gold mt-4 origin-left"
            style={{
              width: inView ? '40px' : '0px',
              transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s',
            }}
          />
        </div>

        <WatchCarousel watches={womenWatches} label="Women's" viewAllHref="/collections/women" delay={100} inView={inView} />
        <div className="h-px bg-brand-gold/10" />
        <WatchCarousel watches={menWatches} label="Men's" viewAllHref="/collections/men" delay={200} inView={inView} />
      </div>
    </section>
  );
}
