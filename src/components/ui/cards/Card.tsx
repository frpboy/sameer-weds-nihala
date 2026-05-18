import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { FADE_UP } from '../../../motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'default' | 'outline' | 'flat' | 'minimal' | 'soft';
  children: React.ReactNode;
}

export default function Card({ variant = 'glass', children, className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-xl p-6 md:p-10 transition-all';
  const variants = {
    glass: 'bg-secondary/70 border border-primary/25 shadow-lg backdrop-blur-md',
    default: 'bg-secondary border border-primary/20 shadow-md',
    outline: 'border border-primary/40 bg-transparent shadow-none',
    flat: 'bg-secondary border border-primary/15 shadow-sm',
    minimal: 'bg-transparent border-b border-primary/20 rounded-none shadow-none p-4 md:p-6',
    soft: 'bg-primary/5 border border-primary/10 shadow-none',
  };

  return (
    <motion.div
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
