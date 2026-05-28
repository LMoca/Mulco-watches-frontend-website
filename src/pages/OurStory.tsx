import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

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
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
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
  { label: 'Swiss Precision', body: 'Every movement is sourced or assembled in Switzerland. Accuracy is not a marketing claim — it is the foundation everything else is built upon.' },
  { label: 'Fashion-Forward Design', body: 'We collaborate with designers, not just engineers. The result is a watch that earns its place whether you are boarding a yacht or a runway.' },
  { label: 'Material Innovation', body: 'From ion-plated steel to high-gloss ceramics, Swarovski crystal indices to mother of pearl dials — we push the limits of what a watch can be made of.' },
  { label: 'The Bold Community', body: 'MULCO is worn by people who move with intention. Our community does not follow trends — they establish them.' },
];

export default function OurStory() {
  return (
    <div className="min-h-screen bg-brand-black">

      {/* Hero */}
      <div className="relative h-[92vh] flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="MULCO editorial campaign"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/10" />
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 pb-20">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-5">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Our Story</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-gold mb-3">Est. 1958 — Zurich, Switzerland</p>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-brand-white leading-none max-w-3xl">
            Bold by<br />Design.
          </h1>
        </div>
      </div>

      {/* Opening statement */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <FadeSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-4">Since 1958</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-white leading-tight mb-6">
                Where Swiss Craft Meets the Boldness of Fashion
              </h2>
              <div className="w-10 h-px bg-brand-gold mb-8" />
              <div className="space-y-5 text-brand-muted font-sans text-sm leading-relaxed">
                <p>MULCO was born in a Zurich workshop in 1958, when watchmaker Ernst Muller began supplying precision movements to the Swiss industry's most established names. The work was invisible — but the craft was undeniable.</p>
                <p>For decades, MULCO remained a specialist's name: respected in the trade, unknown to the public. That changed when Jennifer Muller inherited the company in 1993 and chose disruption over tradition.</p>
                <p>Jennifer's conviction was simple and radical: Swiss precision didn't have to be invisible. It could be worn boldly. It could lead with colour, provoke with form, and still keep perfect time.</p>
              </div>
            </div>
            <div className="relative">
              <img src={WOMEN_IMG} alt="MULCO women's collection" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </FadeSection>
      </div>

      {/* Timeline */}
      <div className="bg-brand-navy/20 border-y border-brand-gold/10 py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <div className="text-center mb-20">
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">Our Journey</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-white">Six Decades of Bold</h2>
              <div className="w-10 h-px bg-brand-gold mx-auto mt-5" />
            </div>
          </FadeSection>
          <div className="relative border-l border-brand-gold/20 ml-4 md:ml-8 pl-8 md:pl-16 space-y-14">
            {milestones.map((m, i) => (
              <FadeSection key={m.year} delay={i * 80}>
                <div className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[2.625rem] md:-left-[4.625rem] top-1 w-3 h-3 rounded-full bg-brand-gold border-2 border-brand-black ring-1 ring-brand-gold/40" />
                  <span className="font-serif text-4xl text-brand-gold/15 leading-none block">{m.year}</span>
                  <h3 className="font-serif text-xl text-brand-white mt-0.5 mb-3">{m.title}</h3>
                  <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-lg">{m.body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* Jennifer Muller feature */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <FadeSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={GREEN_IMG} alt="MULCO Enchanted collection" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent pointer-events-none" />
              <blockquote className="absolute bottom-6 left-6 right-6 border-l-2 border-brand-gold pl-4">
                <p className="font-serif text-lg text-brand-white italic leading-snug drop-shadow-lg">"Swiss precision should be seen, not hidden. It should be worn with conviction."</p>
                <cite className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold mt-2 block not-italic">— Jennifer Muller, Creative Director</cite>
              </blockquote>
            </div>
            <div>
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-4">The Visionary</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-white leading-tight mb-6">Jennifer Muller Changed Everything</h2>
              <div className="w-10 h-px bg-brand-gold mb-8" />
              <div className="space-y-5 text-brand-muted font-sans text-sm leading-relaxed">
                <p>When Jennifer took the reins in 1993, MULCO was a respected but anonymous brand. The watches were precise; the packaging was beige. The industry expected more of the same.</p>
                <p>She disagreed. Jennifer flew to Milan, spent a season observing runway collections, then returned to Zurich with something no Swiss watchmaker had attempted: a brief that fused high-fashion colour theory with precision engineering.</p>
                <p>Mother of pearl dials sourced from Tahiti. Swarovski crystal indices hand-set by watchmakers. High-gloss ceramic bracelets. Bold silicone straps in colours that matched a couture palette. The Blue Marine collection launched in 2004 and sold out in weeks.</p>
              </div>
            </div>
          </div>
        </FadeSection>
      </div>

      {/* Values */}
      <div className="border-t border-brand-gold/10 bg-gradient-to-b from-brand-navy/10 to-brand-black py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">What We Stand For</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-white">Our Values</h2>
              <div className="w-10 h-px bg-brand-gold mx-auto mt-5" />
            </div>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-gold/8">
            {values.map((v, i) => (
              <FadeSection key={v.label} delay={i * 100}>
                <div className="bg-brand-black p-10 group hover:bg-white/[0.02] transition-colors duration-300 h-full">
                  <span className="font-serif text-5xl text-brand-gold/10 leading-none block">0{i + 1}</span>
                  <h3 className="font-serif text-xl text-brand-white mt-1 mb-4 group-hover:text-brand-gold transition-colors duration-200">{v.label}</h3>
                  <p className="font-sans text-sm text-brand-muted leading-relaxed">{v.body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* Miami Flagship */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <FadeSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-4">Americas Home</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-white leading-tight mb-6">The Miami Flagship</h2>
              <div className="w-10 h-px bg-brand-gold mb-8" />
              <div className="space-y-5 text-brand-muted font-sans text-sm leading-relaxed">
                <p>In 2012, MULCO opened its Western Hemisphere flagship in Aventura, Florida — a city that mirrors the brand's DNA: Latin warmth, international sophistication, and an appetite for the exceptional.</p>
                <p>The Aventura service center houses MULCO's certified technicians and provides everything from battery replacements to complete movement overhauls. Every timepiece is treated with the same precision with which it was made.</p>
              </div>
              <address className="not-italic mt-8 border border-brand-gold/15 p-6 bg-brand-gold/[0.02]">
                <p className="text-[10px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-3">Find Us</p>
                <p className="font-sans text-sm text-brand-white">19790 W Dixie Hwy, Suite 201</p>
                <p className="font-sans text-sm text-brand-white">Aventura, FL 33180</p>
                <p className="font-sans text-sm text-brand-muted mt-2">Mon – Sat · 10 AM – 6 PM EST</p>
              </address>
              <Link to="/support" className="inline-flex items-center gap-2 mt-6 text-[10px] font-sans tracking-[0.2em] uppercase text-brand-gold border-b border-brand-gold/40 pb-0.5 hover:border-brand-gold transition-colors duration-200">
                Get in Touch <ArrowRight size={10} />
              </Link>
            </div>
            <div className="relative">
              <img src={MEN_IMG} alt="MULCO men's collection" className="w-full aspect-[4/5] object-cover" loading="lazy" decoding="async" />
            </div>
          </div>
        </FadeSection>
      </div>

      {/* CTA */}
      <div className="relative py-28 overflow-hidden">
        <img src={HERO_IMG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-brand-black/50" />
        <FadeSection>
          <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
            <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-gold mb-4">Wear the Story</p>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-white mb-6 leading-tight">Discover the Collections</h2>
            <p className="font-sans text-sm text-brand-muted mb-10 max-w-md mx-auto leading-relaxed">
              Over sixty years of bold decisions, expressed in steel, crystal, and movement. Find the timepiece that carries your story forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/collections" className="inline-flex items-center gap-2 bg-brand-gold text-brand-black text-xs font-sans font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-brand-white transition-colors duration-200">
                Explore Collections <ArrowRight size={13} />
              </Link>
              <Link to="/support" className="inline-flex items-center gap-2 border border-brand-gold/30 text-brand-white text-xs font-sans tracking-[0.2em] uppercase px-10 py-4 hover:border-brand-gold hover:text-brand-gold transition-colors duration-200">
                Contact Us
              </Link>
            </div>
          </div>
        </FadeSection>
      </div>

    </div>
  );
}
