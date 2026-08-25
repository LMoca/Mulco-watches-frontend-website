import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import type { Product } from '../data/products';
import Eyebrow from './Eyebrow';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | null>(null);
  const [added, setAdded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const open = product !== null;
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] ?? null);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function handleAdd() {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      collection: product.collection,
      price: product.price,
      image: selectedColor?.image ?? product.images[0],
      variant: selectedColor?.name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  }

  const displayImage = selectedColor?.image ?? product?.images[0] ?? '';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 400,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Side panel — slides in from right */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quick view"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '480px',
          maxWidth: '100vw',
          background: 'rgb(var(--brand-black))',
          zIndex: 401,
          overflowY: 'auto',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {product && (
          <>
            {/* Close — "×" character, no border or background */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-6 z-10 font-serif text-2xl leading-none text-brand-gold/60 hover:text-brand-gold transition-colors duration-300"
            >
              ×
            </button>

            {/* Product image — full width at top */}
            <div className="relative aspect-square w-full bg-brand-gold/[0.03] flex-shrink-0">
              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-1">
                  New
                </span>
              )}
            </div>

            {/* Info — mirrors ProductDetail buying column */}
            <div className="flex flex-col gap-5 px-8 py-8">
              <Eyebrow text={product.collection} rule />

              <div>
                <h2 className="font-serif text-[2rem] text-brand-white leading-[0.95] tracking-[-0.02em]">
                  {product.name}
                </h2>
                <div className="w-8 h-px bg-brand-gold mt-3" />
              </div>

              {/* Tags — middle-dot separated, no pills */}
              {product.tags.length > 0 && (
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">
                  {product.tags.join(' · ')}
                </p>
              )}

              {/* Color picker — 1px gold ring at 4px offset */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-[11px] font-sans text-brand-muted tracking-widest uppercase mb-2.5">
                    Color: <span className="text-brand-white ml-1">{selectedColor?.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        title={c.name}
                        aria-label={`Select ${c.name}`}
                        className="w-10 h-10 overflow-hidden transition-all duration-200"
                        style={{
                          outline: selectedColor?.name === c.name ? '1px solid #C9A84C' : '1px solid transparent',
                          outlineOffset: '4px',
                        }}
                      >
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span
                  className="font-sans text-base text-brand-muted"
                  style={product.originalPrice ? { textDecoration: 'underline', textDecorationColor: '#C9A84C', textUnderlineOffset: '4px' } : undefined}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-[13px] text-brand-muted line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {/* Low stock */}
              {product.stock !== undefined && product.stock <= 5 && (
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-rose/70">
                  Only {product.stock} left in stock
                </p>
              )}

              {/* Add to Collection */}
              <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-3 w-full h-14 text-[13px] font-sans font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: added ? '#F5F5F0' : '#C9A84C',
                  color: 'var(--color-on-gold)',
                }}
              >
                <span style={{ transition: 'transform 0.2s ease', transform: added ? 'rotate(360deg) scale(1.15)' : 'rotate(0) scale(1)', display: 'inline-flex' }}>
                  {added ? <CheckCircle size={16} /> : <ShoppingBag size={16} />}
                </span>
                {added ? 'Added to Collection' : 'Add to Collection'}
              </button>

              {/* View Full Details — gold underline on hover */}
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="group relative inline-flex self-center font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors duration-[400ms]"
              >
                <span className="relative">
                  View Full Details
                  <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
