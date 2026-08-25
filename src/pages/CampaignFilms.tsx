import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import Eyebrow from '../components/Eyebrow';

interface VideoItem {
  id: string;
  title: string;
  label: string;
  description: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: '-ASmyO70s6g',
    title: 'The New Buzo Collection',
    label: 'Collection Film',
    description: 'Dive deeper. The Buzo collection was built for those who move through life at full speed — equal parts precision engineering and unmistakable boldness.',
  },
  {
    id: 'CRS2q9chXkg',
    title: 'Campaign Film',
    label: 'Brand Campaign',
    description: 'A visual manifesto for the MULCO spirit — bold, precise, and always distinct. Shot across Miami and beyond.',
  },
  {
    id: 'Yp-FUcrB92M',
    title: 'MULCO at the Grammys',
    label: 'Press & Events',
    description: "As an official Grammy Awards sponsor, MULCO joined music's biggest night — timepieces worn by artists and tastemakers on the red carpet.",
  },
];

interface VideoTileProps {
  video: VideoItem;
  height: string;
}

function VideoTile({ video, height }: VideoTileProps) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="group">
      {/* Video frame */}
      <div className="relative overflow-hidden bg-brand-black" style={{ height }}>
        {playing ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <>
            <img
              src={thumbUrl}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{
                transform: 'scale(1)',
                transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div className="absolute inset-0 bg-brand-black/45 group-hover:bg-brand-black/30 transition-colors duration-[400ms]" />

            {/* Label — text only, no fill */}
            <div className="absolute top-6 left-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold">
                {video.label}
              </span>
            </div>

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
            >
              <div
                className="w-16 h-16 rounded-full border border-brand-white/50 flex items-center justify-center group-hover:border-brand-gold transition-colors duration-[400ms]"
                style={{ transition: 'border-color 0.4s ease, background-color 0.4s ease' }}
              >
                <Play
                  size={20}
                  className="text-brand-white group-hover:text-brand-gold ml-1 transition-colors duration-[400ms]"
                  fill="currentColor"
                />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Caption — Cormorant italic 18px */}
      <div className="pt-5 pb-1">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-brand-gold mb-2">{video.label}</p>
        <h3 className="font-serif italic text-[1.125rem] text-brand-white mb-3 leading-snug">{video.title}</h3>
        <p className="font-sans text-[14px] text-brand-muted leading-[1.7]">{video.description}</p>
      </div>
    </div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function CampaignFilms() {
  const [featured, ...secondary] = VIDEOS;

  return (
    <div className="min-h-screen bg-brand-black pt-[72px]">

      {/* Page header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 pt-16 pb-10">
        <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-8">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
          <ChevronRight size={10} className="opacity-40" />
          <span className="text-brand-white">Campaign Films</span>
        </nav>
        <Eyebrow text="On Screen" className="mb-4" />
        <h1 className="font-serif text-[3rem] md:text-[4rem] text-brand-white leading-[0.95] tracking-[-0.02em]">Campaign Films &amp; Stories</h1>
        <p className="font-sans text-[14px] text-brand-muted mt-5 max-w-xl leading-[1.7]">
          MULCO on camera — collection debuts, brand campaigns, and live events. Every film is a window into the world the watches are made for.
        </p>
      </div>

      {/* Featured film — 80vh */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 pb-16">
        <FadeIn>
          <VideoTile video={featured} height="80vh" />
        </FadeIn>
      </div>

      {/* Hairline divider */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24">
        <div className="h-px bg-brand-gold/10" />
      </div>

      {/* Secondary films — 50vh each, 2-column */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 lg:px-24 py-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {secondary.map((video, i) => (
            <FadeIn key={video.id} delay={i * 120}>
              <VideoTile video={video} height="50vh" />
            </FadeIn>
          ))}
        </div>
      </div>

    </div>
  );
}
