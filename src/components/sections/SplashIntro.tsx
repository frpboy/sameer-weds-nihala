import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from '../common/PrimaryButton';
import { weddingData } from '../../config/weddingData';

interface SplashIntroProps {
  onEnter: () => void;
}

export default function SplashIntro({ onEnter }: SplashIntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = isOpen ? 'unset' : 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-secondary px-6 text-center select-none overflow-hidden"
        >
          {/* Subtle geometric background overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] border-[2px] border-primary rotate-45 rounded-[100px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 max-w-lg mx-auto flex flex-col items-center"
          >
            {/* Bismillah Calligraphy / Text */}
            <span className="font-cormorant italic text-lg md:text-xl text-primary mb-6 tracking-wide">
              ﷽
            </span>
            <p className="font-cormorant italic text-base md:text-lg text-accent/80 mb-10 tracking-wider">
              "In the name of Allah, the Most Gracious, the Most Merciful"
            </p>

            {/* Monogram / Envelope graphic */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary/40 flex items-center justify-center mb-8 bg-secondary/80 shadow-inner">
              <span className="font-cinzel text-2xl md:text-3xl text-primary font-semibold tracking-tighter">
                {weddingData.monogram}
              </span>
            </div>

            <h1 className="font-cinzel text-2xl md:text-4xl text-accent font-medium mb-3 tracking-wide max-w-md leading-tight">
              <span className="block">{weddingData.groom.fullName}</span>
              <span className="block font-cormorant italic text-primary text-xl md:text-2xl my-1 font-light">&</span>
              <span className="block">{weddingData.bride.fullName}</span>
            </h1>
            <p className="font-poppins uppercase text-xs md:text-sm tracking-[0.25em] text-primary mb-12 font-medium">
              Wedding Celebration
            </p>

            <PrimaryButton
              variant="solid"
              size="lg"
              onClick={handleOpen}
              className="min-w-[200px] shadow-lg shadow-primary/20 hover:shadow-xl"
            >
              Enter Invitation
            </PrimaryButton>
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
            <p className="font-poppins text-[10px] tracking-widest text-accent/50 uppercase">
              Optimized for mobile viewing
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
