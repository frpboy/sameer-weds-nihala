// WishesWall
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

  return (
    <div className={`${themeCard} p-7 flex flex-col`} style={{ maxHeight: '480px' }}>
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

        <AnimatePresence initial={false}>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.created_at + i}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
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
