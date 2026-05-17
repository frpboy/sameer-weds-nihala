import { motion } from 'framer-motion';
import { FADE_UP } from '../../../motion';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <motion.div 
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`text-center my-12 ${className}`}
    >
      {subtitle && (
        <span className="font-poppins uppercase tracking-widest text-xs md:text-sm text-primary mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="font-cinzel text-3xl md:text-5xl text-accent font-medium tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}
