import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronRight, Lock, Shield, RotateCcw, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getRelatedProducts } from '../data/products';

export default function Cart() {
  const { t } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const relatedProducts = getRelatedProducts(items[0]?.id ?? '', 4);

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col">
        {/* Hero strip */}
        <div
          className="relative h-[38vh] flex items-end"
          style={{
            backgroundImage: 'url(https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/20" />
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pb-10">
            <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-2">MULCO Watches</p>
            <h1 className="font-serif text-5xl md:text-6xl text-brand-white">{t('cart.title')}</h1>
          </div>
        </div>

        {/* Empty body */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6 py-20">
          <div className="w-20 h-20 border border-brand-gold/15 flex items-center justify-center text-brand-muted">
            <ShoppingBag size={32} strokeWidth={1} />
          </div>
          <div className="text-center space-y-2">
            <p className="font-serif text-2xl text-brand-white">{t('cart.empty')}</p>
            <p className="font-sans text-sm text-brand-muted max-w-xs">
              Discover our latest timepieces and add your favourites to start your collection.
            </p>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2.5 text-xs font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-10 py-4 hover:bg-brand-white transition-colors duration-200"
          >
            {t('cart.explore')}
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Trust bar */}
        <TrustStrip />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">

      {/* ── Page header with editorial banner ── */}
      <div
        className="relative h-[32vh] flex items-end"
        style={{
          backgroundImage: 'url(https://mulco.com/cdn/shop/files/Banners_mega_menu_hombre_2.jpg?v=1764274994)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/10" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-3">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-150">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">{t('cart.title')}</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-1.5">
            {items.length} {items.length === 1 ? 'Item' : 'Items'}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-white">{t('cart.title')}</h1>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

          {/* ── Cart Items ── */}
          <div>
            {/* Column headers — desktop */}
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-6 pb-4 border-b border-brand-gold/12 mb-2">
              <span />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Product</span>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted text-center">Qty</span>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted text-right">Total</span>
            </div>

            <div className="divide-y divide-brand-gold/[0.08]">
              {items.map((item) => (
                <div key={`${item.id}-${item.variant ?? ''}`} className="py-7 grid grid-cols-[96px_1fr] md:grid-cols-[96px_1fr_auto_auto] gap-5 md:gap-6 items-center group">

                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="relative overflow-hidden aspect-square flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col justify-center gap-2 min-w-0">
                    <div>
                      <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold">{item.collection}</span>
                      <Link
                        to={`/product/${item.id}`}
                        className="block font-serif text-xl md:text-2xl text-brand-white hover:text-brand-gold transition-colors duration-200 leading-tight mt-0.5"
                      >
                        {item.name}
                      </Link>
                      {item.variant && (
                        <p className="text-[11px] font-sans text-brand-muted mt-1">{item.variant}</p>
                      )}
                    </div>
                    <p className="font-serif text-lg text-brand-gold md:hidden">${(item.price * item.quantity).toFixed(2)}</p>

                    {/* Mobile qty + remove */}
                    <div className="flex items-center gap-4 md:hidden">
                      <QtyControl
                        quantity={item.quantity}
                        onDecrease={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1, item.variant) : removeItem(item.id, item.variant)}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                      />
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="text-brand-muted hover:text-red-400 transition-colors duration-150 text-[10px] font-sans tracking-wider uppercase flex items-center gap-1"
                      >
                        <Trash2 size={11} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Desktop qty */}
                  <div className="hidden md:flex flex-col items-center gap-3">
                    <QtyControl
                      quantity={item.quantity}
                      onDecrease={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1, item.variant) : removeItem(item.id, item.variant)}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                    />
                    <button
                      onClick={() => removeItem(item.id, item.variant)}
                      aria-label={t('cart.remove')}
                      className="text-brand-muted hover:text-red-400 transition-colors duration-150"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Desktop line total */}
                  <div className="hidden md:flex flex-col items-end justify-center gap-1">
                    <span className="font-serif text-2xl text-brand-gold">${(item.price * item.quantity).toFixed(2)}</span>
                    <span className="text-[10px] font-sans text-brand-muted">${item.price.toFixed(2)} each</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom action row */}
            <div className="flex items-center justify-between pt-6 border-t border-brand-gold/12 mt-2">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.18em] uppercase text-brand-muted hover:text-brand-gold transition-colors duration-200"
              >
                <ChevronRight size={10} className="rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <aside className="lg:sticky lg:top-28">
            <div
              className="border border-brand-gold/15 relative overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #111111 0%, #0A0A0A 100%)' }}
            >
              {/* Gold top accent line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

              <div className="p-7 flex flex-col gap-6">
                <div>
                  <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-1">Summary</p>
                  <h2 className="font-serif text-2xl text-brand-white">Order Details</h2>
                </div>

                {/* Line items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`summary-${item.id}-${item.variant ?? ''}`} className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs text-brand-white truncate">{item.name}</p>
                        <p className="font-sans text-[10px] text-brand-muted">× {item.quantity}</p>
                      </div>
                      <span className="font-sans text-xs text-brand-white flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-brand-gold/12" />

                {/* Totals */}
                <div className="space-y-2.5">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-brand-muted">{t('cart.subtotal')}</span>
                    <span className="font-sans text-sm text-brand-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-brand-muted">Shipping</span>
                    <span className="text-[10px] font-sans tracking-[0.18em] uppercase text-brand-gold border border-brand-gold/30 px-2 py-0.5">Free</span>
                  </div>
                </div>

                {/* Grand total */}
                <div className="border-t border-brand-gold/15 pt-5 flex justify-between items-end">
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-muted">Total</span>
                  <span className="font-serif text-3xl text-brand-gold">${totalPrice.toFixed(2)}</span>
                </div>

                <p className="text-[10px] font-sans text-brand-muted text-center">{t('cart.shippingNote')}</p>

                {/* CTA */}
                <button className="w-full py-4 bg-brand-gold text-brand-black text-[11px] font-sans font-bold tracking-[0.22em] uppercase flex items-center justify-center gap-2.5 hover:bg-brand-white transition-colors duration-200">
                  {t('cart.checkout')}
                  <ArrowRight size={12} />
                </button>

                {/* Trust */}
                <div className="flex items-center justify-center gap-1.5 text-brand-muted">
                  <Lock size={10} />
                  <span className="text-[10px] font-sans tracking-wide">256-bit SSL secure checkout</span>
                </div>

                {/* Mini trust icons */}
                <div className="grid grid-cols-3 gap-3 pt-1 border-t border-brand-gold/12">
                  {[
                    { icon: <Shield size={14} />, label: '2-Year Warranty' },
                    { icon: <Truck size={14} />, label: 'Free Shipping' },
                    { icon: <RotateCcw size={14} />, label: 'Easy Returns' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                      <span className="text-brand-gold">{icon}</span>
                      <span className="text-[9px] font-sans text-brand-muted leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── You May Also Like ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-14 border-t border-brand-gold/12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-1">Continue Exploring</p>
                <h2 className="font-serif text-3xl md:text-4xl text-brand-white">{t('product.related')}</h2>
              </div>
              <Link
                to="/collections"
                className="hidden md:flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-200"
              >
                View All <ArrowRight size={10} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product, i) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group relative flex flex-col"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                    {/* Quick view */}
                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-brand-white bg-brand-black/80 px-4 py-2">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-3 space-y-1">
                    <p className="text-[9px] font-sans tracking-[0.22em] uppercase text-brand-gold">{product.collection}</p>
                    <p className="font-serif text-base text-brand-white group-hover:text-brand-gold transition-colors duration-200 leading-tight">{product.name}</p>
                    <p className="font-serif text-sm text-brand-muted">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Trust Strip ── */}
      <TrustStrip />
    </div>
  );
}

function QtyControl({ quantity, onDecrease, onIncrease }: { quantity: number; onDecrease: () => void; onIncrease: () => void }) {
  return (
    <div className="flex items-center border border-brand-gold/20">
      <button
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:bg-brand-gold/5 transition-colors duration-150"
      >
        <Minus size={10} />
      </button>
      <span className="w-9 text-center text-sm font-sans text-brand-white select-none">{quantity}</span>
      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-gold hover:bg-brand-gold/5 transition-colors duration-150"
      >
        <Plus size={10} />
      </button>
    </div>
  );
}

function TrustStrip() {
  const signals = [
    { icon: <Shield size={16} />, label: 'Swiss Movement Quality' },
    { icon: <Shield size={16} />, label: '2-Year International Warranty' },
    { icon: <Truck size={16} />, label: 'Free Shipping (PR & USA)' },
    { icon: <RotateCcw size={16} />, label: 'Easy Returns' },
    { icon: <Lock size={16} />, label: 'Secure Checkout' },
  ];

  return (
    <div className="border-t border-brand-gold/10 bg-brand-navy/30 px-6 md:px-12 lg:px-20 py-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-0 md:justify-between">
        {signals.map(({ icon, label }, i) => (
          <div key={label} className="flex items-center gap-2.5">
            {i > 0 && <div className="hidden md:block w-px h-5 bg-brand-gold/20 -ml-0 mr-6" />}
            <span className="text-brand-gold">{icon}</span>
            <span className="text-[11px] font-sans text-brand-muted tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
