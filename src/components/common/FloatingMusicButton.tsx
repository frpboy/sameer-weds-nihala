import { useState, useRef, useEffect } from 'react';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface FloatingMusicButtonProps {
  audioUrl?: string;
}

export default function FloatingMusicButton({ audioUrl = '/audio/ambient.mp3' }: FloatingMusicButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Handle auto-play restriction on mobile browsers
      });
    }
    setIsPlaying(!isPlaying);
  };

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
