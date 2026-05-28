import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { homepageFaqs } from '../../data/faqData';

function AccordionItem({ question, answer, index, parentInView }: {
  question: string;
  answer: string;
  index: number;
  parentInView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-brand-gold/[0.02] hover:bg-brand-gold/[0.04] transition-colors duration-300"
      style={{
        opacity: parentInView ? 1 : 0,
        transform: parentInView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 75}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 75}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 p-5 text-left group"
      >
        <span className="font-sans text-sm text-brand-white group-hover:text-brand-gold transition-colors duration-200 leading-snug">
          {question}
        </span>
        <ChevronDown
          size={15}
          className={`flex-shrink-0 text-brand-gold mt-0.5 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* grid-rows avoids maxHeight layout thrash */}
      <div className={`grid overflow-hidden transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="font-sans text-sm text-brand-muted leading-relaxed px-5 pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqPreview() {
  const { t } = useLanguage();
  const { ref, inView } = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 md:py-28 bg-brand-black"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <div
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div>
            <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-brand-gold">
              Need Help?
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-white mt-2">
              {t('faq.title')}
            </h2>
            <div className="w-10 h-px bg-brand-gold mt-4" />
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-widest uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-200 self-start sm:self-auto"
          >
            {t('faq.viewAll')} <ArrowRight size={13} />
          </Link>
        </div>

        {/* 2-column grid of accordion cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {homepageFaqs.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
              index={i}
              parentInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
