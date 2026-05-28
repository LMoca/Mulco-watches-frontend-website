import { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ShoppingBag, CheckCircle, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useInView } from '../hooks/useInView';
import { products, type Product } from '../data/products';

const heroBanners: Record<string, string> = {
  women: '/images/ui/Banners_mega_menu_mujer_1.jpg',
  men: '/images/ui/Banners_mega_menu_hombre_1.jpg',
  'new-arrivals': '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg',
  all: '/images/ui/Banners_mega_menu_hombre_2.jpg',
};

const collectionDescriptions: Record<string, string> = {
  women: 'Timepieces that move with you — from the boardroom to the sunset terrace.',
  men: 'Precision-engineered watches for those who define their own standard.',
  'new-arrivals': 'The latest additions to the MULCO universe. Be first to wear the future.',
  all: 'The complete MULCO catalog — every collection, every story.',
};

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
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
      className="group overflow-hidden gpu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 1,
        animation: `fade-in-up 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 60}ms both`,
      }}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
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
        <div
          className="absolute inset-0 transition-all duration-400"
          style={{ background: hovered ? 'rgba(10,10,10,0.18)' : 'rgba(10,10,10,0)' }}
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-1 animate-fade-in">
            New
          </span>
        )}
        {!product.isNew && product.originalPrice && (
          <span className="absolute top-3 left-3 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-rose text-brand-white px-2 py-1 animate-fade-in">
            Sale
          </span>
        )}
        {/* Slide-up CTA */}
        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="block text-center text-[10px] font-sans font-semibold tracking-widest uppercase bg-brand-black/85 backdrop-blur-sm text-brand-white py-2.5">
            View Details
          </span>
        </div>
      </Link>

      <div
        className="p-4 transition-colors duration-300"
        style={{ background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)' }}
      >
        <p className="text-[10px] font-sans text-brand-gold tracking-widest uppercase">{product.collection}</p>
        <Link to={`/product/${product.id}`} className="font-serif text-lg text-brand-white hover:text-brand-gold transition-colors duration-200 leading-tight mt-0.5 block">
          {product.name}
        </Link>
        <p className="text-[10px] font-sans text-brand-muted mt-1.5">{product.tags.join(' · ')}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-brand-gold text-lg">${product.price}</span>
            {product.originalPrice && (
              <span className="font-serif text-brand-muted text-sm line-through">${product.originalPrice}</span>
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

function CollectionsHero({ slug }: { slug: string }) {
  const { ref, inView } = useInView(0.1);
  const banner = heroBanners[slug] ?? heroBanners.all;
  const title = slug === 'women' ? "Women's" : slug === 'men' ? "Men's" : slug === 'new-arrivals' ? 'New Arrivals' : 'All Collections';
  const desc = collectionDescriptions[slug] ?? collectionDescriptions.all;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative h-64 md:h-80 overflow-hidden">
      <img src={banner} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/40 to-transparent" />
      <div
        className="absolute inset-0 flex flex-col justify-end p-8 md:p-14"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <h1 className="font-serif text-4xl md:text-5xl text-brand-white">{title}</h1>
        <p className="text-brand-muted text-sm font-sans mt-2 max-w-md">{desc}</p>
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
  const [sort, setSort] = useState<SortKey>('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setGenderFilter(resolvedSlug === 'women' ? 'women' : resolvedSlug === 'men' ? 'men' : 'all');
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

    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'newest': return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [resolvedSlug, genderFilter, sort]);

  const pageTitle = resolvedSlug === 'women' ? "Women's" : resolvedSlug === 'men' ? "Men's" : resolvedSlug === 'new-arrivals' ? 'New Arrivals' : 'All Collections';

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">
      <CollectionsHero slug={resolvedSlug} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 pb-24">
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

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-brand-gold/12">
          {resolvedSlug === 'all' && (
            <div className="flex gap-1 bg-brand-gold/[0.04] border border-brand-gold/15 p-1">
              {(['all', 'women', 'men'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g)}
                  className={`px-4 py-1.5 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-200 ${
                    genderFilter === g ? 'bg-brand-gold text-brand-black' : 'text-brand-muted hover:text-brand-white'
                  }`}
                >
                  {g === 'all' ? t('filter.all') : g === 'women' ? t('nav.women') : t('nav.men')}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-brand-muted font-sans">{filtered.length} pieces</span>
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-brand-white border border-brand-gold/20 px-4 py-2 hover:border-brand-gold transition-colors duration-200"
              >
                <SlidersHorizontal size={12} />
                {t('filter.sortBy')}
              </button>
              {filterOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-brand-black border border-brand-gold/20 min-w-[190px] py-1">
                    {([
                      ['featured', t('filter.featured')],
                      ['price-asc', t('filter.priceLowHigh')],
                      ['price-desc', t('filter.priceHighLow')],
                      ['newest', t('filter.newest')],
                    ] as [SortKey, string][]).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => { setSort(key); setFilterOpen(false); }}
                        className={`block w-full text-left px-4 py-2.5 text-xs font-sans tracking-wide transition-colors duration-150 ${
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
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
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
    </div>
  );
}
