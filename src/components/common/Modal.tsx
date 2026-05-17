import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiX } from 'react-icons/bi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-secondary rounded-lg border border-primary/30 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-primary/20 px-6 py-4">
              <h3 className="font-cinzel text-xl text-accent font-medium">{title || ''}</h3>
              <button 
                onClick={onClose}
                className="text-primary hover:text-accent transition-colors p-1"
              >
                <BiX size={28} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
