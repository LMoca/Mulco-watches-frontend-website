import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] font-sans tracking-[0.35em] uppercase text-brand-gold mb-6">
        Error 404
      </p>

      <h1 className="font-serif text-6xl sm:text-7xl text-brand-white leading-none mb-4">
        Page Not Found
      </h1>

      <div className="w-10 h-px bg-brand-gold mx-auto my-6" />

      <p className="font-sans text-sm text-brand-muted max-w-sm leading-relaxed mb-10">
        The page you're looking for has moved, or it never existed. Let us guide you back to the collection.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <Link
          to="/collections"
          className="inline-flex items-center gap-3 border border-brand-gold text-brand-gold text-xs uppercase tracking-[0.22em] px-10 py-4 hover:bg-brand-gold hover:text-brand-black transition-all duration-300"
        >
          Browse Collections
        </Link>
        <Link
          to="/"
          className="text-xs uppercase tracking-[0.22em] text-brand-muted hover:text-brand-gold transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
