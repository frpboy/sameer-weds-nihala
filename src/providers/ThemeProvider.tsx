import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeTokens } from '../theme/tokens';
import { themePresets, ThemePreset } from '../theme/presets';

interface ThemeContextType {
  presetId: string;
  preset: ThemePreset;
  setPresetId: (id: keyof typeof themePresets) => void;
  tokens: typeof themeTokens;
  availablePresets: ThemePreset[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [presetId, setPresetIdState] = useState<string>('royalGold');
  const preset = themePresets[presetId] || themePresets.royalGold;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', preset.colors.primary);
    root.style.setProperty('--color-secondary', preset.colors.secondary);
    root.style.setProperty('--color-accent', preset.colors.accent);
    root.style.setProperty('--color-text', preset.colors.text);

    // Update status bar and address bar color dynamically for both Android and iOS
    const metaThemeColors = document.querySelectorAll('meta[name="theme-color"]');
    metaThemeColors.forEach((meta) => {
      meta.setAttribute('content', preset.colors.secondary);
    });
  }, [preset]);

  const setPresetId = (id: string) => {
    if (themePresets[id]) {
      setPresetIdState(id);
    }
  };

  return (
    <ThemeContext.Provider value={{
      presetId,
      preset,
      setPresetId,
      tokens: themeTokens,
      availablePresets: Object.values(themePresets),
    }}>
      <div 
        style={{
          backgroundColor: preset.colors.secondary,
          color: preset.colors.text,
        }}
        className={`theme-${presetId} min-h-screen font-poppins antialiased selection:bg-primary/20 selection:text-accent transition-colors duration-500`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
