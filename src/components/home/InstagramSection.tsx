import { useState, useRef } from 'react';
import { Instagram, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const INSTAGRAM_URL = 'https://www.instagram.com/mulcowatches';

const posts = [
  { src: '/images/ui/Banners_mega_menu_mujer_1.jpg',                              alt: 'MULCO lifestyle',           likes: '2.4K' },
  { src: '/images/watches/cobra/yellow/cobra_yellow.jpg',                          alt: 'Cobra Yellow',              likes: '3.1K' },
  { src: '/images/ui/Banners_mega_menu_hombre_1.jpg',                              alt: 'MULCO men lifestyle',       likes: '1.8K' },
  { src: '/images/watches/blue_marine_fusion/white/blue_marine_fusion_white.jpg',  alt: 'Blue Marine Fusion',        likes: '2.9K' },
  { src: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',                alt: 'MULCO spring collection',   likes: '4.2K' },
  { src: '/images/watches/enchanted_maple/white/enchanted_maple_white.jpg',        alt: 'Enchanted Maple',           likes: '1.6K' },
];

const VISIBLE = 3; // tiles visible at once on desktop

export default function InstagramSection() {
  const { ref: headRef, inView: headInView } = useInView(0.2);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const max = posts.length - VISIBLE;

  function prev() { setCurrent((c) => Math.max(0, c - 1)); }
  function next() { setCurrent((c) => Math.min(max, c + 1)); }

  return (
    <section className="bg-brand-black border-t border-brand-gold/8 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors duration-200 mb-3"
            >
              <Instagram size={15} strokeWidth={1.5} />
              <span className="text-xs font-sans tracking-[0.25em] uppercase">@mulcowatches</span>
            </a>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-white">Follow the Story</h2>
            <div className="w-10 h-px bg-brand-gold mt-4" />
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous"
              className="w-10 h-10 border border-brand-gold/25 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={current >= max}
              aria-label="Next"
              className="w-10 h-10 border border-brand-gold/25 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:border-brand-gold disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-3 transition-transform duration-500"
            style={{
              transform: `translateX(calc(-${current} * (100% / ${VISIBLE} + 4px)))`,
            }}
          >
            {posts.map((post, i) => (
              <a
                key={i}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${post.alt} on Instagram`}
                className="relative flex-shrink-0 overflow-hidden aspect-square"
                style={{ width: `calc((100% - ${(VISIBLE - 1) * 12}px) / ${VISIBLE})` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover will-change-transform"
                  style={{
                    transform: hovered === i ? 'scale(1.07)' : 'scale(1)',
                    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{
                    background: hovered === i ? 'rgba(10,10,10,0.55)' : 'rgba(10,10,10,0)',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <Instagram
                    size={22}
                    className="text-brand-white"
                    style={{
                      opacity: hovered === i ? 1 : 0,
                      transform: hovered === i ? 'scale(1)' : 'scale(0.8)',
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                    }}
                  />
                  <span
                    className="flex items-center gap-1.5 text-[11px] font-sans text-brand-white"
                    style={{ opacity: hovered === i ? 1 : 0, transition: 'opacity 0.25s ease 0.05s' }}
                  >
                    <Heart size={11} className="fill-brand-white text-brand-white" />
                    {post.likes}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: current === i ? '20px' : '6px',
                height: '6px',
                backgroundColor: current === i ? '#C9A84C' : 'rgba(201,168,76,0.25)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-brand-gold/30 text-brand-gold text-xs font-sans font-medium tracking-[0.22em] uppercase px-8 py-3.5 hover:bg-brand-gold hover:text-brand-black transition-all duration-200"
          >
            <Instagram size={13} />
            Follow on Instagram
          </a>
        </div>

      </div>
    </section>
  );
}
