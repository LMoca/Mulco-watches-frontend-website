import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, X, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAccount } from '../context/AccountContext';
import { useInView } from '../hooks/useInView';
import { products, type Product } from '../data/products';
import QuickViewModal from '../components/QuickViewModal';
import Eyebrow from '../components/Eyebrow';

const heroBanners: Record<string, string> = {
  women: '/images/ui/Banners_mega_menu_mujer_1.jpg',
  men: '/images/ui/Banners_mega_menu_hombre_1.jpg',
  'new-arrivals': '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',
  all: '/images/ui/Banners_mega_menu_hombre_2.jpg',
};

const heroEyebrows: Record<string, string> = {
  women: 'FOR HER',
  men: 'FOR HIM',
  'new-arrivals': 'JUST ARRIVED',
  all: 'THE COLLECTION',
};

const collectionDescriptions: Record<string, string> = {
  women: 'Timepieces that move with you — from the boardroom to the sunset terrace.',
  men: 'Precision-engineered watches for those who define their own standard.',
  'new-arrivals': 'The latest additions to the MULCO universe. Be first to wear the future.',
  all: 'The complete MULCO catalog — every collection, every story.',
};

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const WATCH_COLLECTIONS = [
  'Blue Marine', 'Breathe', 'Buzo', 'Cobra', 'Dreamcatcher',
  'Enchanted', 'Era', 'Evol', 'Freedom', 'Frost',
  'Kripton', 'La Fleur', 'Lady D', 'M10', 'Pride', 'Titans',
];

