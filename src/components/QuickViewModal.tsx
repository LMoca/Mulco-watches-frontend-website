import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import type { Product } from '../data/products';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | null>(null);
  const [added, setAdded] = useState(false);

  const open = product !== null;

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
    setTimeout(() => setAdded(false), 2200);
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
          backdropFilter: 'blur(3px)',
          zIndex: 400,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 401,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: '#0f0f0f',
            border: '1px solid rgba(201,168,76,0.15)',
            width: '100%',
            maxWidth: 760,
            maxHeight: '90vh',
            overflowY: 'auto',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
            transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {product && (
            <>
              {/* Gold top accent */}
              <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #C9A84C, transparent)', flexShrink: 0 }} />

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square bg-brand-gold/[0.03]">
                  <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 text-[9px] font-sans font-semibold tracking-[0.2em] uppercase bg-brand-gold text-brand-black px-2 py-1">
                      New
                    </span>
                  )}
                  {product.stock !== undefined && product.stock <= 5 && (
                    <span className="absolute bottom-3 left-3 text-[9px] font-sans font-semibold tracking-[0.18em] uppercase bg-brand-black/80 text-brand-gold border border-brand-gold/40 px-2 py-1">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-5 p-6 sm:p-8">
                  {/* Close */}
                  <div className="flex justify-between items-start">
                    <p className="text-[9px] font-sans tracking-[0.3em] uppercase text-brand-gold">{product.collection}</p>
                    <button onClick={onClose} aria-label="Close" className="text-brand-muted hover:text-brand-gold transition-colors">
                      <X size={16} />
                    </button>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl text-brand-white leading-tight">{product.name}</h2>
                    <div className="w-6 h-px bg-brand-gold mt-3" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-sans text-brand-muted tracking-wider border border-brand-gold/12 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Color picker */}
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <p className="text-[10px] font-sans text-brand-muted tracking-widest uppercase mb-2">
                        Color: <span className="text-brand-white ml-1">{selectedColor?.name}</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c)}
                            title={c.name}
                            className="w-9 h-9 overflow-hidden transition-all duration-200"
                            style={{
                              outline: selectedColor?.name === c.name ? '2px solid #C9A84C' : '2px solid transparent',
                              outlineOffset: '2px',
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
                    <span className="font-serif text-3xl text-brand-gold">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="font-serif text-lg text-brand-muted line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* CTA row */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <button
                      onClick={handleAdd}
                      className="flex items-center justify-center gap-3 w-full py-3.5 text-xs font-sans font-bold tracking-[0.22em] uppercase transition-all duration-300"
                      style={{ backgroundColor: added ? '#F5F5F0' : '#C9A84C', color: '#0A0A0A' }}
                    >
                      {added ? <CheckCircle size={14} /> : <ShoppingBag size={14} />}
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center justify-center gap-2 text-[11px] font-sans tracking-[0.2em] uppercase text-brand-muted hover:text-brand-gold transition-colors duration-200"
                    >
                      View Full Details
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
