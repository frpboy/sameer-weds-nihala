import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiCheckCircle, BiX, BiLoaderAlt } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';
import { RsvpEntry } from './types';

interface WishesWallProps {
  entries: RsvpEntry[];
  fetching: boolean;
  themeCard: string;
}

export default function WishesWall({ entries, fetching, themeCard }: WishesWallProps) {
  const getName = (e: RsvpEntry) => e.fullName || e.full_name || 'Guest';
  const getNote = (e: RsvpEntry) => e.dietaryOrNotes || e.dietary_or_notes || '';

  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (entries.length <= 4 || isHovered) return;
    
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % entries.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [entries.length, isHovered]);

  const displayedEntries = [];
  if (entries.length > 0) {
    let heightUsed = 0;
    const MAX_HEIGHT = 320; // Approximate height budget

    for (let i = 0; i < entries.length; i++) {
      if (displayedEntries.length >= 4) break; // Hard limit of 4
      
      const entry = entries[(startIndex + i) % entries.length];
      const noteLen = getNote(entry).length;
      
      // Base height ~65px. Extra ~1px per character.
      const estimatedHeight = 65 + (noteLen * 0.7);
      
      // If adding this exceeds our budget AND we already have at least 2 items, stop.
      if (displayedEntries.length >= 2 && heightUsed + estimatedHeight > MAX_HEIGHT) {
        break;
      }
      
      displayedEntries.push(entry);
      heightUsed += estimatedHeight;
    }
  }

  return (
    <div 
      className={`${themeCard} p-7 flex flex-col`}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="font-cinzel text-xs text-primary tracking-[0.2em] uppercase mb-4 flex items-center gap-2 flex-shrink-0 font-semibold">
        <MdFavorite className="text-primary/60" /> Wishes & Prayers
      </h3>

      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
        {fetching && (
          <div className="flex justify-center pt-8">
            <BiLoaderAlt className="animate-spin text-primary text-xl" />
          </div>
        )}
        {!fetching && entries.length === 0 && (
          <p className="text-center text-text/40 font-poppins text-xs pt-8 leading-relaxed">
            Wishes will appear here<br />after RSVPs are submitted.
          </p>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          {displayedEntries.map((entry) => (
            <motion.div
              layout
              key={`${entry.created_at}-${entry.fullName || entry.full_name || 'guest'}`}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35 }}
              className="p-3.5 rounded-xl bg-secondary border border-primary/20 shadow-sm space-y-1.5 overflow-hidden"
            >
              <span className={`flex items-center gap-1.5 text-[10px] font-poppins font-semibold uppercase tracking-wider ${
                entry.attendance === 'yes' ? 'text-emerald-600' : 'text-text/40'
              }`}>
                {entry.attendance === 'yes'
                  ? <><BiCheckCircle className="text-sm" /> Attending</>
                  : <><BiX className="text-sm" /> Unable to attend</>
                }
              </span>
              {getNote(entry) && (
                <p className="font-cormorant italic text-text/80 text-sm leading-snug break-words [overflow-wrap:anywhere] [hyphens:auto]" lang="en">
                  &ldquo;{getNote(entry)}&rdquo;
                </p>
              )}
              <p className="font-poppins text-primary text-[11px] tracking-wide font-medium break-words [overflow-wrap:anywhere]">— {getName(entry)}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
