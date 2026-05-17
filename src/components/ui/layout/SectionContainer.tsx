import React from 'react';

export interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionContainer({ children, className = '', id }: SectionContainerProps) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-24 w-full ${className}`}>
      {children}
    </section>
  );
}
