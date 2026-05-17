export const COLORS = {
  PRIMARY: '#C7A97F',    // Champagne gold
  SECONDARY: '#F8F4EE',  // Warm ivory
  ACCENT: '#2E4A3D',     // Deep emerald
  TEXT: '#1A1A1A',       // Matte black
  WHITE: '#FFFFFF',
  GLASS_BG: 'rgba(248, 244, 238, 0.75)',
  GLASS_BORDER: 'rgba(199, 169, 127, 0.25)',
} as const;

export const TYPOGRAPHY = {
  FONTS: {
    HEADING_CINZEL: "'Cinzel', serif",
    HEADING_CORMORANT: "'Cormorant Garamond', serif",
    BODY_POPPINS: "'Poppins', sans-serif",
    BODY_INTER: "'Inter', sans-serif",
  },
  SIZES: {
    XS: '0.75rem',
    SM: '0.875rem',
    BASE: '1rem',
    LG: '1.125rem',
    XL: '1.25rem',
    '2XL': '1.5rem',
    '3XL': '1.875rem',
    '4XL': '2.25rem',
    '5XL': '3rem',
    '6XL': '3.75rem',
  },
} as const;

export const SPACING = {
  SECTION_Y: '5rem',
  CONTAINER_PX: '1.5rem',
  GAP_SM: '0.5rem',
  GAP_MD: '1rem',
  GAP_LG: '2rem',
  GAP_XL: '3rem',
} as const;

export const themeTokens = {
  COLORS,
  TYPOGRAPHY,
  SPACING,
};
