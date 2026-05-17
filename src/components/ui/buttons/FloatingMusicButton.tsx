import { BiVolumeMute } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useMusic } from '../../../providers/MusicProvider';

export default function FloatingMusicButton() {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Ambient ping effect when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-70 pointer-events-none" />
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="relative z-10 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary/95 backdrop-blur-md shadow-[0_8px_30px_rgba(199,169,127,0.2)] border border-primary/40 cursor-pointer transition-colors hover:bg-secondary"
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[3px] h-4">
              <motion.span
                animate={{ height: ['40%', '100%', '40%'] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                className="w-[3px] bg-primary rounded-full"
              />
              <motion.span
                animate={{ height: ['80%', '30%', '80%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-[3px] bg-primary rounded-full"
              />
              <motion.span
                animate={{ height: ['60%', '100%', '60%'] }}
                transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
                className="w-[3px] bg-primary rounded-full"
              />
            </div>
          ) : (
            <BiVolumeMute size={22} className="text-primary/70" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
