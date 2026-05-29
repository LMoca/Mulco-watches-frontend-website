import { useState } from 'react';
import { Play } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

interface VideoItem {
  id: string;
  title: string;
  label: string;
  featured?: boolean;
}

const VIDEOS: VideoItem[] = [
  {
    id: '-ASmyO70s6g',
    title: 'The New Buzo Collection',
    label: 'Collection Film',
    featured: true,
  },
  {
    id: 'CRS2q9chXkg',
    title: 'Campaign Film',
    label: 'Brand Campaign',
  },
  {
    id: 'Yp-FUcrB92M',
    title: 'MULCO at the Grammys',
    label: 'Press & Events',
  },
];

function VideoTile({ video, className = '' }: { video: VideoItem; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const thumbUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className={`relative overflow-hidden bg-brand-black group ${className}`}>
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
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/25 transition-colors duration-300" />
          {/* Label */}
          <div className="absolute top-4 left-4">
            <span className="text-[9px] font-sans font-semibold tracking-[0.25em] uppercase bg-brand-gold text-brand-black px-2 py-1">
              {video.label}
            </span>
          </div>
          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 focus:outline-none"
          >
            <div className="w-14 h-14 rounded-full border-2 border-brand-white/80 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
              <Play size={20} className="text-brand-white group-hover:text-brand-gold ml-0.5 transition-colors duration-300" fill="currentColor" />
            </div>
            <span className="font-serif text-brand-white text-sm md:text-base drop-shadow-lg group-hover:text-brand-gold transition-colors duration-200 px-4 text-center">
              {video.title}
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export default function VideoSection() {
  const { ref: headRef, inView: headInView } = useInView(0.2);
  const { ref: gridRef, inView: gridInView } = useInView(0.1);

  const [featured, ...secondary] = VIDEOS;

  return (
    <section className="bg-brand-black border-t border-brand-gold/8 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-10"
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-gold mb-3">On Screen</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-white">Campaign Films &amp; Stories</h2>
          <div className="w-10 h-px bg-brand-gold mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-3 gap-3"
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 100ms',
          }}
        >
          {/* Featured — spans 2 cols on desktop */}
          <div className="lg:col-span-2 aspect-video relative">
            <VideoTile video={featured} className="absolute inset-0" />
          </div>

          {/* Secondary stack */}
          <div className="flex flex-col gap-3">
            {secondary.map((v) => (
              <div key={v.id} className="aspect-video relative flex-1">
                <VideoTile video={v} className="absolute inset-0" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
