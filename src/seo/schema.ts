import { weddingData } from '../config/weddingData';

export function getWeddingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `The Wedding Celebration of ${weddingData.groom.fullName} & ${weddingData.bride.fullName}`,
    "startDate": weddingData.wedding.date,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": weddingData.wedding.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": weddingData.wedding.address,
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Person",
      "name": weddingData.coupleName
    },
    "description": `You are cordially invited to the wedding celebration of ${weddingData.coupleName} on ${weddingData.wedding.day}, July 19, 2026 at ${weddingData.wedding.venue}.`
  };
}