function ProductCard({ product, index, onQuickView }: { product: Product; index: number; onQuickView: (p: Product) => void }) {
  const { formatPrice } = useCurrency();
  const { isWishlisted, toggleWishlist } = useAccount();
  const [hovered, setHovered] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="overflow-hidden gpu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animation: `fade-in-up 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms both`,
      }}
    >
      {/* Image — 4:5 aspect, full clickable area */}
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-[4/5]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        {/* Badges — text only, top-left */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.isNew && (
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-gold">NEW</span>
          )}
          {product.stock !== undefined && product.stock <= 5 && (
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-rose/70">LIMITED</span>
          )}
        </div>

        {/* Wishlist heart — top-right */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-brand-black/50 backdrop-blur-sm hover:bg-brand-black/70 transition-colors duration-200"
          style={{ opacity: hovered || wishlisted ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
          <Heart
            size={14}
            className="transition-colors duration-200"
            style={{ color: wishlisted ? '#C9A84C' : '#F5F5F0' }}
            fill={wishlisted ? '#C9A84C' : 'none'}
          />
        </button>
      </Link>

      {/* Info below image */}
      <div className="pt-4">
        {/* Product name with animated gold underline on hover */}
        <Link to={`/product/${product.id}`} className="relative inline-block">
          <h3 className="font-serif text-[1.375rem] text-brand-white leading-tight">
            {product.name}
          </h3>
          <span
            className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left"
            style={{
              transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </Link>

        {/* Collection · price — single muted line */}
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted mt-2">
          {product.collection}
          {' · '}
          <span style={product.originalPrice ? { textDecoration: 'underline', textDecorationColor: '#C9A84C', textUnderlineOffset: '3px' } : undefined}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="ml-2 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </p>

        {/* Quick View — quiet, appears on hover only */}
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
          className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          Quick View
        </button>
      </div>
    </div>
  );
}

function CollectionsHero({ slug }: { slug: string }) {
  const { ref, inView } = useInView(0.1);
  const banner = heroBanners[slug] ?? heroBanners.all;
  const title = slug === 'women' ? "Women's" : slug === 'men' ? "Men's" : slug === 'new-arrivals' ? 'New Arrivals' : 'All Collections';
  const desc = collectionDescriptions[slug] ?? collectionDescriptions.all;
  const eyebrow = heroEyebrows[slug] ?? 'THE COLLECTION';

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-[60vh] overflow-hidden">
      <img src={banner} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/40 to-transparent" />
      <div
        className="absolute inset-0 flex flex-col justify-end px-6 md:px-14 lg:px-24 pb-12 md:pb-16"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Eyebrow text={eyebrow} className="mb-4" />
        <h1 className="font-serif text-[4rem] md:text-[5rem] lg:text-[6rem] text-brand-white leading-[0.95] tracking-[-0.02em]">{title}</h1>
        <p className="font-sans text-brand-muted text-[14px] leading-[1.7] mt-4 max-w-[60ch]">{desc}</p>
      </div>
    </div>
  );
}

export default function Collections() {
  const { slug } = useParams<{ slug?: string }>();
  const { t } = useLanguage();
  const resolvedSlug = slug ?? 'all';

  const [genderFilter, setGenderFilter] = useState<'all' | 'women' | 'men'>(
    resolvedSlug === 'women' ? 'women' : resolvedSlug === 'men' ? 'men' : 'all'
  );
  const [collectionFilter, setCollectionFilter] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setGenderFilter(resolvedSlug === 'women' ? 'women' : resolvedSlug === 'men' ? 'men' : 'all');
    setCollectionFilter('all');
    setSort('featured');
  }, [resolvedSlug]);

  const filtered = useMemo(() => {
    const watches = products.filter((p) => p.category === 'watches');
    const activeGender = resolvedSlug === 'women' ? 'women' : resolvedSlug === 'men' ? 'men' : genderFilter;
    let list = resolvedSlug === 'new-arrivals'
      ? watches.filter((p) => p.isNew)
      : activeGender === 'all'
      ? watches
      : watches.filter((p) => p.gender === activeGender || p.gender === 'unisex');

    if (collectionFilter !== 'all') {
      list = list.filter((p) => p.collection === collectionFilter);
    }

    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'newest': return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [resolvedSlug, genderFilter, collectionFilter, sort]);

  const pageTitle = resolvedSlug === 'women' ? "Women's" : resolvedSlug === 'men' ? "Men's" : resolvedSlug === 'new-arrivals' ? 'New Arrivals' : 'All Collections';

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      <CollectionsHero slug={resolvedSlug} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-10 pb-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-sans text-brand-muted mb-8">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={11} />
          {slug ? (
            <>
              <Link to="/collections" className="hover:text-brand-gold transition-colors">{t('nav.collections')}</Link>
              <ChevronRight size={11} />
              <span className="text-brand-white">{pageTitle}</span>
            </>
          ) : (
            <span className="text-brand-white">{t('nav.collections')}</span>
          )}
        </nav>

        {/* Sticky filter strip */}
        <div className="sticky top-[72px] z-10 bg-brand-black -mx-6 md:-mx-14 lg:-mx-24 px-6 md:px-14 lg:px-24 py-4 border-b border-brand-gold/8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Gender filter pills */}
            {resolvedSlug === 'all' && (
              <div className="flex gap-2">
                {(['all', 'women', 'men'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className={`px-4 py-1.5 text-[10px] font-sans tracking-[0.18em] uppercase transition-all duration-200 border ${
                      genderFilter === g
                        ? 'bg-brand-gold text-brand-black border-brand-gold'
                        : 'text-brand-gold/60 border-brand-gold/30 hover:border-brand-gold/60 hover:text-brand-gold'
                    }`}
                  >
                    {g === 'all' ? t('filter.all') : g === 'women' ? t('nav.women') : t('nav.men')}
                  </button>
                ))}
              </div>
            )}

            {/* Count + sort */}
            <div className="flex items-center gap-5 ml-auto">
              <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-brand-muted">{filtered.length} pieces</span>
              <div className="relative">
                {/* Text-only sort trigger with ↓ character */}
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-1 text-[11px] font-sans tracking-[0.2em] uppercase text-brand-muted hover:text-brand-gold transition-colors duration-300"
                >
                  {t('filter.sortBy')} <span aria-hidden="true">↓</span>
                </button>
                {filterOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-20 bg-brand-black border border-brand-gold/15 min-w-[200px] py-1">
                      {([
                        ['featured', t('filter.featured')],
                        ['price-asc', t('filter.priceLowHigh')],
                        ['price-desc', t('filter.priceHighLow')],
                        ['newest', t('filter.newest')],
                      ] as [SortKey, string][]).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => { setSort(key); setFilterOpen(false); }}
                          className={`block w-full text-left px-5 py-2.5 text-[11px] font-sans tracking-[0.1em] uppercase transition-colors duration-150 ${
                            sort === key ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-white'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {sort !== 'featured' && (
                <button onClick={() => setSort('featured')} aria-label="Clear sort" className="text-brand-muted hover:text-brand-gold transition-colors">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Collection name filter pills */}
          {resolvedSlug !== 'new-arrivals' && (
            <div className="mt-3 -mx-1">
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {['all', ...WATCH_COLLECTIONS].map((col) => (
                  <button
                    key={col}
                    onClick={() => setCollectionFilter(col)}
                    className={`flex-shrink-0 px-3.5 py-1 text-[10px] font-sans tracking-[0.18em] uppercase transition-all duration-200 border ${
                      collectionFilter === col
                        ? 'bg-brand-gold text-brand-black border-brand-gold'
                        : 'text-brand-gold/60 border-brand-gold/30 hover:border-brand-gold/60 hover:text-brand-gold'
                    }`}
                  >
                    {col === 'all' ? 'All' : col}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-brand-muted">No pieces found.</p>
            <Link to="/collections" className="mt-6 inline-block text-sm text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-200">
              Browse all collections
            </Link>
          </div>
        )}
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
