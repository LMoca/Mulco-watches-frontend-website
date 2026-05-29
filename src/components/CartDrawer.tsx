import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, drawerOpen, closeDrawer } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  /* ESC to close */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer();
    }
    if (drawerOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, closeDrawer]);

  function goCheckout() {
    closeDrawer();
    navigate('/checkout');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(2px)',
          zIndex: 300,
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 420,
          background: '#0f0f0f',
          borderLeft: '1px solid rgba(201,168,76,0.12)',
          zIndex: 301,
          display: 'flex',
          flexDirection: 'column',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', flexShrink: 0 }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gold/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag size={16} className="text-brand-gold" strokeWidth={1.5} />
            <span className="font-serif text-lg text-brand-white">Your Cart</span>
            {totalItems > 0 && (
              <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-brand-muted">
                ({totalItems} item{totalItems !== 1 ? 's' : ''})
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="text-brand-muted hover:text-brand-gold transition-colors duration-200 p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
              <ShoppingBag size={40} className="text-brand-gold/20" strokeWidth={1} />
              <div>
                <p className="font-serif text-xl text-brand-white mb-1">Your cart is empty</p>
                <p className="font-sans text-xs text-brand-muted">Add a timepiece to get started.</p>
              </div>
              <button
                onClick={() => { closeDrawer(); navigate('/collections'); }}
                className="text-xs font-sans uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant ?? ''}`} className="flex gap-4">
                <Link to={`/product/${item.id}`} onClick={closeDrawer} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-0.5">{item.collection}</p>
                  <Link
                    to={`/product/${item.id}`}
                    onClick={closeDrawer}
                    className="font-serif text-sm text-brand-white hover:text-brand-gold transition-colors duration-200 leading-snug block"
                  >
                    {item.name}
                  </Link>
                  {item.variant && (
                    <p className="text-[10px] font-sans text-brand-muted mt-0.5">{item.variant}</p>
                  )}
                  {item.engraving && (
                    <p className="text-[10px] font-sans text-brand-gold/70 mt-0.5 italic">"{item.engraving}"</p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center border border-brand-gold/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-gold disabled:opacity-30 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-7 text-center font-sans text-xs text-brand-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-sm text-brand-gold">{formatPrice(item.price * item.quantity)}</span>
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        aria-label="Remove"
                        className="text-brand-muted hover:text-red-400 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-brand-gold/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-brand-muted">Subtotal</span>
              <span className="font-serif text-xl text-brand-gold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[10px] font-sans text-brand-muted/60 leading-relaxed">
              Shipping &amp; taxes calculated at checkout
            </p>

            <button
              onClick={goCheckout}
              className="w-full flex items-center justify-center gap-3 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.22em] uppercase py-4 hover:bg-brand-white transition-colors duration-300"
            >
              <span>Checkout</span>
              <ArrowRight size={13} />
            </button>

            <Link
              to="/cart"
              onClick={closeDrawer}
              className="block text-center text-[11px] font-sans tracking-[0.18em] uppercase text-brand-muted hover:text-brand-gold transition-colors duration-200"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
