import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag, CheckCircle, Minus, Plus, ArrowLeft, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useInView } from '../hooks/useInView';
import { getProductById, getRelatedProducts } from '../data/products';

type Tab = 'description' | 'specifications' | 'warranty';

/* ── Related product mini-card ── */
function RelatedCard({ id, name, collection, price, image }: { id: string; name: string; collection: string; price: number; image: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/product/${id}`}
      className="group flex-shrink-0 w-48 sm:w-56 block overflow-hidden gpu"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover will-change-transform"
          style={{
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
      </div>
      <div className="p-3 transition-colors duration-300" style={{ background: hovered ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.01)' }}>
        <p className="text-[9px] font-sans text-brand-gold tracking-widest uppercase">{collection}</p>
        <p className="font-serif text-sm text-brand-white group-hover:text-brand-gold transition-colors duration-200 leading-tight mt-0.5">{name}</p>
        <p className="font-serif text-brand-gold text-sm mt-1">${price}</p>
      </div>
    </Link>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { ref, inView } = useInView(0.05);

  const product = id ? getProductById(id) : undefined;
  const related = id ? getRelatedProducts(id) : [];

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-black pt-28 flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-3xl text-brand-white">Watch not found.</p>
        <button onClick={() => navigate('/collections')} className="text-sm text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
          Browse Collections
        </button>
      </div>
    );
  }

  function handleAdd() {
    addItem({ id: product!.id, name: product!.name, collection: product!.collection, price: product!.price, image: product!.images[0], quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'description', label: t('product.description') },
    { key: 'specifications', label: t('product.specifications') },
    { key: 'warranty', label: t('product.warranty') },
  ];

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-sans text-brand-muted mb-8 flex-wrap">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link to="/collections" className="hover:text-brand-gold transition-colors">{t('nav.collections')}</Link>
          <ChevronRight size={11} />
          <Link to={`/collections/${product.gender}`} className="hover:text-brand-gold transition-colors capitalize">{product.gender === 'women' ? "Women's" : "Men's"}</Link>
          <ChevronRight size={11} />
          <span className="text-brand-white">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* ── Image Gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div
              className="relative overflow-hidden aspect-square bg-brand-gold/[0.03] cursor-zoom-in"
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className={`w-full h-full object-cover will-change-transform transition-transform duration-500 ease-out ${zoomed ? 'scale-150' : 'scale-100'}`}
              />
              {!zoomed && (
                <div className="absolute bottom-3 right-3 bg-brand-black/60 backdrop-blur-sm p-1.5 text-brand-muted">
                  <ZoomIn size={14} />
                </div>
              )}
              {product.isNew && (
                <span className="absolute top-4 left-4 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-1">
                  New
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImage(i); setZoomed(false); }}
                    aria-label={`View image ${i + 1}`}
                    className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col gap-6">
            {/* Collection badge */}
            <p className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
              {product.collection}
            </p>

            {/* Name */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-white leading-tight">{product.name}</h1>
              <div className="w-8 h-px bg-brand-gold mt-4" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-sans text-brand-muted tracking-wider border border-brand-gold/15 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <p className="font-serif text-4xl text-brand-gold">${product.price}</p>
              {product.originalPrice && (
                <span className="font-serif text-2xl text-brand-muted line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-rose text-brand-white px-2 py-1">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-sans text-brand-muted tracking-widest uppercase">Qty</span>
              <div className="flex items-center border border-brand-gold/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:bg-brand-gold/5 transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-10 text-center text-sm font-sans text-brand-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:bg-brand-gold/5 transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            {/* Add to cart CTA */}
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-3 w-full py-4 text-sm font-sans font-semibold tracking-widest uppercase transition-all duration-300 ease-out active:scale-[0.98]"
              style={{
                backgroundColor: added ? '#F5F5F0' : '#C9A84C',
                color: '#0A0A0A',
                transform: added ? 'scale(0.99)' : 'scale(1)',
              }}
            >
              <span style={{ transition: 'transform 0.2s ease', transform: added ? 'rotate(360deg) scale(1.15)' : 'rotate(0) scale(1)', display: 'inline-flex' }}>
                {added ? <CheckCircle size={16} /> : <ShoppingBag size={16} />}
              </span>
              {added ? 'Added to Collection' : t('product.addToCollection')}
            </button>

            {/* Trust notes */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-brand-gold/12">
              <span className="text-[10px] font-sans text-brand-muted">Free shipping (PR & USA)</span>
              <span className="text-[10px] font-sans text-brand-muted">2-Year International Warranty</span>
              <span className="text-[10px] font-sans text-brand-muted">Easy 30-day returns</span>
            </div>
          </div>
        </div>

        {/* ── Tabbed Details ── */}
        <div className="mt-16 border-t border-brand-gold/12">
          {/* Tab headers */}
          <div className="flex border-b border-brand-gold/12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-brand-gold text-brand-gold'
                    : 'border-transparent text-brand-muted hover:text-brand-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-8 max-w-2xl">
            {activeTab === 'description' && (
              <p className="font-sans text-brand-muted text-sm leading-relaxed">{product.description}</p>
            )}

            {activeTab === 'specifications' && (
              <dl className="space-y-0 divide-y divide-brand-gold/8">
                {(product.category === 'watches'
                  ? [
                      [t('spotlight.movement'), product.specs.movement],
                      [t('spotlight.waterResistance'), product.specs.waterResistance],
                      ['Case Diameter', product.specs.caseDiameter],
                      [t('spotlight.caseMaterial'), product.specs.caseMaterial],
                      ['Band Type', product.specs.bandType],
                      ['Crystal Type', product.specs.crystalType],
                    ]
                  : [
                      ['Material', product.specs.material],
                      ['Finish', product.specs.finish],
                      ['Dimensions', product.specs.dimensions],
                      ['Closure', product.specs.closure],
                    ]
                ).filter(([, value]) => value != null).map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3.5">
                    <dt className="text-xs font-sans text-brand-muted uppercase tracking-wider">{label}</dt>
                    <dd className="text-xs font-sans text-brand-white text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-4 text-sm font-sans text-brand-muted leading-relaxed">
                <p>All MULCO timepieces are covered by a <span className="text-brand-white">2-year international limited warranty</span> from the date of purchase.</p>
                <p>The warranty covers manufacturing defects in materials and workmanship under normal use. It does not cover damage resulting from accidents, misuse, unauthorized modification, water damage beyond the rated resistance, or normal wear and tear.</p>
                <p>To initiate a warranty claim, contact our support team at <span className="text-brand-gold">support@mulco.com</span> with proof of purchase.</p>
                <Link to="/faq" className="inline-block mt-2 text-brand-gold text-xs border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                  Read full warranty FAQ →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-brand-gold/12 pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-brand-white">{t('product.related')}</h2>
              <Link to="/collections" className="text-xs font-sans tracking-widest uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors flex items-center gap-1.5">
                View All <ArrowLeft size={11} className="rotate-180" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]">
              {related.map((p) => (
                <RelatedCard key={p.id} id={p.id} name={p.name} collection={p.collection} price={p.price} image={p.images[0]} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
