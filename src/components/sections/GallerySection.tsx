import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import { content } from '../../content';

const RESPONSIVE_SUFFIX = /-\d{3,4}\.(webp|jpe?g|png)$/i;

const pickResponsiveImage = (src: string, viewportWidth: number, dpr: number) => {
  const match = src.match(/^(.*)\.(webp|jpe?g|png)$/i);
  if (!match) return src;
  const [, base, ext] = match;
  const target = viewportWidth * dpr;
  const width = target <= 700 ? 640 : target <= 1100 ? 960 : 1280;
  return `${base}-${width}.${ext}`;
};

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));

  const imageFiles = import.meta.glob('/public/images/*.{webp,jpg,jpeg,png}');
  const defaultCaptions = [
    'Sacred Vows',
    'Blessed Union',
    'Cherished Moments',
    'Elegant Attire',
    'Together Forever',
    'Endless Love',
    'Captured Grace',
    'Eternal Promise',
    'Joyful Heart',
    'Pure Bliss',
  ];

  const photos = Object.keys(imageFiles)
    .filter((path) => !RESPONSIVE_SUFFIX.test(path))
    .map((path, index) => ({
    id: index + 1,
    url: path.replace('/public', ''),
    caption: defaultCaptions[index % defaultCaptions.length],
  }));

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, photos.length]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const activePhoto = photos[currentIndex];
  const activePhotoUrl = activePhoto
    ? pickResponsiveImage(activePhoto.url, viewportWidth, typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1)
    : '';

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <SectionContainer id="gallery" className="relative z-10">
      <SectionTitle title={content.gallery.sectionTitle} subtitle={content.gallery.sectionSubtitle} />

      <div className="max-w-4xl mx-auto px-4 relative flex flex-col items-center">
        <div
          className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-secondary flex items-center justify-center select-none group cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            if (x < rect.width / 3) handlePrev();
            else if (x > (rect.width * 2) / 3) handleNext();
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activePhoto.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 overflow-hidden touch-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleNext();
                if (info.offset.x > 50) handlePrev();
              }}
            >
              {/* Image with subtle zoom drift */}
              <motion.img
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                src={activePhotoUrl}
                alt={activePhoto.caption}
                loading={activePhoto.id === 1 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />

              {/* Natural image container with no color-burn filters to prevent Safari yellow-grading bugs */}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Jump to photo ${index + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'w-6 h-1.5 bg-primary shadow-sm shadow-primary/50' : 'w-1.5 h-1.5 bg-primary/40 hover:bg-primary/80'}`}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
