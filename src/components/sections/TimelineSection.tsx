import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import { FADE_UP } from '../../motion';
import { weddingData } from '../../config/weddingData';

export default function TimelineSection() {
  const event = {
    title: 'Grand Reception',
    time: 'July 19, 2026 • 4:30 PM Onwards',
    location: weddingData.wedding.venue || 'Shifa Convention Center',
    desc: 'Join us for our grand wedding reception and lavish traditional feast to celebrate our marriage.',
  };

  return (
    <SectionContainer id="timeline" className="relative z-10">
      <SectionTitle title="Event Schedule" subtitle="The timeline of our auspicious day" />

      <div className="max-w-2xl mx-auto px-4 py-2">
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card variant="flat" className="p-8 md:p-10 text-center hover:border-primary/50 transition-colors shadow-md flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-6 bg-secondary text-primary">
              <span className="font-cinzel text-lg">✦</span>
            </div>
            
            <span className="font-poppins uppercase text-xs tracking-widest text-primary font-medium mb-3 block">
              {event.time}
            </span>
            
            <h3 className="font-cinzel text-2xl md:text-3xl text-accent font-medium mb-2">
              {event.title}
            </h3>
            
            <span className="font-poppins text-sm text-text/70 block mb-6 italic">
              {event.location}
            </span>
            
            <p className="font-poppins text-sm md:text-base text-text/80 leading-relaxed font-light max-w-md">
              {event.desc}
            </p>
          </Card>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
