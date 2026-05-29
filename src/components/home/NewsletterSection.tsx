import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { sanitizeEmail } from '../../utils/sanitize';

export default function NewsletterSection() {
  const { ref, inView } = useInView(0.2);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = sanitizeEmail(email.trim());
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
    if (!valid) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-28 bg-brand-navy border-y border-brand-gold/10"
    >
      <div
        className="max-w-xl mx-auto px-6 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Offer badge */}
        <div className="inline-block border border-brand-gold/40 px-5 py-1.5 mb-6">
          <span className="text-[11px] font-sans font-bold tracking-[0.35em] uppercase text-brand-gold">
            Get 10% Off
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-5xl text-brand-white">
          Join Our Newsletter!
        </h2>
        <div className="w-10 h-px bg-brand-gold mx-auto mt-4" />

        {/* Subtext */}
        <p className="text-brand-muted text-sm font-sans mt-6 leading-relaxed">
          Subscribe for exclusive updates and offers from Mulco. By signing up, you agree to our terms.
        </p>

        {/* Form or success */}
        <div className="mt-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle size={28} className="text-brand-gold" strokeWidth={1.5} />
              <p className="font-serif text-xl text-brand-white">You're in. Check your inbox.</p>
              <p className="font-sans text-xs text-brand-muted">Your 10% discount code is on its way.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border border-brand-gold/20 focus-within:border-brand-gold/50 transition-colors duration-200">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="flex-1 bg-transparent text-brand-white placeholder:text-brand-muted text-sm font-sans px-4 py-3.5 outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-brand-gold text-brand-black text-[11px] font-sans font-bold tracking-[0.25em] uppercase hover:bg-brand-white transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                >
                  Sign Me Up
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400 font-sans">{error}</p>
              )}
            </form>
          )}
        </div>

        {/* Legal footnote */}
        {!submitted && (
          <p className="mt-5 text-[11px] text-brand-muted/55 font-sans leading-relaxed">
            * By completing this form you are signing up to receive our emails. You can unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  );
}
