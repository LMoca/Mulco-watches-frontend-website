import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, drawerOpen, closeDrawer } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, drawerOpen);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

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
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 300,
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Drawer panel — 440px, slides from right */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '440px',
          maxWidth: '100vw',
          background: 'rgb(var(--brand-black))',
          zIndex: 301,
          display: 'flex',
          flexDirection: 'column',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-gold/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">Your Cart</span>
            {totalItems > 0 && (
              <span className="font-sans text-[11px] text-brand-muted">({totalItems})</span>
            )}
          </div>
          {/* "×" character close — no border or background */}
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="font-serif text-2xl leading-none text-brand-gold/40 hover:text-brand-gold transition-colors duration-300"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
              <p className="font-serif text-xl text-brand-white mb-1">Your cart is empty</p>
              <p className="font-sans text-xs text-brand-muted">Add a timepiece to get started.</p>
              <button
                onClick={() => { closeDrawer(); navigate('/collections'); }}
                className="group relative font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold mt-2"
              >
                <span className="relative">
                  Browse Collections
                  <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
                </span>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant ?? ''}`} className="flex gap-4">
                {/* 80px image */}
                <Link to={`/product/${item.id}`} onClick={closeDrawer} className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-0.5">{item.collection}</p>
                  <Link
                    to={`/product/${item.id}`}
                    onClick={closeDrawer}
                    className="font-serif text-sm text-brand-white hover:text-brand-gold transition-colors duration-300 leading-snug block"
                  >
                    {item.name}
                  </Link>
                  {/* Variant + engraving: italic 12px muted */}
                  {item.variant && (
                    <p className="text-[12px] font-sans text-brand-muted italic mt-0.5">{item.variant}</p>
                  )}
                  {item.engraving && (
                    <p className="text-[12px] font-sans text-brand-muted italic mt-0.5">"{item.engraving}"</p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty: minus | number | plus with hairline dividers, no box */}
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease"
                        className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-gold disabled:opacity-30 transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="w-px h-3.5 bg-brand-gold/20 flex-shrink-0" />
                      <span className="w-7 text-center font-sans text-xs text-brand-white">{item.quantity}</span>
                      <span className="w-px h-3.5 bg-brand-gold/20 flex-shrink-0" />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        aria-label="Increase"
                        className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-sans text-sm text-brand-muted">{formatPrice(item.price * item.quantity)}</span>
                      {/* Remove: "×" character, gold/40 → gold on hover */}
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        aria-label="Remove"
                        className="font-serif text-xl leading-none text-brand-gold/40 hover:text-brand-gold transition-colors duration-300"
                      >
                        ×
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
            {/* Subtotal — DM Sans 18px gold, right-aligned */}
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">Subtotal</span>
              <span className="font-sans text-[18px] text-brand-gold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[10px] font-sans text-brand-muted/50">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout — h-14 (56px), gold fill */}
            <button
              onClick={goCheckout}
              className="w-full h-14 flex items-center justify-center text-[13px] font-sans font-semibold tracking-[0.15em] uppercase bg-brand-gold text-brand-black hover:bg-brand-white transition-colors duration-300"
            >
              Checkout
            </button>

            {/* View Full Cart — text-only with gold underline */}
            <div className="flex justify-center">
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="group relative font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms]"
              >
                <span className="relative">
                  View Full Cart
                  <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
