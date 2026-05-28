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
  image: string;
  imageAlt: string;
  tags: string[];
}

const womenWatches: Watch[] = [
  {
    id: 'blue-marine-medusa',
    name: 'Blue Marine Medusa',
    collection: 'Blue Marine',
    price: '$249',
    priceNumber: 249,
    image: 'https://mulco.com/cdn/shop/files/MedusaBlack_Silver-2_1_1_640x640_crop_center.jpg?v=1774547283',
    imageAlt: 'MULCO Blue Marine Medusa ladies watch in black and gold',
    tags: ['Mother of Pearl', 'Swarovski'],
  },
  {
    id: 'enchanted-quartz',
    name: 'Enchanted Quartz',
    collection: 'Enchanted',
    price: '$279',
    priceNumber: 279,
    image: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
    imageAlt: 'MULCO Enchanted Quartz ladies watch in green',
    tags: ['Mother of Pearl', 'Swiss Quartz'],
  },
  {
    id: 'lush-flora',
    name: 'Lush Flora',
    collection: 'Lush',
    price: '$259',
    priceNumber: 259,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
    imageAlt: 'MULCO Lush Flora ladies watch',
    tags: ['Floral Dial', 'Swarovski'],
  },
  {
    id: 'couture-rose',
    name: 'Couture Rose',
    collection: 'Couture',
    price: '$319',
    priceNumber: 319,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
    imageAlt: 'MULCO Couture Rose ladies watch',
    tags: ['Rose Gold', 'Ceramic Band'],
  },
  {
    id: 'illusion-lady',
    name: 'Illusion Lady',
    collection: 'Illusion Lady',
    price: '$289',
    priceNumber: 289,
    image: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
    imageAlt: 'MULCO Illusion Lady watch',
    tags: ['Crystal Indices', 'Swiss Quartz'],
  },
];

const menWatches: Watch[] = [
  {
    id: 'buzo-tentacles',
    name: 'Buzo Tentacles',
    collection: 'Buzo',
    price: '$329',
    priceNumber: 329,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
    imageAlt: "MULCO Buzo Tentacles men's diver watch",
    tags: ['Swiss Automatic', '200M WR'],
  },
  {
    id: 'kripton-royale',
    name: 'Kripton Royale',
    collection: 'Kripton',
    price: '$399',
    priceNumber: 399,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
    imageAlt: "MULCO Kripton Royale men's chronograph watch",
    tags: ['Chronograph', 'Ion-Plated'],
  },
  {
    id: 'evol-racer',
    name: 'Evol Racer',
    collection: 'Evol',
    price: '$349',
    priceNumber: 349,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
    imageAlt: "MULCO Evol Racer men's sport watch",
    tags: ['Tachymeter', 'Swiss Quartz'],
  },
  {
    id: 'cobra-noir',
    name: 'Cobra Noir',
    collection: 'Cobra',
    price: '$379',
    priceNumber: 379,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
    imageAlt: "MULCO Cobra Noir men's bold watch",
    tags: ['Matte Dial', 'Bold Case'],
  },
  {
    id: 'kripton-steel',
    name: 'Kripton Steel',
    collection: 'Kripton',
    price: '$359',
    priceNumber: 359,
    image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994',
    imageAlt: "MULCO Kripton Steel men's watch",
    tags: ['Stainless Steel', 'Date Display'],
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
          <span className="font-serif text-brand-gold text-base">{watch.price}</span>
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
