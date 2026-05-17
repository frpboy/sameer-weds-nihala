import { motion } from 'framer-motion';
import SectionContainer from '../common/SectionContainer';
import SectionTitle from '../common/SectionTitle';
import GlassCard from '../common/GlassCard';
import { FADE_UP, STAGGER_CONTAINER } from '../../constants/animations';
import { weddingData } from '../../config/weddingData';

export default function TimelineSection() {
  const events = [
    {
      title: 'Nikah Ceremony',
      time: '11:00 AM',
      location: weddingData.wedding.venue || 'Grand Royal Hall, Mosque Central Hall',
      desc: 'The sacred Nikah ceremony where we seal our union under the blessings of Allah.',
    },
    {
      title: 'Grand Wedding Feast',
      time: '12:30 PM - 3:30 PM',
      location: weddingData.wedding.venue || 'Grand Royal Banquet Hall',
      desc: 'Join us for a lavish traditional feast and share in our joyous celebration.',
    },
    {
      title: 'Reception & Blessings',
      time: '4:00 PM Onwards',
      location: weddingData.wedding.venue || 'Main Stage & Garden Pavilion',
      desc: 'An evening of warmth, photography, and cherished memories with our beloved guests.',
    },
  ];

  return (
    <SectionContainer id="timeline" className="relative z-10">
      <SectionTitle title="Event Schedule" subtitle="The timeline of our auspicious day" />

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Center Vertical Connecting Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2" />

        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12 md:space-y-20 relative z-10"
        >
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div key={event.title} variants={FADE_UP} className="relative flex flex-col md:flex-row items-center">
                {/* Center Node / Diamond */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary border-2 border-primary rotate-45 flex items-center justify-center z-20">
                  <div className="w-1.5 h-1.5 bg-accent rotate-45" />
                </div>

                {/* Desktop Left / Right Content */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right md:self-start' : 'md:pl-16 md:ml-auto'}`}>
                  <GlassCard className="p-6 md:p-8 hover:border-primary/50 transition-colors shadow-md">
                    <span className="font-poppins uppercase text-xs tracking-widest text-primary font-medium mb-1 block">
                      {event.time}
                    </span>
                    <h3 className="font-cinzel text-xl md:text-2xl text-accent font-medium mb-2">
                      {event.title}
                    </h3>
                    <span className="font-poppins text-xs text-text/70 block mb-4 italic">
                      {event.location}
                    </span>
                    <p className="font-poppins text-xs md:text-sm text-text/80 leading-relaxed font-light">
                      {event.desc}
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
