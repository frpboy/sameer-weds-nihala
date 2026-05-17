import { motion } from 'framer-motion';

export default function AnimatedDivider() {
  return (
    <div className="w-full py-8 flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-1/3 md:w-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-primary"
      />
      <div className="w-3 h-3 rotate-45 border border-primary mx-4 flex items-center justify-center">
        <div className="w-1 h-1 bg-primary rotate-45" />
      </div>
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-1/3 md:w-1/4 h-[1px] bg-gradient-to-l from-transparent via-primary/50 to-primary"
      />
    </div>
  );
}
