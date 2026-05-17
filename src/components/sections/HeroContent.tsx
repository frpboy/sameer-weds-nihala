import { motion } from 'framer-motion';
import { weddingData } from '../../config/weddingData';
import { VARIANTS } from '../../constants/motion';
import useCountdown from '../../hooks/useCountdown';
import useReducedMotion from '../../hooks/useReducedMotion';
import { content } from '../../content';

export default function HeroContent() {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(weddingData.wedding.date));

  const timeLeft = useCountdown(weddingData.wedding.date);
  const reducedMotion = useReducedMotion();

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="w-16 h-px bg-primary/40" />
        <div className="w-2.5 h-2.5 rotate-45 bg-primary mx-4" />
        <div className="w-16 h-px bg-primary/40" />
      </motion.div>

      <motion.span
        variants={VARIANTS.fadeUp(reducedMotion)}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="font-poppins uppercase tracking-[0.3em] text-xs md:text-sm text-primary mb-6 font-medium"
      >
        {content.hero.invitationIntro}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
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

      <motion.p
        variants={VARIANTS.fadeUp(reducedMotion)}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="font-cormorant text-xl md:text-2xl text-text font-medium mt-6 mb-10 tracking-wider"
      >
        {formattedDate}
      </motion.p>

      <motion.div
        variants={VARIANTS.staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto mb-16 px-2 w-full"
      >
        {timeUnits.map((unit) => (
          <motion.div key={unit.label} variants={VARIANTS.scaleUp(reducedMotion)}>
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

      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : -15 }}
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
