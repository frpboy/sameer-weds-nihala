Suggested Tech Stack
React + Vite
Tailwind CSS
Framer Motion
React Router
Lenis (optional smooth scroll)
React Icons
Vercel deployment
Initial Folder Structure
sameer-weds-nihala/
│
├── public/
│   ├── images/
│   ├── audio/
│   ├── fonts/
│   ├── favicon/
│   └── og/
│
├── src/
│   ├── assets/
│   │
│   ├── animations/
│   │   ├── fade.ts
│   │   ├── slide.ts
│   │   └── stagger.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── sections/
│   │   └── ui/
│   │
│   ├── config/
│   │   └── weddingData.ts
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   └── Home.tsx
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── README.md
├── tailwind.config.js
├── vite.config.ts
└── package.json
weddingData.ts

Start with this immediately.

export const weddingData = {
  groom: {
    firstName: "Mohammed",
    lastName: "Sameer",
  },

  bride: {
    firstName: "Nihala",
    lastName: "Jasmin",
  },

  wedding: {
    date: "2026-07-19",
    time: "",
    venue: "",
    locationUrl: "",
  },

  theme: {
    primary: "#C7A97F",
    secondary: "#F8F4EE",
    accent: "#2E4A3D",
    text: "#1A1A1A",
  },

  social: {
    whatsapp: "",
    instagram: "",
  },
};
Theme Recommendation

For this specific one:

Style Direction

Modern Islamic luxury minimal

Palette
Warm ivory
Champagne gold
Deep emerald
Soft beige
Matte black typography
Font Pairing

Headings:

Cinzel
Cormorant Garamond

Body:

Poppins
Inter

This combo always works for premium wedding aesthetics.

Sections to Build First
1. Splash Screen

Elegant opening animation.

Example:

“In the name of Allah, the Most Merciful…”

Then:
ENTER INVITATION

2. Hero Section
Couple names
Wedding date
subtle animated background
floral/islamic geometry overlay
3. Countdown
4. Invitation Message
5. Event Timeline
6. Venue + Maps
7. Family Section
8. Gallery Placeholder
9. RSVP
10. Footer
Motion Style

Avoid:

bouncing animations
flashy neon effects
startup landing page behavior

Use:

fade-up
slow parallax
blur reveals
smooth opacity transitions
elegant stagger

Wedding sites should feel calm and emotional.

Important Mobile Rules

You already know this but still:

Optimize For:
WhatsApp browser
Samsung midrange phones
poor network
one-hand scrolling

That’s the real-world environment.

README Structure

Add:

setup instructions
deployment instructions
folder explanation
component standards
image optimization rules

Future you will thank you.

Vercel Project Name

sameer-weds-nihala

Deployment:
Vercel