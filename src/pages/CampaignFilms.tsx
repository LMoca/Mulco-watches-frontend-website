import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface VideoItem {
  id: string;
  title: string;
  label: string;
  description: string;
  featured?: boolean;
}

const VIDEOS: VideoItem[] = [
  {
    id: '-ASmyO70s6g',
    title: 'The New Buzo Collection',
    label: 'Collection Film',
    description:
      'Dive deeper. The Buzo collection was built for those who move through life at full speed — equal parts precision engineering and unmistakable boldness.',
    featured: true,
  },
  {
    id: 'CRS2q9chXkg',
    title: 'Campaign Film',
    label: 'Brand Campaign',
    description:
      'A visual manifesto for the MULCO spirit — bold, precise, and always distinct. Shot across Miami and beyond.',
  },
  {
    id: 'Yp-FUcrB92M',
    title: 'MULCO at the Grammys',
    label: 'Press & Events',
    description:
      'As an official Grammy Awards sponsor, MULCO joined music\'s biggest night — timepieces worn by artists and tastemakers on the red carpet.',
  },
];

function VideoTile({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="group">
      {/* Video frame */}
      <div className="relative aspect-video overflow-hidden bg-brand-black">
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
              style={{ transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors duration-300" />

            {/* Label badge */}
            <div className="absolute top-4 left-4">
              <span className="text-[9px] font-sans font-semibold tracking-[0.25em] uppercase bg-brand-gold text-brand-black px-2.5 py-1">
                {video.label}
              </span>
            </div>

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
            >
              <div className="w-16 h-16 rounded-full border-2 border-brand-white/80 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                <Play
                  size={22}
                  className="text-brand-white group-hover:text-brand-gold ml-1 transition-colors duration-300"
                  fill="currentColor"
                />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="pt-4 pb-1">
        <p className="text-[9px] font-sans tracking-[0.25em] uppercase text-brand-gold mb-1">{video.label}</p>
        <h3 className="font-serif text-xl text-brand-white mb-2">{video.title}</h3>
        <p className="font-sans text-sm text-brand-muted leading-relaxed">{video.description}</p>
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
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
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
      <div className="border-b border-brand-gold/10 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[10px] font-sans text-brand-muted mb-6">
            <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">Campaign Films</span>
          </nav>
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">On Screen</p>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-white">Campaign Films &amp; Stories</h1>
          <div className="w-10 h-px bg-brand-gold mt-5" />
          <p className="font-sans text-sm text-brand-muted mt-4 max-w-xl leading-relaxed">
            MULCO on camera — collection debuts, brand campaigns, and live events. Every film is a window into the world the watches are made for.
          </p>
        </div>
      </div>

      {/* Featured film */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 pt-14 pb-10">
        <FadeIn>
          <VideoTile video={featured} />
        </FadeIn>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-px bg-brand-gold/10" />
      </div>

      {/* Secondary films */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {secondary.map((video, i) => (
            <FadeIn key={video.id} delay={i * 100}>
              <VideoTile video={video} />
            </FadeIn>
          ))}
        </div>
      </div>

    </div>
  );
}
