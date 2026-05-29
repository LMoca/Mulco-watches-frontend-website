import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useInView } from '../hooks/useInView';
import { getProductsByCategory, type Product } from '../data/products';
import QuickViewModal from '../components/QuickViewModal';

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

const CATEGORIES = {
  jewelry: {
    label: 'Jewelry',
    headline: 'Wear Every Detail',
    sub: 'Complements designed to move with your watch. Each piece carries the same material standards as the collections.',
    hero: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',
  },
  straps: {
    label: 'Straps',
    headline: 'Change the Character',
    sub: 'Interchangeable straps let one watch live many lives. Explore silicone, leather, ceramic, and steel options.',
    hero: '/images/ui/Banners_mega_menu_hombre_2.jpg',
  },
};

const ALL_CATEGORIES = [
  { slug: 'jewelry', label: 'Jewelry', image: '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg', desc: 'Curated complements' },
  { slug: 'straps',  label: 'Straps',  image: '/images/ui/Banners_mega_menu_hombre_2.jpg', desc: 'Interchangeable bands' },
];

function ProductCard({ product, index, onQuickView }: { product: Product; index: number; onQuickView: (p: Product) => void }) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, collection: product.collection, price: product.price, image: product.images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div
      className="group flex flex-col gpu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 1,
        animation: `fade-in-up 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms both`,
      }}
    >
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square block">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-1">
            New
          </span>
        )}
        {product.stock !== undefined && product.stock <= 5 && (
          <span className="absolute bottom-14 left-3 text-[9px] font-sans font-semibold tracking-[0.18em] uppercase bg-brand-black/80 text-brand-gold border border-brand-gold/40 px-2 py-1">
            Only {product.stock} left
          </span>
        )}
        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.preventDefault(); onQuickView(product); }}
              className="flex-1 text-center text-[10px] font-sans font-semibold tracking-widest uppercase bg-brand-black/85 backdrop-blur-sm text-brand-white py-2.5 hover:bg-brand-gold hover:text-brand-black transition-colors duration-200"
            >
              Quick View
            </button>
            <Link
              to={`/product/${product.id}`}
              className="px-3 py-2.5 bg-brand-black/85 backdrop-blur-sm text-brand-muted hover:text-brand-gold transition-colors duration-200 flex items-center"
              onClick={(e) => e.stopPropagation()}
              aria-label="View details"
            >
              <span className="text-[10px] font-sans tracking-widest uppercase">→</span>
            </Link>
          </div>
        </div>
      </Link>

      <div
        className="p-4 flex-1 flex flex-col transition-colors duration-300"
        style={{ background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)' }}
      >
        <p className="text-[10px] font-sans text-brand-gold tracking-widest uppercase">{product.collection}</p>
        <Link to={`/product/${product.id}`} className="font-serif text-base text-brand-white hover:text-brand-gold transition-colors duration-200 leading-tight mt-0.5 block">
          {product.name}
        </Link>
        <p className="text-[10px] font-sans text-brand-muted mt-1.5 flex-1">{product.tags.join(' · ')}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-brand-gold text-lg">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="font-serif text-brand-muted text-sm line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 text-[10px] font-sans font-medium tracking-widest uppercase px-3 py-2 border transition-all duration-200 ease-out active:scale-95"
            style={{
              borderColor: added ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.4)',
              backgroundColor: added ? 'rgba(201,168,76,0.12)' : 'transparent',
              color: '#C9A84C',
            }}
          >
            {added ? <CheckCircle size={11} /> : <ShoppingBag size={11} />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Accessories() {
  const { category } = useParams<{ category?: string }>();
  const { t } = useLanguage();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const cat = category ? CATEGORIES[category as keyof typeof CATEGORIES] : null;
  const catProducts = cat ? getProductsByCategory(category as 'jewelry' | 'straps') : [];

  /* ── Landing (no category) ── */
  if (!cat) {
    return (
      <div className="min-h-screen bg-brand-black">
        {/* Hero */}
        <div
          className="relative h-[50vh] flex items-end overflow-hidden"
          style={{
            backgroundImage: 'url(/images/ui/Banners_mega_menu_mujer_1.jpg',
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
                Every detail tells a story. Explore jewelry and straps designed with the same precision and boldness as every MULCO timepiece.
              </p>
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {catProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>

        {/* Other category */}
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

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
