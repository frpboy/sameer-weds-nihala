import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PrimaryButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'solid' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function PrimaryButton({ 
  variant = 'solid', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: PrimaryButtonProps) {
  const baseStyles = 'font-poppins uppercase tracking-wider rounded-md transition-all duration-300 flex items-center justify-center font-medium backdrop-blur-sm shadow-sm';
  
  const variants = {
    solid: 'bg-primary text-secondary hover:bg-primary/90 border border-primary/20',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-secondary',
    glass: 'bg-secondary/40 border border-primary/30 text-accent hover:bg-primary/20 hover:border-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
