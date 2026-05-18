import { useState, useEffect } from 'react';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import { RsvpForm, GuestCounter, WishesWall, RsvpEntry } from './rsvp';

const themeCard = 'relative rounded-2xl bg-secondary/70 backdrop-blur-md border border-primary/25 shadow-lg overflow-hidden';

export default function RsvpSection() {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch('/api/rsvp')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setEntries(data); })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleAddEntry = (entry: RsvpEntry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <SectionContainer id="rsvp" className="relative z-10 py-12 md:py-24">
      <SectionTitle title="RSVP & Wishes" subtitle="We Will See You At The Function" />

      {/* 3-col grid on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start max-w-5xl mx-auto px-4">
        <RsvpForm onAddEntry={handleAddEntry} themeCard={themeCard} />
        <GuestCounter entries={entries} fetching={fetching} themeCard={themeCard} />
        <WishesWall entries={entries} fetching={fetching} themeCard={themeCard} />
      </div>
    </SectionContainer>
  );
}
