import { couple } from './couple';
import { venue } from './venue';
import { social } from './social';
import { branding } from './branding';

export const weddingData = {
  ...couple,
  wedding: venue,
  social,
  ...branding,
} as const;
