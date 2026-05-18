import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import AnimatedDivider from '../ui/layout/AnimatedDivider';
import { weddingData } from '../../config/weddingData';
import { content } from '../../content';

export default function InvitationMessage() {
  return (
    <SectionContainer id="invitation" className="relative z-10 pt-4 md:pt-12">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-cormorant text-3xl md:text-4xl text-primary/90 mb-4 tracking-widest select-none drop-shadow-[0_2px_10px_rgba(199,169,127,0.3)] font-light leading-relaxed overflow-visible inline-block px-4"
        >
          ﷽
        </motion.div>
      </div>

      <SectionTitle 
        title="The Invitation" 
        subtitle="With the blessings of Allah & our beloved families" 
      />

      <div className="max-w-3xl mx-auto text-center">
        <Card variant="soft" className="relative p-8 md:p-14 border border-primary/40 shadow-xl">
          <span className="quote-poetic block mb-4 text-accent/75 font-medium">
            {content.invitation.verse}
          </span>
          <span className="font-poppins text-xs tracking-[0.2em] uppercase text-accent/85 font-medium block mb-10">
            {content.invitation.verseRef}
          </span>

          <p className="font-poppins text-sm md:text-base leading-relaxed text-text/90 mb-8 font-light">
            {content.invitation.body}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mt-12 whitespace-nowrap">
            <div className="flex flex-col items-center text-center max-w-xs">
              <span className="font-cinzel text-xl md:text-2xl text-accent font-medium leading-snug">
                {weddingData.groom.firstName}
              </span>
            </div>
            <div className="font-cormorant italic text-primary text-2xl md:text-3xl font-light my-4 md:my-0 select-none">
              &
            </div>
            <div className="flex flex-col items-center text-center max-w-xs">
              <span className="font-cinzel text-xl md:text-2xl text-accent font-medium leading-snug">
                {weddingData.bride.firstName}
              </span>
            </div>
          </div>
        </Card>

        <div className="mt-12">
          <AnimatedDivider />
        </div>
      </div>
    </SectionContainer>
  );
}
