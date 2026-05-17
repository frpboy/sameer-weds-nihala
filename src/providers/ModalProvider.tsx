import React, { createContext, useContext, useState, useEffect } from 'react';

interface ModalContextType {
  isOpen: boolean;
  activeImage: string | null;
  openGalleryModal: (image: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const isOpen = activeImage !== null;

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

  const openGalleryModal = (image: string) => {
    setActiveImage(image);
  };

  const closeModal = () => {
    setActiveImage(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, activeImage, openGalleryModal, closeModal }}>
      {children}
      {/* Lightbox / Modal Render */}
      {isOpen && activeImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeModal}
        >
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-light p-2"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ✕
          </button>
          <img 
            src={activeImage} 
            alt="Expanded view" 
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
