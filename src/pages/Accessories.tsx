import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Data ── */
interface AccessoryItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  tags: string[];
  gender?: 'men' | 'women' | 'unisex';
}

const sunglasses: AccessoryItem[] = [
  { id: 'sg-1', name: 'Medusa Shield', subtitle: 'Oversized Shield Frame', price: 129, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994', tags: ['UV400', 'Acetate Frame'], gender: 'women' },
  { id: 'sg-2', name: 'Cobra Aviator', subtitle: 'Gold-Tone Aviator', price: 119, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994', tags: ['Polarized', 'Metal Frame'], gender: 'men' },
  { id: 'sg-3', name: 'Lush Cat-Eye', subtitle: 'Modern Cat-Eye', price: 109, image: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994', tags: ['UV400', 'Acetate'], gender: 'women' },
  { id: 'sg-4', name: 'Kripton Sport', subtitle: 'Sport Wraparound', price: 139, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994', tags: ['Polarized', 'Lightweight'], gender: 'men' },
];

const jewelry: AccessoryItem[] = [
  { id: 'jw-1', name: 'Illusion Bracelet', subtitle: 'Crystal-Set Cuff', price: 89, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994', tags: ['Swarovski', 'Gold Plated'] },
  { id: 'jw-2', name: 'Blue Marine Pendant', subtitle: 'Sterling Silver Pendant', price: 79, image: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994', tags: ['925 Silver', 'MOP'] },
  { id: 'jw-3', name: 'Couture Chain', subtitle: 'IP Rose Gold Chain', price: 99, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994', tags: ['IP Rose Gold', 'Stainless'] },
  { id: 'jw-4', name: 'Cobra Ring', subtitle: 'Bold Statement Ring', price: 69, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994', tags: ['IP Black', 'Stainless'] },
];

const straps: AccessoryItem[] = [
  { id: 'st-1', name: 'Marine Silicone', subtitle: 'High-Grade Silicone Strap', price: 49, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_1.jpg?v=1764274994', tags: ['20mm', '22mm', 'Waterproof'] },
  { id: 'st-2', name: 'Couture Leather', subtitle: 'Italian Full-Grain Leather', price: 69, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994', tags: ['18mm', '20mm', 'Calfskin'] },
  { id: 'st-3', name: 'Kripton Mesh', subtitle: 'IP Black Mesh Bracelet', price: 79, image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994', tags: ['20mm', '22mm', 'IP Black'] },
  { id: 'st-4', name: 'Lush Ceramic', subtitle: 'High-Gloss Ceramic Band', price: 99, image: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994', tags: ['18mm', 'Scratch-Resistant'] },
];

const CATEGORIES = {
  sunglasses: {
    label: 'Sunglasses',
    headline: 'Shade with Purpose',
    sub: 'Precision eyewear crafted with the same aesthetic conviction as every MULCO timepiece.',
    hero: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994',
    items: sunglasses,
    hasGenderFilter: true,
  },
  jewelry: {
    label: 'Jewelry',
    headline: 'Wear Every Detail',
    sub: 'Complements designed to move with your watch. Each piece carries the same material standards as the collections.',
    hero: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994',
    items: jewelry,
    hasGenderFilter: false,
  },
  straps: {
    label: 'Straps',
    headline: 'Change the Character',
    sub: 'Interchangeable straps let one watch live many lives. Explore silicone, leather, ceramic, and steel options.',
    hero: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994',
    items: straps,
    hasGenderFilter: false,
  },
};

const ALL_CATEGORIES = [
  { slug: 'sunglasses', label: 'Sunglasses', image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994', desc: 'UV-protective eyewear' },
  { slug: 'jewelry',    label: 'Jewelry',    image: 'https://mulco.com/cdn/shop/files/Banners_Mega_menu_1_version_quartz_verde.jpg?v=1764274994', desc: 'Curated complements' },
  { slug: 'straps',     label: 'Straps',     image: 'https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994', desc: 'Interchangeable bands' },
];

function AccessoryCard({ item }: { item: AccessoryItem }) {
  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent" />
        {/* Hover reveal */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-[9px] font-sans tracking-[0.22em] uppercase text-brand-white bg-brand-black/80 px-5 py-2">
            Discover
          </span>
        </div>
        {item.gender && (
          <div className="absolute top-3 left-3">
            <span className="text-[8px] font-sans tracking-[0.2em] uppercase text-brand-white bg-brand-black/70 px-2 py-1">
              {item.gender === 'men' ? 'Men' : 'Women'}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[8px] font-sans tracking-[0.15em] uppercase text-brand-gold">{t}</span>
          ))}
        </div>
        <p className="font-serif text-base text-brand-white group-hover:text-brand-gold transition-colors duration-200 leading-tight">{item.name}</p>
        <p className="font-sans text-[11px] text-brand-muted">{item.subtitle}</p>
        <p className="font-serif text-sm text-brand-gold">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function Accessories() {
  const { category } = useParams<{ category?: string }>();
  const { t } = useLanguage();

  const cat = category ? CATEGORIES[category as keyof typeof CATEGORIES] : null;

  /* ── Landing (no category) ── */
  if (!cat) {
    return (
      <div className="min-h-screen bg-brand-black">
        {/* Hero */}
        <div
          className="relative h-[50vh] flex items-end overflow-hidden"
          style={{
            backgroundImage: 'url(https://mulco.com/cdn/shop/files/Banners_mega_menu_mujer_1.jpg?v=1764274994)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/10" />
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pb-14">
            <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-4">
              <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
              <ChevronRight size={10} className="opacity-40" />
              <span className="text-brand-white">{t('nav.accessories')}</span>
            </nav>
            <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-2">{t('accessories.title')}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-brand-white">Accessories</h1>
          </div>
        </div>

        {/* Category grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 pb-28">
          <FadeSection>
            <div className="text-center mb-14">
              <p className="font-sans text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
                Every detail tells a story. Explore eyewear, jewelry, and straps designed with the same precision and boldness as every MULCO timepiece.
              </p>
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ALL_CATEGORIES.map((c, i) => (
              <FadeSection key={c.slug} delay={i * 100}>
                <Link to={`/accessories/${c.slug}`} className="group block relative overflow-hidden aspect-[3/4]">
                  <img
                    src={c.image}
                    alt={c.label}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-1">{c.desc}</p>
                    <h2 className="font-serif text-3xl text-brand-white">{c.label}</h2>
                    <div className="flex items-center gap-1.5 mt-3 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted group-hover:text-brand-gold transition-colors duration-200">
                      {t('accessories.discover')} <ArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Category page ── */
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero */}
      <div
        className="relative h-[42vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${cat.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/10" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pb-12">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-4">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <Link to="/accessories" className="hover:text-brand-gold transition-colors">{t('nav.accessories')}</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">{cat.label}</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-2">{cat.label}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-white">{cat.headline}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14 pb-28">
        {/* Subtitle */}
        <FadeSection>
          <p className="font-sans text-sm text-brand-muted max-w-xl mb-14 leading-relaxed">{cat.sub}</p>
        </FadeSection>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {cat.items.map((item, i) => (
            <FadeSection key={item.id} delay={i * 60}>
              <AccessoryCard item={item} />
            </FadeSection>
          ))}
        </div>

        {/* Other categories */}
        <div className="mt-20 pt-14 border-t border-brand-gold/12">
          <FadeSection>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-1">Also Explore</p>
                <h2 className="font-serif text-2xl text-brand-white">More Accessories</h2>
              </div>
              <Link to="/accessories" className="hidden md:flex items-center gap-1 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                View All <ArrowRight size={10} />
              </Link>
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ALL_CATEGORIES.filter((c) => c.slug !== category).map((c, i) => (
              <FadeSection key={c.slug} delay={i * 80}>
                <Link to={`/accessories/${c.slug}`} className="group relative overflow-hidden aspect-video block">
                  <img src={c.image} alt={c.label} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-[9px] font-sans tracking-[0.22em] uppercase text-brand-gold mb-1">{c.desc}</p>
                    <p className="font-serif text-2xl text-brand-white">{c.label}</p>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
