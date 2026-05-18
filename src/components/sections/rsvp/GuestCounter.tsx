// GuestCounter
import { BiLoaderAlt } from 'react-icons/bi';
import { MdFavorite, MdPeople } from 'react-icons/md';
import { RsvpEntry } from './types';

interface GuestCounterProps {
  entries: RsvpEntry[];
  fetching: boolean;
  themeCard: string;
}

export default function GuestCounter({ entries, fetching, themeCard }: GuestCounterProps) {
  const attendingEntries = entries.filter((e) => e.attendance === 'yes');
  const totalGuests = attendingEntries.reduce((sum, e) => {
    return sum + parseInt(String(e.guestCount ?? e.guest_count ?? 1), 10);
  }, 0);

  return (
    <div className={`${themeCard} p-7 flex flex-col gap-5`}>
      {/* Bismillah ornament */}
      <div className="text-center overflow-visible my-1 md:my-2">
        <span className="font-cormorant text-primary/60 text-3xl md:text-4xl select-none leading-relaxed font-light inline-block px-2">
          ﷽
        </span>
      </div>

      <h3 className="font-cinzel text-xs text-primary tracking-[0.2em] uppercase text-center font-semibold">
        Guest Count
      </h3>

      {fetching ? (
        <div className="flex justify-center py-4">
          <BiLoaderAlt className="animate-spin text-primary text-2xl" />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center text-text/40 font-poppins text-xs py-4">
          <MdFavorite className="text-primary/30 text-3xl mx-auto mb-2" />
          Be the first to RSVP!
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-primary/20 shadow-sm">
            <MdPeople className="text-primary text-2xl flex-shrink-0" />
            <div>
              <p className="font-cinzel text-3xl text-accent font-semibold leading-none">{attendingEntries.length}</p>
              <p className="font-poppins text-[10px] text-text/50 uppercase tracking-widest mt-1">
                {attendingEntries.length === 1 ? 'person' : 'people'} attending
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-primary/20 shadow-sm">
            <MdFavorite className="text-primary text-2xl flex-shrink-0" />
            <div>
              <p className="font-cinzel text-3xl text-accent font-semibold leading-none">{totalGuests}</p>
              <p className="font-poppins text-[10px] text-text/50 uppercase tracking-widest mt-1">
                total {totalGuests === 1 ? 'guest' : 'guests'}
              </p>
            </div>
          </div>

          <p className="font-poppins text-xs text-text/40 text-center pt-1">
            {attendingEntries.length} {attendingEntries.length === 1 ? 'person' : 'people'} · {totalGuests} total guests
          </p>
        </div>
      )}
    </div>
  );
}
