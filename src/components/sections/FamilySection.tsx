import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import { STAGGER_CONTAINER, FADE_UP } from '../../motion';
import { weddingData } from '../../config/weddingData';

export default function FamilySection() {
  const families = [
    {
      title: "The Groom's Family",
      parents: weddingData.groom.parents,
      residence: weddingData.groom.address,
    },
    {
      title: "The Bride's Family",
      parents: weddingData.bride.parents,
      residence: weddingData.bride.address,
    },
  ];

  return (
    <SectionContainer id="family" className="relative z-10">
      <SectionTitle title="With Heartfelt Blessings" subtitle="Honoring our beloved parents & elders" />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      >
        {families.map((fam) => (
          <motion.div key={fam.title} variants={FADE_UP}>
            <Card variant="glass" className="p-8 md:p-12 text-center border-primary/30 relative flex flex-col items-center shadow-md">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-6 bg-secondary text-primary">
                <span className="font-cinzel text-lg">✦</span>
              </div>
              <span className="font-poppins uppercase text-xs tracking-widest text-primary font-medium mb-3 block">
                {fam.title}
              </span>
              <h3 className="font-cinzel text-2xl text-accent font-medium mb-2">
                {fam.parents}
              </h3>
              <p className="font-poppins text-xs text-text/70 mb-6 italic">
                {fam.residence}
              </p>
              <div className="w-16 h-px bg-primary/40 my-4" />
              <p className="font-cormorant text-base text-text/90 italic font-light">
                "May Allah bless this union with boundless joy, harmony, and eternal prosperity."
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
