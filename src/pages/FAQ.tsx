import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';
import { faqData } from '../data/faqData';
import { sanitizeInput } from '../utils/sanitize';
import Eyebrow from '../components/Eyebrow';

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
          className={`flex-shrink-0 text-brand-gold transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`grid overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
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
      <div className="border-b border-brand-gold/10 py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow text="Help Center" className="mb-4 justify-center" />
          <h1 className="font-serif text-[3rem] md:text-[4rem] text-brand-white leading-[0.95] tracking-[-0.02em]">
            {t('faq.title')}
          </h1>
          <div className="w-10 h-px bg-brand-gold mx-auto mt-6" />

          {/* Search — borderless with gold bottom-rule */}
          <div className="relative mt-10 max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(sanitizeInput(e.target.value))}
              placeholder="Search questions…"
              aria-label="Search FAQs"
              className="w-full bg-transparent border-0 border-b border-brand-gold/20 focus:border-brand-gold text-brand-white placeholder:text-brand-muted/50 font-sans text-sm px-0 py-3 outline-none transition-colors duration-[400ms] text-center"
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
          <div className="space-y-20">
            {filtered.map((cat, ci) => (
              <div
                key={cat.category}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${ci * 100}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${ci * 100}ms`,
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
          className="mt-24 border-t border-brand-gold/12 pt-12 text-center"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 600ms' }}
        >
          <Eyebrow text="Still have questions?" className="mb-4 justify-center" />
          <p className="font-sans text-[14px] text-brand-muted mb-8 leading-[1.7]">
            Our team is available Monday–Saturday, 10 AM – 6 PM EST.
          </p>
          <Link
            to="/support"
            className="group relative inline-flex font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold"
          >
            <span className="relative">
              Contact Support
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
