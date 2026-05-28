import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { sanitizeEmail } from '../../utils/sanitize';

export default function NewsletterSection() {
  const { t } = useLanguage();
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
        className="max-w-2xl mx-auto px-6 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Eyebrow */}
        <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
          Exclusive Access
        </span>

        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-5xl text-brand-white mt-3">
          {t('newsletter.headline')}
        </h2>
        <div className="w-10 h-px bg-brand-gold mx-auto mt-4" />

        {/* Subtext */}
        <p className="text-brand-muted text-sm font-sans mt-6 leading-relaxed">
          {t('newsletter.subtext')}
        </p>

        {/* Form or success */}
        <div className="mt-8">
          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-brand-gold font-serif text-lg">
              <CheckCircle size={22} />
              {t('newsletter.success')}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t('newsletter.placeholder')}
                  aria-label={t('newsletter.placeholder')}
                  className="flex-1 bg-brand-gold/[0.04] border border-brand-gold/20 focus:border-brand-gold text-brand-white placeholder:text-brand-muted text-sm font-sans px-4 py-3 outline-none transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-brand-black text-xs font-sans font-semibold tracking-widest uppercase hover:bg-brand-white transition-colors duration-200 whitespace-nowrap"
                >
                  {t('newsletter.submit')} <ArrowRight size={13} />
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400 font-sans">{error}</p>
              )}
            </form>
          )}
        </div>

        {/* Privacy note */}
        {!submitted && (
          <p className="mt-4 text-[11px] text-brand-muted/60 font-sans">
            No spam. Unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  );
}
