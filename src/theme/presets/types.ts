export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  colors: ThemeColors;
}
