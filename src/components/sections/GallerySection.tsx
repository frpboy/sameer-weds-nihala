import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import { content } from '../../content';

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', caption: 'Sacred Vows' },
    { id: 2, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop', caption: 'Blessed Union' },
    { id: 3, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', caption: 'Cherished Moments' },
    { id: 4, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', caption: 'Elegant Attire' },
    { id: 5, url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop', caption: 'Together Forever' },
    { id: 6, url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop', caption: 'Endless Love' },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, photos.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const activePhoto = photos[currentIndex];

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
                src={activePhoto.url}
                alt={activePhoto.caption}
                loading={activePhoto.id === 1 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />

              {/* Warm tone layer & light leaks */}
              <div className="absolute inset-0 bg-amber-950/20 mix-blend-color-burn pointer-events-none" />
              <div className="absolute -top-16 -left-16 w-56 h-56 bg-amber-500/25 rounded-full blur-[50px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-primary/25 rounded-full blur-[50px] pointer-events-none animate-pulse" />
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
