import { royalGold } from './royalGold';
import { romanticRose } from './romanticRose';
import { editorialIvory } from './editorialIvory';
import { emeraldLuxury } from './emeraldLuxury';
import { ThemePreset } from './types';

export * from './types';
export { royalGold, romanticRose, editorialIvory, emeraldLuxury };

export const themePresets: Record<string, ThemePreset> = {
  royalGold,
  romanticRose,
  editorialIvory,
  emeraldLuxury,
};
