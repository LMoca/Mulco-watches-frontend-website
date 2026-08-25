import { useInView } from '../../hooks/useInView';

const INSTAGRAM_URL = 'https://www.instagram.com/mulcowatches';

const posts = [
  { src: '/images/ui/Banners_mega_menu_mujer_1.jpg',                              alt: 'MULCO lifestyle' },
  { src: '/images/watches/cobra/yellow/cobra_yellow.jpg',                          alt: 'Cobra Yellow' },
  { src: '/images/ui/Banners_mega_menu_hombre_1.jpg',                              alt: 'MULCO men lifestyle' },
  { src: '/images/watches/blue_marine_fusion/white/blue_marine_fusion_white.jpg',  alt: 'Blue Marine Fusion' },
  { src: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',                alt: 'MULCO spring collection' },
  { src: '/images/watches/enchanted_maple/white/enchanted_maple_white.jpg',        alt: 'Enchanted Maple' },
];

export default function InstagramSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-brand-black border-t border-brand-gold/8 py-24 md:py-32 lg:py-40 px-6 md:px-14 lg:px-24"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Thin 6-image horizontal row */}
        <div className="grid grid-cols-6 gap-1 md:gap-2 mb-6">
          {posts.map((post, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${post.alt} on Instagram`}
              className="relative overflow-hidden aspect-square block group"
            >
              <img
                src={post.src}
                alt={post.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover will-change-transform"
                style={{
                  transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
              />
            </a>
          ))}
        </div>

        {/* Handle + follow link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">
            @mulcowatches
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans text-[12px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms] self-start"
          >
            <span className="relative">
              Follow us on Instagram
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
