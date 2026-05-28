import { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag, CheckCircle, Minus, Plus, ArrowLeft, ZoomIn, Star, PenLine } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useInView } from '../hooks/useInView';
import { getProductById, getRelatedProducts } from '../data/products';
import { getSeedReviews, type Review } from '../data/reviews';

type Tab = 'description' | 'specifications' | 'warranty';

const STORAGE_KEY = 'mulco-reviews';

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          strokeWidth={1.5}
          className={n <= rating ? 'text-brand-gold fill-brand-gold' : 'text-brand-gold/25'}
        />
      ))}
    </span>
  );
}

function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ author: '', location: '', rating: 5, title: '', body: '' });
  const [formError, setFormError] = useState('');

  const loadReviews = useCallback(() => {
    const seed = getSeedReviews(productId);
    const stored: Review[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const userReviews = stored.filter((r) => r.productId === productId);
    setReviews([...seed, ...userReviews].sort((a, b) => b.date.localeCompare(a.date)));
  }, [productId]);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const countByRating = [5, 4, 3, 2, 1].map((n) => ({
    n,
    count: reviews.filter((r) => r.rating === n).length,
  }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.author.trim() || !form.title.trim() || !form.body.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    const newReview: Review = {
      id: `u-${Date.now()}`,
      productId,
      author: form.author.trim(),
      location: form.location.trim() || 'Verified Buyer',
      rating: form.rating,
      title: form.title.trim(),
      body: form.body.trim(),
      date: new Date().toISOString().slice(0, 10),
      verified: false,
    };
    const stored: Review[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, newReview]));
    setSubmitted(true);
    setShowForm(false);
    setForm({ author: '', location: '', rating: 5, title: '', body: '' });
    setFormError('');
    loadReviews();
  }

  return (
    <div className="mt-16 border-t border-brand-gold/12 pt-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="font-serif text-2xl text-brand-white mb-1">
            Customer Reviews
            {reviews.length > 0 && <span className="font-sans text-base text-brand-muted ml-3">({reviews.length})</span>}
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <StarRow rating={Math.round(avg)} size={16} />
              <span className="font-serif text-brand-gold text-lg">{avg.toFixed(1)}</span>
              <span className="text-xs font-sans text-brand-muted">out of 5</span>
            </div>
          )}
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setSubmitted(false); }}
            className="flex items-center gap-2 text-xs font-sans font-medium tracking-widest uppercase border border-brand-gold/30 px-5 py-2.5 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-200 self-start sm:self-auto"
          >
            <PenLine size={12} />
            Write a Review
          </button>
        )}
      </div>

      {/* Rating breakdown */}
      {reviews.length > 0 && (
        <div className="mb-10 max-w-xs space-y-2">
          {countByRating.map(({ n, count }) => (
            <div key={n} className="flex items-center gap-3">
              <span className="text-[10px] font-sans text-brand-muted w-4 text-right">{n}</span>
              <Star size={10} className="text-brand-gold fill-brand-gold flex-shrink-0" />
              <div className="flex-1 h-1 bg-brand-gold/10 overflow-hidden">
                <div
                  className="h-full bg-brand-gold transition-all duration-500"
                  style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
                />
              </div>
              <span className="text-[10px] font-sans text-brand-muted w-4">{count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Write a review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 border border-brand-gold/15 bg-brand-gold/[0.02] p-6 space-y-5">
          <p className="font-serif text-lg text-brand-white">Share your experience</p>
          {/* Star picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sans tracking-widest uppercase text-brand-muted">Your Rating *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))} aria-label={`${n} stars`}>
                  <Star
                    size={22}
                    strokeWidth={1.5}
                    className={`transition-colors duration-150 ${n <= form.rating ? 'text-brand-gold fill-brand-gold' : 'text-brand-gold/30 hover:text-brand-gold/60'}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sans tracking-widest uppercase text-brand-muted">Name *</label>
              <input
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                placeholder="Your name"
                className="bg-transparent border border-brand-gold/20 text-brand-white text-sm font-sans px-3 py-2.5 placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-sans tracking-widest uppercase text-brand-muted">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="City, State (optional)"
                className="bg-transparent border border-brand-gold/20 text-brand-white text-sm font-sans px-3 py-2.5 placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold/60 transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sans tracking-widest uppercase text-brand-muted">Review Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Sum it up in a few words"
              className="bg-transparent border border-brand-gold/20 text-brand-white text-sm font-sans px-3 py-2.5 placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold/60 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-sans tracking-widest uppercase text-brand-muted">Your Review *</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="Tell others what you think about this watch"
              rows={4}
              className="bg-transparent border border-brand-gold/20 text-brand-white text-sm font-sans px-3 py-2.5 placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold/60 transition-colors resize-none"
            />
          </div>
          {formError && <p className="text-xs font-sans text-brand-rose">{formError}</p>}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="px-7 py-2.5 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-brand-white transition-colors duration-200"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setFormError(''); }}
              className="px-5 py-2.5 text-xs font-sans text-brand-muted hover:text-brand-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div className="mb-8 flex items-center gap-2 text-sm font-sans text-brand-gold border border-brand-gold/20 px-4 py-3 bg-brand-gold/[0.04]">
          <CheckCircle size={14} strokeWidth={1.5} />
          Thank you — your review has been submitted.
        </div>
      )}

      {/* Review list */}
      {reviews.length > 0 ? (
        <div className="space-y-8">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-brand-gold/8 pb-8 last:border-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <StarRow rating={r.rating} size={12} />
                    {r.verified && (
                      <span className="text-[9px] font-sans tracking-widest uppercase text-brand-gold/70 flex items-center gap-1">
                        <CheckCircle size={9} strokeWidth={2} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-base text-brand-white mt-1">{r.title}</p>
                </div>
                <span className="text-[10px] font-sans text-brand-muted flex-shrink-0">
                  {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <p className="font-sans text-sm text-brand-muted leading-relaxed mb-2">{r.body}</p>
              <p className="text-[10px] font-sans text-brand-muted/60">{r.author} · {r.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border border-brand-gold/10 bg-brand-gold/[0.02]">
          <Star size={24} className="text-brand-gold/30 mx-auto mb-3" strokeWidth={1.5} />
          <p className="font-serif text-lg text-brand-muted mb-1">No reviews yet</p>
          <p className="text-xs font-sans text-brand-muted/60">Be the first to share your experience with this timepiece.</p>
        </div>
      )}
    </div>
  );
}

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
  const [colorGalleryIndex, setColorGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [zoomed, setZoomed] = useState(false);
  const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | null>(
    () => product?.colors?.[0] ?? null
  );

  const colorGallery = selectedColor
    ? [selectedColor.image, ...(product?.perspectiveImages ?? [])]
    : null;

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
                src={colorGallery ? colorGallery[colorGalleryIndex] : product.images[activeImage]}
                alt={selectedColor ? `${product.name} in ${selectedColor.name}` : product.name}
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
            {colorGallery ? (
              <div className="flex gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {colorGallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setColorGalleryIndex(i); setZoomed(false); }}
                    aria-label={i === 0 ? 'Main color image' : `Perspective ${i}`}
                    className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all duration-200 ${
                      colorGalleryIndex === i ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : product.images.length > 1 ? (
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
            ) : null}
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

            {/* Color picker — watches only */}
            {product.category === 'watches' && product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <p className="text-[11px] font-sans text-brand-muted tracking-widest uppercase">
                  Color: <span className="text-brand-white ml-1">{selectedColor?.name ?? product.colors[0].name}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => { setSelectedColor(c); setColorGalleryIndex(0); setZoomed(false); }}
                      title={c.name}
                      aria-label={`Select ${c.name}`}
                      className="relative w-11 h-11 overflow-hidden transition-all duration-200"
                      style={{
                        outline: selectedColor?.name === c.name ? '2px solid #C9A84C' : '2px solid transparent',
                        outlineOffset: '2px',
                        transform: selectedColor?.name === c.name ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

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
              <Link to="/find-a-retailer" className="text-[10px] font-sans text-brand-gold hover:text-brand-white transition-colors">
                Find a retailer near you →
              </Link>
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
                <div className="flex flex-wrap gap-5 mt-4">
                  <Link to="/warranty-registration" className="text-brand-gold text-xs border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                    Register your watch →
                  </Link>
                  <Link to="/faq" className="text-brand-gold text-xs border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors">
                    Warranty FAQ →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Reviews ── */}
        <ReviewsSection productId={product.id} />

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
