# Data Schema

This defines the dynamic content structure for the wedding site, ensuring consistency.

## Wedding Event
```typescript
export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  venue: string;
  mapsUrl: string;
}
```

## Couple Info
```typescript
export interface Couple {
  groom: {
    fullName: string;
    firstName: string;
    lastName: string;
    shortName: string;
  };
  bride: {
    fullName: string;
    firstName: string;
    lastName: string;
    shortName: string;
  };
  coupleName: string;
  monogram: string;
}
```

## Theme Config
```typescript
export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}
```
