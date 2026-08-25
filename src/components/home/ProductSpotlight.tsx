import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import Eyebrow from '../Eyebrow';

interface FeaturedProduct {
  id: string;
  name: string;
  collection: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: 'blue-marine-medusa',
    name: 'Blue Marine Medusa',
    collection: 'Blue Marine',
    price: 196,
    description: 'A multifunctional ocean instrument, refined into everyday elegance.',
    image: '/images/watches/blue_marine_medusa/beige/blue_marine_medusa_beige.jpg',
    imageAlt: 'MULCO Blue Marine Medusa watch in beige',
  },
  {
    id: 'buzo-tentacles',
    name: 'Buzo Tentacles',
    collection: 'Buzo',
    price: 215,
    description: 'Deep-sea engineering translated into a bold, unmistakable urban presence.',
    image: '/images/watches/buzo_tentacles/black/buzo_tentacles_black.jpg',
    imageAlt: 'MULCO Buzo Tentacles watch in black',
  },
  {
    id: 'enchanted-quartz',
    name: 'Enchanted Quartz',
    collection: 'Enchanted',
    price: 196,
    description: 'Mother-of-pearl femininity, powered by Swiss quartz precision.',
    image: '/images/watches/enchanted_quartz/green/enchanted_quartz_green.jpg',
    imageAlt: 'MULCO Enchanted Quartz watch in green',
  },
  {
    id: 'kripton-royale-gents',
    name: 'Kripton Royale Gents',
    collection: 'Kripton',
    price: 215,
    description: 'Architectural boldness, worn with quiet authority.',
    image: '/images/watches/kripton_royale_gents/black/kripton_royale_gents_black.jpg',
    imageAlt: 'MULCO Kripton Royale Gents watch in black',
  },
];

const TRANSITION = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';

export default function ProductSpotlight() {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [added, setAdded] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const autoplayRef = useRef<ReturnType<typeof setInterval>>();

  const total = featuredProducts.length;
  const AUTOPLAY_INTERVAL = 5000;

  function go(next: number) {
    if (animating || next === active) return;
    setDirection(next > active || (active === total - 1 && next === 0) ? 1 : -1);
    setPrev(active);
    setActive(next);
    setAnimating(true);
    setAdded(false);
  }

  function goNext() { go((active + 1) % total); }
  function goPrev() { go((active - 1 + total) % total); }

  useEffect(() => {
    if (!animating) return;
    timerRef.current = setTimeout(() => { setPrev(null); setAnimating(false); }, 650);
    return () => clearTimeout(timerRef.current);
  }, [animating]);

  useEffect(() => {
    if (paused) { clearInterval(autoplayRef.current); return; }
    autoplayRef.current = setInterval(() => {
      setAdded(false);
      setDirection(1);
      setPrev(prev => prev);
      setActive(a => {
        const next = (a + 1) % total;
        setPrev(a);
        setAnimating(true);
        return next;
      });
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(autoplayRef.current);
  }, [paused, total]);

  function handleAdd() {
    const p = featuredProducts[active];
    addItem({ id: p.id, name: p.name, collection: p.collection, price: p.price, image: p.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  }

  const product = featuredProducts[active];

  return (
    <section className="bg-brand-black overflow-hidden">

      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 pt-24 pb-12 flex items-end justify-between">
        <div>
          <Eyebrow text="Handpicked" />
          <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] text-brand-white mt-3 leading-[0.95] tracking-[-0.02em]">
            Featured Watches
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="flex items-center gap-3 flex-shrink-0 pb-2">
          <button
            onClick={goPrev}
            aria-label="Previous watch"
            className="w-11 h-11 border border-brand-gold/30 flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-colors duration-[400ms]"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next watch"
            className="w-11 h-11 border border-brand-gold/30 flex items-center justify-center text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-colors duration-[400ms]"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Carousel stage */}
      <div className="relative h-[75vh] min-h-[520px] max-h-[820px]">

        {/* Slides */}
        {featuredProducts.map((p, i) => {
          const isActive = i === active;
          const isPrev = i === prev;
          if (!isActive && !isPrev) return null;

          const entering = isActive;
          const exitOffset = direction === 1 ? '-6%' : '6%';
          const enterOffset = direction === 1 ? '6%' : '-6%';

          return (
            <div
              key={p.id}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[55%_45%]"
              style={{
                opacity: entering ? (animating ? 1 : 1) : 0,
                transform: `translateX(${entering ? (animating ? '0%' : '0%') : exitOffset})`,
                transition: TRANSITION,
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 2 : 1,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="w-full h-full object-cover"
                  style={{
                    transform: isActive && !animating ? 'scale(1)' : 'scale(1.03)',
                    transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-black/20" />
              </div>

              {/* Text — only animate for active */}
              <div
                className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12 lg:py-0 bg-brand-black"
                style={{
                  opacity: isActive ? (animating ? 0 : 1) : 0,
                  transform: isActive ? (animating ? `translateX(${enterOffset})` : 'translateX(0)') : 'translateX(0)',
                  transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s',
                }}
              >
                <Eyebrow text={p.collection} rule className="mb-5" />
                <h3 className="font-serif text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] text-brand-white leading-[0.95] tracking-[-0.02em] mb-5">
                  {p.name}
                </h3>
                <p className="font-sans text-[15px] text-brand-muted leading-[1.7] mb-6 max-w-xs">
                  {p.description}
                </p>
                <p className="font-sans text-base text-brand-white mb-8">{formatPrice(p.price)}</p>

                <Link
                  to={`/product/${p.id}`}
                  className="group relative inline-flex items-center gap-2 text-[13px] font-sans uppercase tracking-[0.15em] text-brand-white hover:text-brand-gold transition-colors duration-[400ms] mb-5 self-start"
                >
                  <span className="relative">
                    Discover
                    <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
                  </span>
                  <span className="text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300">→</span>
                </Link>

                <button
                  onClick={handleAdd}
                  className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.15em] border border-brand-gold/40 text-brand-gold/80 px-5 py-2.5 hover:border-brand-gold hover:text-brand-gold self-start transition-all duration-[400ms]"
                >
                  {added ? <CheckCircle size={12} strokeWidth={1.5} /> : <ShoppingBag size={12} strokeWidth={1.5} />}
                  {added ? 'Added to Collection' : 'Add to Collection'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators + counter */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {featuredProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-[400ms]"
              style={{
                width: i === active ? '28px' : '6px',
                height: '2px',
                backgroundColor: i === active ? 'rgb(var(--brand-gold))' : 'rgb(var(--brand-muted) / 0.4)',
              }}
            />
          ))}
        </div>
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>

    </section>
  );
}
