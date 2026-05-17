import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { FADE_UP } from '../../constants/animations';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export default function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <motion.div
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-secondary/70 border border-primary/25 shadow-lg rounded-xl p-6 md:p-10 backdrop-blur-md ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
