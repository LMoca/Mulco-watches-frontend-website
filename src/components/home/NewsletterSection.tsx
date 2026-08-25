import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { sanitizeEmail } from '../../utils/sanitize';
import Eyebrow from '../Eyebrow';

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
      className="py-28 md:py-40 lg:py-52 bg-brand-navy border-y border-brand-gold/10"
    >
      <div
        className="max-w-xl mx-auto px-6 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Eyebrow replaces badge */}
        <Eyebrow text="Get 10% Off" className="justify-center mb-6" />

        {/* Headline — lowercase, no exclamation */}
        <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] text-brand-white leading-[0.95] tracking-[-0.02em]">
          Join Our Newsletter.
        </h2>
        <div className="w-10 h-px bg-brand-gold mx-auto mt-5" />

        {/* Subtext */}
        <p className="font-sans text-[15px] text-brand-muted leading-[1.7] mt-6">
          Subscribe for exclusive updates and offers from Mulco.
        </p>

        {/* Form or success */}
        <div className="mt-10">
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle size={24} className="text-brand-gold" strokeWidth={1} />
              <p className="font-serif text-xl text-brand-white">You're in. Check your inbox.</p>
              <p className="font-sans text-[13px] text-brand-muted">Your 10% discount code is on its way.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="flex-1 bg-transparent text-brand-white placeholder:text-brand-muted/50 text-sm font-sans px-0 py-3 outline-none min-w-0 border-b border-brand-gold/40 focus:border-brand-gold transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="group relative sm:ml-8 mt-4 sm:mt-0 text-[12px] font-sans uppercase tracking-[0.2em] text-brand-gold hover:text-brand-white transition-colors duration-[400ms] self-start sm:self-center whitespace-nowrap pb-0.5"
                >
                  <span className="relative">
                    Subscribe →
                    <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
                  </span>
                </button>
              </div>
              {error && (
                <p className="mt-3 text-[11px] font-sans text-brand-rose">{error}</p>
              )}
            </form>
          )}
        </div>

        {/* Legal footnote */}
        {!submitted && (
          <p className="mt-6 text-[10px] text-brand-muted/50 font-sans leading-relaxed">
            * By completing this form you are signing up to receive our emails. You can unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  );
}
