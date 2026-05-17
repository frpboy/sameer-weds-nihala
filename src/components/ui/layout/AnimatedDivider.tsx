import { motion } from 'framer-motion';

export default function AnimatedDivider() {
  return (
    <div className="w-full py-8 flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-2/3 md:w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </div>
  );
}
