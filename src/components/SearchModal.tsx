import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

interface Props {
  open: boolean;
  onClose: () => void;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-brand-gold/30 text-brand-gold rounded-[2px] px-[1px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  /* Focus input when modal opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* ESC to close */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const trimmed = query.trim();

  const results = useMemo(() => {
    if (trimmed.length < 2) return [];
    const q = trimmed.toLowerCase();
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [trimmed]);

  /* Quick-access collections shown when query is empty */
  const quickLinks = [
    { label: "Women's Watches",  href: '/collections/women' },
    { label: "Men's Watches",    href: '/collections/men' },
    { label: 'New Arrivals',     href: '/collections/new-arrivals' },
    { label: 'Accessories',      href: '/accessories' },
    { label: 'Blue Marine',      href: '/collections/women' },
    { label: 'Buzo',             href: '/collections/men' },
  ];

  function go(href: string) {
    navigate(href);
    onClose();
  }

  function goProduct(id: string) {
    navigate(`/product/${id}`);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full bg-brand-black border-b border-brand-gold/15 shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
        style={{ animation: 'slide-down 0.22s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        {/* Search bar */}
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-4 py-5 border-b border-brand-gold/12">
            <Search size={18} className="text-brand-gold flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches, collections, styles…"
              className="flex-1 bg-transparent text-brand-white placeholder:text-brand-muted text-base font-sans outline-none caret-brand-gold"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-brand-muted hover:text-brand-gold transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-brand-muted hover:text-brand-gold transition-colors ml-2 flex-shrink-0"
              aria-label="Close search"
            >
              <span className="text-[10px] font-sans tracking-widest uppercase border border-brand-gold/25 px-2 py-1 hover:border-brand-gold transition-colors">ESC</span>
            </button>
          </div>

          {/* Results / quick links */}
          <div className="py-5 max-h-[60vh] overflow-y-auto">
            {trimmed.length < 2 ? (
              /* Quick links */
              <div>
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-muted mb-4">Browse</p>
                <div className="flex flex-wrap gap-2">
                  {quickLinks.map((ql) => (
                    <button
                      key={ql.label}
                      onClick={() => go(ql.href)}
                      className="text-xs font-sans tracking-wide text-brand-muted border border-brand-gold/15 px-4 py-2 hover:border-brand-gold hover:text-brand-gold transition-colors duration-200"
                    >
                      {ql.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              /* No results */
              <div className="py-8 text-center">
                <p className="font-serif text-xl text-brand-white mb-2">No results for "{trimmed}"</p>
                <p className="font-sans text-sm text-brand-muted">Try a collection name, style, or feature (e.g. "Blue Marine", "Chronograph", "Swarovski")</p>
              </div>
            ) : (
              /* Results */
              <div>
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-muted mb-4">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <div className="divide-y divide-brand-gold/[0.08]">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => goProduct(p.id)}
                      className="w-full flex items-center gap-4 py-3.5 group text-left hover:bg-white/[0.02] transition-colors duration-150 -mx-2 px-2 rounded-sm"
                    >
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-14 h-14 overflow-hidden bg-brand-gold/[0.04]">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold">
                          {highlight(p.collection, trimmed)}
                        </p>
                        <p className="font-serif text-base text-brand-white leading-tight mt-0.5 group-hover:text-brand-gold transition-colors duration-200">
                          {highlight(p.name, trimmed)}
                        </p>
                        <p className="text-[10px] font-sans text-brand-muted mt-0.5 truncate">
                          {p.tags.slice(0, 3).join(' · ')}
                        </p>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex-shrink-0 flex items-center gap-3">
                        <span className="font-serif text-base text-brand-gold">${p.price}</span>
                        <ArrowRight size={13} className="text-brand-muted group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* View all link */}
                <button
                  onClick={() => go('/collections')}
                  className="mt-5 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-200 flex items-center gap-1.5"
                >
                  Browse all collections <ArrowRight size={10} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
