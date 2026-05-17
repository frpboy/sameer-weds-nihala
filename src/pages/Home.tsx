import { useState } from 'react';
import SplashIntro from '../components/sections/SplashIntro';
import Hero from '../components/sections/Hero';
import InvitationMessage from '../components/sections/InvitationMessage';
import TimelineSection from '../components/sections/TimelineSection';
import VenueSection from '../components/sections/VenueSection';
import FamilySection from '../components/sections/FamilySection';
import GallerySection from '../components/sections/GallerySection';
import RsvpSection from '../components/sections/RsvpSection';
import Footer from '../components/sections/Footer';
import FloatingMusicButton from '../components/ui/buttons/FloatingMusicButton';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="relative w-full min-h-screen bg-secondary selection:bg-primary/20 selection:text-accent font-poppins">
      <SplashIntro onEnter={() => setHasEntered(true)} />
      
      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Hero />
        <InvitationMessage />
        <TimelineSection />
        <VenueSection />
        <FamilySection />
        <GallerySection />
        <RsvpSection />
        <Footer />
        
        <FloatingMusicButton />
      </div>
    </main>
  );
}
