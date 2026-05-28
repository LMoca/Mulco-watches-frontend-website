import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { faqData } from '../data/faqData';
import { sanitizeInput } from '../utils/sanitize';

function TutorialTile({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden bg-brand-black group border border-brand-gold/12 hover:border-brand-gold/30 transition-colors duration-200">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-brand-black/40" />
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full border border-brand-white/70 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-200">
              <Play size={14} className="text-brand-white group-hover:text-brand-gold ml-0.5 transition-colors duration-200" fill="currentColor" />
            </div>
            <span className="font-sans text-xs text-brand-white group-hover:text-brand-gold transition-colors duration-200 tracking-wide">{title}</span>
          </button>
        </>
      )}
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-brand-gold/12">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-sans text-sm md:text-base text-brand-white group-hover:text-brand-gold transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-brand-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="font-sans text-sm text-brand-muted leading-relaxed pb-5 pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const { ref, inView } = useInView(0.05);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return faqData;
    return faqData
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero */}
      <div className="relative bg-brand-navy border-b border-brand-gold/10 py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
            Help Center
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-white mt-3">
            {t('faq.title')}
          </h1>
          <div className="w-10 h-px bg-brand-gold mx-auto mt-5" />

          {/* Search */}
          <div className="relative mt-10 max-w-xl mx-auto">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(sanitizeInput(e.target.value))}
              placeholder="Search questions..."
              aria-label="Search FAQs"
              className="w-full bg-brand-gold/[0.04] border border-brand-gold/20 focus:border-brand-gold text-brand-white placeholder:text-brand-muted text-sm font-sans pl-10 pr-4 py-3.5 outline-none transition-colors duration-200 rounded-none"
            />
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-sans text-brand-muted">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight size={11} />
          <span className="text-brand-white">FAQ</span>
        </nav>
      </div>

      {/* Content */}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-4xl mx-auto px-6 pb-28 pt-10"
      >
        {filtered.length === 0 ? (
          <p className="text-brand-muted font-sans text-sm mt-8">
            No results found for "{query}". Try a different search term.
          </p>
        ) : (
          <div className="space-y-14">
            {filtered.map((cat, ci) => (
              <div
                key={cat.category}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.7s ease ${ci * 100}ms, transform 0.7s ease ${ci * 100}ms`,
                }}
              >
                <h2 className="font-serif text-2xl text-brand-white mb-1">{cat.category}</h2>
                <div className="w-6 h-px bg-brand-gold mb-4" />
                {cat.items.map((item, ii) => (
                  <AccordionItem key={ii} question={item.question} answer={item.answer} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Watch Tutorials */}
        <div className="mt-20">
          <h2 className="font-serif text-2xl text-brand-white mb-1">Watch Tutorials</h2>
          <div className="w-6 h-px bg-brand-gold mb-6" />
          <p className="font-sans text-sm text-brand-muted mb-8 leading-relaxed">
            Not sure how to set your MULCO? These official tutorials walk you through each movement type.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'zveQTY1KgQU', title: 'Quartz Movement' },
              { id: 'p0uzj5Fn4EY', title: 'Chronograph Movement' },
              { id: 'O9YyXJTouHs', title: 'Multifunctional Movement' },
            ].map((v) => (
              <TutorialTile key={v.id} id={v.id} title={v.title} />
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div
          className="mt-20 p-8 bg-brand-navy border border-brand-gold/15 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 600ms',
          }}
        >
          <h3 className="font-serif text-2xl text-brand-white mb-2">Still have questions?</h3>
          <p className="text-brand-muted text-sm font-sans mb-6">
            Our team is available Monday–Saturday, 10 AM – 6 PM EST.
          </p>
          <Link
            to="/support"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-black text-xs font-sans font-semibold tracking-widest uppercase hover:bg-brand-white transition-colors duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
