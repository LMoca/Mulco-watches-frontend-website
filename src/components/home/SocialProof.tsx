import { useInView } from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';

const reviews = [
  {
    id: 1,
    text: 'I get numerous compliments on my Cobra. I simply love it.',
    author: 'Maria R.',
    location: 'Miami, FL',
  },
  {
    id: 2,
    text: 'It arrived on time, looks exactly like the photo. Packaged beautifully. Included a bonus gift.',
    author: 'James K.',
    location: 'New York, NY',
  },
  {
    id: 3,
    text: 'This is my third watch from Mulco — each one more exclusive than the last.',
    author: 'Sofia L.',
    location: 'San Juan, PR',
  },
];

export default function SocialProof() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: gridRef, inView: gridInView } = useInView(0.1);
  const { t } = useLanguage();

  return (
    <section className="bg-brand-black py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-brand-white mt-3">
            {t('reviews.title')}
          </h2>
          <div className="w-10 h-px bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Cards — desktop 3-col, mobile horizontal scroll */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="hidden md:grid md:grid-cols-3 gap-6"
        >
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              inView={gridInView}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-webkit-overflow-scrolling:touch]">
          {reviews.map((review) => (
            <div key={review.id} className="snap-start flex-shrink-0 w-[85vw] max-w-sm">
              <ReviewCard review={review} inView={true} delay={0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({
  review,
  inView,
  delay,
}: {
  review: (typeof reviews)[number];
  inView: boolean;
  delay: number;
}) {
  return (
    <div
      className="relative bg-brand-gold/[0.02] border border-brand-gold/12 p-8 rounded-sm hover:border-brand-gold/30 hover:bg-brand-gold/[0.04] transition-all duration-350 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.98)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {/* Decorative quotation mark */}
      <span
        className="absolute top-4 right-6 font-serif text-7xl text-brand-gold/15 select-none leading-none group-hover:text-brand-gold/25 transition-colors duration-300"
        aria-hidden="true"
      >
        "
      </span>

      {/* Review text */}
      <blockquote className="relative font-sans text-brand-white/80 text-base leading-relaxed mb-8">
        "{review.text}"
      </blockquote>

      {/* Attribution */}
      <div className="border-t border-brand-gold/12 pt-4">
        <p className="font-sans text-sm font-medium text-brand-white">{review.author}</p>
        <p className="font-sans text-xs text-brand-muted mt-0.5 tracking-wide">{review.location}</p>
      </div>
    </div>
  );
}
