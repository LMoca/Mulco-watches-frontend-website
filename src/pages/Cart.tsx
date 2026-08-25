import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ChevronRight, Lock, Shield, RotateCcw, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { getRelatedProducts } from '../data/products';

export default function Cart() {
  const { t } = useLanguage();
  const { items, removeItem, addItem, updateQuantity, totalPrice } = useCart();
  const { formatPrice, currency } = useCurrency();
  const navigate = useNavigate();

  type UndoItem = { id: string; variant?: string; name: string; collection: string; price: number; image: string; quantity: number; engraving?: string };
  const [undoItem, setUndoItem] = useState<UndoItem | null>(null);

  function doRemove(id: string, variant?: string) {
    const found = items.find((i) => i.id === id && i.variant === variant);
    if (found) {
      setUndoItem({ id: found.id, variant: found.variant, name: found.name, collection: found.collection, price: found.price, image: found.image, quantity: found.quantity, engraving: found.engraving });
      setTimeout(() => setUndoItem(null), 4000);
    }
    removeItem(id, variant);
  }

  function handleUndo() {
    if (undoItem) {
      addItem({ id: undoItem.id, name: undoItem.name, collection: undoItem.collection, price: undoItem.price, image: undoItem.image, quantity: undoItem.quantity, variant: undoItem.variant, engraving: undoItem.engraving });
      setUndoItem(null);
    }
  }

  function handleDecrease(id: string, quantity: number, variant?: string) {
    if (quantity > 1) { updateQuantity(id, quantity - 1, variant); }
    else { doRemove(id, variant); }
  }

  const relatedProducts = getRelatedProducts(items[0]?.id ?? '', 4);

  /* ── Empty state ── */
  if (items.length === 0 && !undoItem) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col">
        <div
          className="relative h-[38vh] flex items-end"
          style={{ backgroundImage: 'url(/images/ui/Banners_mega_menu_hombre_2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/20" />
          <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-14 lg:px-24 pb-10">
            <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-2">MULCO Watches</p>
            <h1 className="font-serif text-5xl md:text-6xl text-brand-white">{t('cart.title')}</h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-10 px-6 py-20">
          <ShoppingBag size={40} className="text-brand-gold/20" strokeWidth={1} />
          <div className="text-center space-y-2">
            <p className="font-serif text-2xl text-brand-white">{t('cart.empty')}</p>
            <p className="font-sans text-sm text-brand-muted max-w-xs">Discover our latest timepieces and add your favourites to start your collection.</p>
          </div>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2.5 text-xs font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-10 py-4 hover:bg-brand-white transition-colors duration-200"
          >
            {t('cart.explore')} <ArrowRight size={13} />
          </Link>
        </div>
        <TrustStrip />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">

      {/* Page header */}
      <div
        className="relative h-[32vh] flex items-end"
        style={{ backgroundImage: 'url(/images/ui/Banners_mega_menu_hombre_2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/10" />
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-14 lg:px-24 pb-10">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-3">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">{t('cart.title')}</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-1.5">
            {items.length} {items.length === 1 ? 'Item' : 'Items'}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-white">{t('cart.title')}</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 md:px-14 lg:px-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* Cart Items */}
          <div>
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-6 pb-4 border-b border-brand-gold/12 mb-2">
              <span />
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted">Product</span>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted text-center">Qty</span>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted text-right">Total</span>
            </div>

            <div className="divide-y divide-brand-gold/[0.08]">
              {items.map((item) => {
                const key = `${item.id}-${item.variant ?? ''}`;
                return (
                  <div key={key} className="py-7 grid grid-cols-[96px_1fr] md:grid-cols-[96px_1fr_auto_auto] gap-5 md:gap-6 items-center group">

                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="relative overflow-hidden aspect-square">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex flex-col justify-center gap-1.5 min-w-0">
                      <span className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold">{item.collection}</span>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-serif text-xl md:text-2xl text-brand-white hover:text-brand-gold transition-colors duration-300 leading-tight"
                      >
                        {item.name}
                      </Link>
                      {/* Variant + engraving: italic 12px muted */}
                      {item.variant && (
                        <p className="font-sans text-[12px] text-brand-muted italic">{item.variant}</p>
                      )}
                      {item.engraving && (
                        <p className="font-sans text-[12px] text-brand-muted italic">Engraving: "{item.engraving}"</p>
                      )}
                      <p className="font-serif text-lg text-brand-muted md:hidden">{formatPrice(item.price * item.quantity)}</p>

                      {/* Mobile qty + remove */}
                      <div className="flex items-center gap-4 md:hidden mt-1">
                        <QtyControl
                          quantity={item.quantity}
                          onDecrease={() => handleDecrease(item.id, item.quantity, item.variant)}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        />
                        <button
                          onClick={() => doRemove(item.id, item.variant)}
                          className="font-serif text-xl leading-none text-brand-gold/40 hover:text-brand-gold transition-colors duration-300"
                          aria-label="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    {/* Desktop qty */}
                    <div className="hidden md:flex flex-col items-center gap-3">
                      <QtyControl
                        quantity={item.quantity}
                        onDecrease={() => handleDecrease(item.id, item.quantity, item.variant)}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                      />
                      {/* "×" remove — gold/40, hover gold */}
                      <button
                        onClick={() => doRemove(item.id, item.variant)}
                        aria-label={t('cart.remove')}
                        className="font-serif text-xl leading-none text-brand-gold/40 hover:text-brand-gold transition-colors duration-300"
                      >
                        ×
                      </button>
                    </div>

                    {/* Desktop line total */}
                    <div className="hidden md:flex flex-col items-end justify-center gap-1">
                      <span className="font-sans text-base text-brand-muted">{formatPrice(item.price * item.quantity)}</span>
                      <span className="text-[10px] font-sans text-brand-muted/60">{formatPrice(item.price)} each</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-brand-gold/12 mt-2">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.18em] uppercase text-brand-muted hover:text-brand-gold transition-colors duration-300"
              >
                <ChevronRight size={10} className="rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary — clean, no card decoration */}
          <aside className="lg:sticky lg:top-28 border-t border-brand-gold/12 pt-8 space-y-6">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted mb-1">Summary</p>
              <h2 className="font-serif text-2xl text-brand-white">Order Details</h2>
            </div>

            {/* Line items */}
            <div className="space-y-3 border-b border-brand-gold/8 pb-6">
              {items.map((item) => (
                <div key={`summary-${item.id}-${item.variant ?? ''}`} className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs text-brand-white truncate">{item.name}</p>
                    <p className="font-sans text-[10px] text-brand-muted">× {item.quantity}</p>
                  </div>
                  <span className="font-sans text-xs text-brand-muted flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="font-sans text-sm text-brand-muted">{t('cart.subtotal')}</span>
                <span className="font-sans text-sm text-brand-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-sm text-brand-muted">Shipping</span>
                <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-brand-gold">Free</span>
              </div>
            </div>

            {/* Grand total */}
            <div className="border-t border-brand-gold/12 pt-5 flex justify-between items-end">
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-brand-muted">Total</span>
              <span className="font-sans text-[18px] text-brand-gold">{formatPrice(totalPrice)}</span>
            </div>

            {/* Checkout — h-14 (56px) */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full h-14 bg-brand-gold text-brand-black text-[13px] font-sans font-semibold tracking-[0.15em] uppercase flex items-center justify-center hover:bg-brand-white transition-colors duration-300"
            >
              {t('cart.checkout')}
            </button>

            {/* Trust — single muted line */}
            <div className="flex items-center gap-1.5 justify-center text-brand-muted">
              <Lock size={10} />
              <span className="text-[10px] font-sans tracking-wide">Secure checkout</span>
            </div>
            <p className="font-sans text-[10px] text-brand-muted text-center">
              2-Year Warranty · Free Shipping · Easy Returns
            </p>

            {/* Currency disclaimer — small muted italic */}
            {currency !== 'USD' && (
              <p className="text-[10px] font-sans text-brand-muted italic text-center">
                Prices shown in {currency}. Charged in USD.
              </p>
            )}

            <p className="text-[10px] font-sans text-brand-muted/50 text-center">{t('cart.shippingNote')}</p>
          </aside>
        </div>

        {/* You May Also Like */}
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
                  className="group flex flex-col"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-[9px] font-sans tracking-[0.22em] uppercase text-brand-gold">{product.collection}</p>
                    <p className="font-serif text-base text-brand-white group-hover:text-brand-gold transition-colors duration-200 leading-tight">{product.name}</p>
                    <p className="font-sans text-[13px] text-brand-muted">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <TrustStrip />

      {/* Undo toast — slides up, 4-second auto-dismiss */}
      {undoItem && (
        <div
          className="fixed bottom-6 left-1/2 z-50 font-sans text-[12px] text-brand-muted bg-brand-black border border-brand-gold/20 px-6 py-3 whitespace-nowrap"
          style={{ transform: 'translateX(-50%)', animation: 'fade-in-up 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          Item removed.{' '}
          <button
            onClick={handleUndo}
            className="group relative text-brand-gold ml-1"
          >
            <span className="relative">
              Undo
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function QtyControl({ quantity, onDecrease, onIncrease }: { quantity: number; onDecrease: () => void; onIncrease: () => void }) {
  return (
    <div className="flex items-center">
      <button
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors text-sm"
      >
        −
      </button>
      <span className="w-px h-3.5 bg-brand-gold/20 flex-shrink-0" />
      <span className="w-9 text-center text-sm font-sans text-brand-white select-none">{quantity}</span>
      <span className="w-px h-3.5 bg-brand-gold/20 flex-shrink-0" />
      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors text-sm"
      >
        +
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
    <div className="border-t border-brand-gold/10 bg-brand-navy/30 px-6 md:px-14 lg:px-24 py-6">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-0 md:justify-between">
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
