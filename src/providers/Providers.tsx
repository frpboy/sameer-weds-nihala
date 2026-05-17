import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { LenisProvider } from './LenisProvider';
import { MusicProvider } from './MusicProvider';
import { ModalProvider } from './ModalProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <MusicProvider audioUrl="/audio/ambient.mp3">
          <ModalProvider>
            {children}
          </ModalProvider>
        </MusicProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}
