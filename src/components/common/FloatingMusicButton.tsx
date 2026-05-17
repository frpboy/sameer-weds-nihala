import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useMusic } from '../../providers/MusicProvider';

export default function FloatingMusicButton() {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-accent text-secondary flex items-center justify-center shadow-lg border border-primary/30"
      aria-label="Toggle background music"
    >
      {isPlaying ? <BiVolumeFull size={22} /> : <BiVolumeMute size={22} />}
    </motion.button>
  );
}
