import { useState } from 'react';
import { Instagram, Heart } from 'lucide-react';
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

function PostTile({ src, alt, likes, delay, inView }: { src: string; alt: string; likes: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${alt} on Instagram`}
      className="relative overflow-hidden aspect-square block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.96)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover will-change-transform"
        style={{
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
        style={{
          background: hovered ? 'rgba(10,10,10,0.55)' : 'rgba(10,10,10,0)',
          transition: 'background 0.3s ease',
        }}
      >
        <Instagram
          size={22}
          className="text-brand-white"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}
        />
        <span
          className="flex items-center gap-1.5 text-[11px] font-sans text-brand-white"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease 0.05s' }}
        >
          <Heart size={11} className="fill-brand-white text-brand-white" />
          {likes}
        </span>
      </div>
    </a>
  );
}

export default function InstagramSection() {
  const { ref: headRef, inView: headInView } = useInView(0.2);
  const { ref: gridRef, inView: gridInView } = useInView(0.1);

  return (
    <section className="bg-brand-black py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-10"
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors duration-200 mb-4"
          >
            <Instagram size={16} strokeWidth={1.5} />
            <span className="text-xs font-sans tracking-[0.25em] uppercase">@mulcowatches</span>
          </a>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-white">Follow the Story</h2>
          <div className="w-10 h-px bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-8"
        >
          {posts.map((post, i) => (
            <PostTile key={i} {...post} delay={i * 80} inView={gridInView} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
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
