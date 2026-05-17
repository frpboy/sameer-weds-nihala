import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../../config/weddingData';
import { FADE_UP, STAGGER_CONTAINER, SCALE_UP } from '../../constants/animations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HeroContent() {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(weddingData.wedding.date));

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(weddingData.wedding.date) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-20 pb-16">
      {/* Top ornamental accent */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="w-16 h-px bg-primary/40" />
        <div className="w-2.5 h-2.5 rotate-45 bg-primary mx-4" />
        <div className="w-16 h-px bg-primary/40" />
      </motion.div>

      {/* Subtitle / Invitation intro */}
      <motion.span
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="font-poppins uppercase tracking-[0.3em] text-xs md:text-sm text-primary mb-6 font-medium"
      >
        We Joyfully Invite You To Celebrate
      </motion.span>

      {/* Couple Names */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-accent font-medium my-4 tracking-wide leading-tight max-w-4xl"
      >
        {weddingData.groom.shortName}
        <span className="block font-cormorant italic text-primary text-4xl md:text-6xl my-2 font-light">
          &
        </span>
        {weddingData.bride.shortName}
      </motion.h1>

      {/* Wedding Date */}
      <motion.p
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="font-cormorant text-xl md:text-2xl text-text font-medium mt-6 mb-10 tracking-wider"
      >
        {formattedDate}
      </motion.p>

      {/* Embedded Countdown Timer */}
      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto mb-16 px-2 w-full"
      >
        {timeUnits.map((unit) => (
          <motion.div key={unit.label} variants={SCALE_UP}>
            <div className="flex flex-col items-center justify-center p-3.5 md:p-5 rounded-xl border border-primary/40 bg-secondary/80 backdrop-blur-sm text-center shadow-sm">
              <span className="font-cinzel text-2xl md:text-4xl text-accent font-semibold mb-1 tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-poppins uppercase text-[9px] md:text-xs tracking-[0.2em] text-primary font-medium">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Scroll Indicator (Only icon, animates once) */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-8 flex flex-col items-center pointer-events-none"
      >
        <div className="w-5 h-8 border border-primary/60 rounded-full flex justify-center pt-2 shadow-sm bg-secondary/50 backdrop-blur-sm">
          <div className="w-1 h-1.5 rounded-full bg-primary" />
        </div>
      </motion.div>
    </div>
  );
}
