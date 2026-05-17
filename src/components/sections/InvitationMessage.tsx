import SectionContainer from '../common/SectionContainer';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import AnimatedDivider from '../common/AnimatedDivider';
import { weddingData } from '../../config/weddingData';

export default function InvitationMessage() {
  return (
    <SectionContainer id="invitation" className="relative z-10">
      <SectionTitle 
        title="The Invitation" 
        subtitle="With the blessings of Allah & our beloved families" 
      />

      <div className="max-w-3xl mx-auto text-center">
        <GlassCard className="relative p-8 md:p-14 border border-primary/40 shadow-xl">
          {/* Top corner ornaments */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/50" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/50" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/50" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/50" />

          <span className="font-cormorant italic text-primary text-xl md:text-2xl mb-4 block">
            "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them..."
          </span>
          <span className="font-poppins text-xs tracking-[0.2em] uppercase text-accent/70 block mb-10">
            — Surah Ar-Rum 30:21
          </span>

          <p className="font-poppins text-sm md:text-base leading-relaxed text-text/90 mb-8 font-light">
            We invite you to share in our joy and celebrate the sacred union of our hearts. Your presence and heartfelt prayers will make our celebration complete as we embark on this blessed journey together.
          </p>

          <div className="flex flex-col items-center mt-8">
            <div className="font-cinzel text-xl md:text-2xl text-accent font-medium leading-snug">
              <span className="block">{weddingData.groom.fullName}</span>
              <span className="block font-cormorant italic text-primary text-lg md:text-xl my-1 font-light">&</span>
              <span className="block">{weddingData.bride.fullName}</span>
            </div>
          </div>
        </GlassCard>

        <div className="mt-12">
          <AnimatedDivider />
        </div>
      </div>
    </SectionContainer>
  );
}
