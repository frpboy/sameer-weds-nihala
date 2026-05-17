import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { FADE_UP } from '../../constants/animations';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <motion.div
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`bg-secondary/80 border border-primary/20 shadow-md rounded-lg p-6 md:p-10 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
