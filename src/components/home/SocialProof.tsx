import { useInView } from '../../hooks/useInView';
import Eyebrow from '../Eyebrow';

const reviews = [
  {
    id: 1,
    text: 'I get countless compliments on my Blue Marine Medusa. The quality is outstanding — it feels and looks far more expensive than it is.',
    author: 'Maria R.',
    location: 'Miami, FL',
    stars: 5,
  },
  {
    id: 2,
    text: 'Arrived right on time, packaged beautifully. Looks exactly like the photos — even better in person. The Buzo Dive is built like a tank.',
    author: 'James K.',
    location: 'New York, NY',
    stars: 5,
  },
  {
    id: 3,
    text: 'This is my third Mulco — each one more exclusive than the last. The COBRA is my favorite. Heads turn everywhere I wear it.',
    author: 'Sofia L.',
    location: 'San Juan, PR',
    stars: 5,
  },
];

function StarFilled() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#C9A84C" aria-hidden="true">
      <polygon points="7,1 8.8,5.4 13.5,5.4 9.8,8.5 11.2,13 7,10.3 2.8,13 4.2,8.5 0.5,5.4 5.2,5.4" />
    </svg>
  );
}

function QuoteBlock({ review, index }: { review: typeof reviews[number]; index: number }) {
  const { ref, inView } = useInView(0.15);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative py-16 md:py-20 border-t border-brand-gold/12"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
      }}
    >
      {/* Decorative quotation mark */}
      <span
        className="absolute top-8 left-0 font-serif leading-none select-none pointer-events-none text-brand-gold"
        style={{ fontSize: '200px', opacity: 0.06 }}
        aria-hidden="true"
      >
        "
      </span>

      <div className="relative max-w-3xl">
        <blockquote className="font-serif italic text-[1.5rem] md:text-[2rem] text-brand-white/90 leading-[1.4] mb-6">
          "{review.text}"
        </blockquote>
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">
          {review.author} · {review.location}
        </p>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);

  return (
    <section className="bg-brand-navy py-28 md:py-40 lg:py-52 px-6 md:px-14 lg:px-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Aggregate rating strip — at top */}
        <div
          className="flex items-center gap-3 mb-14 md:mb-20"
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="flex gap-0.5" aria-label="4.9 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => <StarFilled key={i} />)}
          </div>
          <span className="font-serif text-brand-white/80">4.9</span>
          <span className="text-brand-gold/30 text-sm">·</span>
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-brand-muted">800+ Verified Reviews</span>
        </div>

        {/* Section heading */}
        <div
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <Eyebrow text="Customer Stories" />
          <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] text-brand-white mt-3 leading-[0.95] tracking-[-0.02em] mb-4">
            Voices of the Bold
          </h2>
          <div className="w-10 h-px bg-brand-gold" />
        </div>

        {/* Sequential full-width quotes */}
        <div className="mt-4">
          {reviews.map((review, index) => (
            <QuoteBlock key={review.id} review={review} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
