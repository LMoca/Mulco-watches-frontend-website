import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import Eyebrow from '../components/Eyebrow';

const HERO_IMG = '/images/ui/Banners_mega_menu_hombre_2.jpg';
const WOMEN_IMG = '/images/ui/Banners_mega_menu_mujer_1.jpg';
const MEN_IMG = '/images/ui/Banners_mega_menu_hombre_1.jpg';
const GREEN_IMG = '/images/ui/Banners_Mega_menu_1_version_quartz_verde.jpg';

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const milestones = [
  { year: '1958', title: 'The Beginning', body: 'Founded in Zurich by Ernst Muller, MULCO began as a movement specialist supplying precision components to established Swiss houses. The craft was everything — invisible inside other people\'s timepieces, but undeniable.' },
  { year: '1974', title: 'The First Collection', body: 'The first watches bearing the MULCO name emerged — clean, unadorned, built to last a lifetime. Worn by professionals, gifted between generations.' },
  { year: '1993', title: "Jennifer Muller's Vision", body: "Jennifer Muller, granddaughter of the founder, took the helm and shattered convention. She fused Swiss engineering with runway sensibility, transforming MULCO into fashion's boldest timepiece brand." },
  { year: '2004', title: 'Blue Marine Era', body: 'The Blue Marine collection launched globally, putting MULCO on the wrists of tastemakers from Miami to Madrid. Mother of pearl dials, Swarovski indices, and bold silicone straps defined a new category.' },
  { year: '2012', title: 'Americas Expansion', body: 'The Miami flagship opened in Aventura — a permanent home in the Western Hemisphere, where Latin culture meets Swiss heritage.' },
  { year: 'Now', title: 'The Bold Community', body: 'Today MULCO serves a global community who refuse to be ordinary. Each collection is a statement. Each watch, a declaration.' },
];

const values = [
  { label: 'Swiss Precision', body: 'Every movement is sourced or assembled in Switzerland. Accuracy is the foundation everything else is built upon.' },
  { label: 'Fashion-Forward Design', body: 'We collaborate with designers, not just engineers. The result is a watch that earns its place whether you are boarding a yacht or a runway.' },
  { label: 'Material Innovation', body: 'From ion-plated steel to high-gloss ceramics, Swarovski crystal indices to mother of pearl dials — we push the limits of what a watch can be made of.' },
  { label: 'The Bold Community', body: 'MULCO is worn by people who move with intention. Our community does not follow trends — they establish them.' },
];

function HorizontalTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollOrigin, setScrollOrigin] = useState(0);

  function onMouseDown(e: React.MouseEvent) {
    if (!scrollRef.current) return;
    setDragging(true);
    setStartX(e.clientX);
    setScrollOrigin(scrollRef.current.scrollLeft);
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging || !scrollRef.current) return;
    scrollRef.current.scrollLeft = scrollOrigin - (e.clientX - startX);
  }
  function onMouseUp() { setDragging(false); }

  function scroll(dir: 'prev' | 'next') {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'next' ? 400 : -400, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      {/* Nav arrows */}
      <div className="flex items-center justify-between px-6 md:px-14 lg:px-24 mb-8">
        <FadeSection>
          <div className="flex flex-col gap-1">
            <Eyebrow text="Our Journey" />
            <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-brand-white leading-none tracking-[-0.02em]">
              Six Decades of Bold
            </h2>
          </div>
        </FadeSection>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => scroll('prev')}
            aria-label="Previous milestone"
            className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center text-brand-gold/60 hover:text-brand-gold hover:border-brand-gold transition-colors duration-[400ms] font-sans text-sm"
          >
            ←
          </button>
          <button
            onClick={() => scroll('next')}
            aria-label="Next milestone"
            className="w-10 h-10 border border-brand-gold/30 flex items-center justify-center text-brand-gold/60 hover:text-brand-gold hover:border-brand-gold transition-colors duration-[400ms] font-sans text-sm"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="flex border-t border-brand-gold/12" style={{ width: 'max-content' }}>
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="w-[340px] md:w-[400px] flex-shrink-0 px-8 py-10 border-r border-brand-gold/12"
              style={{ scrollSnapAlign: 'start' }}
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4">Milestone</p>
              <p className="font-serif text-[4rem] text-brand-white/10 leading-none mb-3">{m.year}</p>
              <h3 className="font-serif text-xl text-brand-white mb-4">{m.title}</h3>
              <p className="font-sans text-[14px] text-brand-muted leading-[1.7] max-w-[320px]">{m.body}</p>
              <div className="mt-6 w-6 h-px bg-brand-gold/40" />
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold/50 mt-2">0{i + 1} / 06</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OurStory() {
  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero — 92vh, Cormorant 120px+ headline */}
      <div className="relative h-[92vh] flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="MULCO editorial campaign"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/10" />
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-14 lg:px-24 pb-20">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-5">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Our Story</span>
          </nav>
          <Eyebrow text="Est. 1958 — Zurich, Switzerland" className="mb-4" />
          <h1 className="font-serif text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[9rem] text-brand-white leading-[0.9] tracking-[-0.02em]">
            Bold by<br />Design.
          </h1>
        </div>
      </div>

      {/* Opening statement */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-28 md:py-36">
        <FadeSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <Eyebrow text="Since 1958" className="mb-5" />
              <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-brand-white leading-[0.95] tracking-[-0.02em] mb-6">
                Where Swiss Craft Meets the Boldness of Fashion
              </h2>
              <div className="w-10 h-px bg-brand-gold mb-8" />
              <div className="space-y-5 text-brand-muted font-sans text-[14px] leading-[1.7]">
                <p>MULCO was born in a Zurich workshop in 1958, when watchmaker Ernst Muller began supplying precision movements to the Swiss industry's most established names. The work was invisible — but the craft was undeniable.</p>
                <p>For decades, MULCO remained a specialist's name: respected in the trade, unknown to the public. That changed when Jennifer Muller inherited the company in 1993 and chose disruption over tradition.</p>
                <p>Jennifer's conviction was simple and radical: Swiss precision didn't have to be invisible. It could be worn boldly. It could lead with colour, provoke with form, and still keep perfect time.</p>
              </div>
            </div>
            <div>
              <img src={WOMEN_IMG} alt="MULCO women's collection" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </FadeSection>
      </div>

      {/* Horizontal Timeline */}
      <div className="border-y border-brand-gold/10 py-20 md:py-24 bg-brand-navy/10">
        <HorizontalTimeline />
      </div>

      {/* Jennifer Muller feature */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-28 md:py-36">
        <FadeSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <img src={GREEN_IMG} alt="MULCO Enchanted collection" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent pointer-events-none" />
              <blockquote className="absolute bottom-6 left-6 right-6 border-l border-brand-gold pl-5">
                <p className="font-serif text-lg italic text-brand-white leading-snug">"Swiss precision should be seen, not hidden. It should be worn with conviction."</p>
                <cite className="font-sans text-[10px] tracking-[0.2em] uppercase text-brand-gold mt-3 block not-italic">— Jennifer Muller, Creative Director</cite>
              </blockquote>
            </div>
            <div>
              <Eyebrow text="The Visionary" className="mb-5" />
              <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-brand-white leading-[0.95] tracking-[-0.02em] mb-6">Jennifer Muller Changed Everything</h2>
              <div className="w-10 h-px bg-brand-gold mb-8" />
              <div className="space-y-5 text-brand-muted font-sans text-[14px] leading-[1.7]">
                <p>When Jennifer took the reins in 1993, MULCO was a respected but anonymous brand. The watches were precise; the packaging was beige. The industry expected more of the same.</p>
                <p>She disagreed. Jennifer flew to Milan, spent a season observing runway collections, then returned to Zurich with something no Swiss watchmaker had attempted: a brief that fused high-fashion colour theory with precision engineering.</p>
                <p>Mother of pearl dials sourced from Tahiti. Swarovski crystal indices hand-set by watchmakers. High-gloss ceramic bracelets. Bold silicone straps in colours that matched a couture palette. The Blue Marine collection launched in 2004 and sold out in weeks.</p>
              </div>
            </div>
          </div>
        </FadeSection>
      </div>

      {/* Values — 4 columns */}
      <div className="border-t border-brand-gold/10 py-28 md:py-36 px-6 md:px-14 lg:px-24">
        <div className="max-w-[1440px] mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <Eyebrow text="What We Stand For" className="mb-4 justify-center" />
              <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-brand-white leading-none tracking-[-0.02em]">Our Values</h2>
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-gold/8">
            {values.map((v, i) => (
              <FadeSection key={v.label} delay={i * 80}>
                <div className="bg-brand-black p-10 group hover:bg-white/[0.02] transition-colors duration-[400ms] h-full">
                  <span className="font-serif text-5xl text-brand-gold/10 leading-none block">0{i + 1}</span>
                  <h3 className="font-serif text-xl text-brand-white mt-2 mb-4 group-hover:text-brand-gold transition-colors duration-[400ms]">{v.label}</h3>
                  <p className="font-sans text-[14px] text-brand-muted leading-[1.7]">{v.body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* Miami Flagship */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-28 md:py-36">
        <FadeSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <Eyebrow text="Americas Home" className="mb-5" />
              <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] text-brand-white leading-[0.95] tracking-[-0.02em] mb-6">The Miami Flagship</h2>
              <div className="w-10 h-px bg-brand-gold mb-8" />
              <div className="space-y-5 text-brand-muted font-sans text-[14px] leading-[1.7]">
                <p>In 2012, MULCO opened its Western Hemisphere flagship in Aventura, Florida — a city that mirrors the brand's DNA: Latin warmth, international sophistication, and an appetite for the exceptional.</p>
                <p>The Aventura service center houses MULCO's certified technicians and provides everything from battery replacements to complete movement overhauls. Every timepiece is treated with the same precision with which it was made.</p>
              </div>
              <address className="not-italic mt-8 space-y-1 border-t border-brand-gold/12 pt-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold mb-3">Find Us</p>
                <p className="font-sans text-[14px] text-brand-white">19790 W Dixie Hwy, Suite 201</p>
                <p className="font-sans text-[14px] text-brand-white">Aventura, FL 33180</p>
                <p className="font-sans text-[14px] text-brand-muted mt-1">Mon – Sat · 10 AM – 6 PM EST</p>
              </address>
              <Link
                to="/support"
                className="group relative inline-flex items-center gap-2 mt-7 font-sans text-[11px] uppercase tracking-[0.2em] text-brand-gold"
              >
                <span className="relative">
                  Get in Touch
                  <span className="absolute bottom-0 left-0 w-full h-px bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms]" />
                </span>
                <ArrowRight size={10} />
              </Link>
            </div>
            <div>
              <img src={MEN_IMG} alt="MULCO men's collection" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </FadeSection>
      </div>

      {/* CTA */}
      <div className="relative py-32 overflow-hidden">
        <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/50" />
        <FadeSection>
          <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
            <Eyebrow text="Wear the Story" className="mb-5 justify-center" />
            <h2 className="font-serif text-[3rem] md:text-[4rem] text-brand-white mb-6 leading-[0.95] tracking-[-0.02em]">Discover the Collections</h2>
            <p className="font-sans text-[14px] text-brand-muted mb-10 max-w-md mx-auto leading-[1.7]">
              Over sixty years of bold decisions, expressed in steel, crystal, and movement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2.5 bg-brand-gold text-brand-black text-[13px] font-sans font-semibold tracking-[0.15em] uppercase px-10 h-14 hover:bg-brand-white transition-colors duration-300"
              >
                Explore Collections <ArrowRight size={13} />
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-white text-[13px] font-sans tracking-[0.15em] uppercase px-10 h-14 hover:border-brand-gold hover:text-brand-gold transition-colors duration-[400ms]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </FadeSection>
      </div>

    </div>
  );
}
