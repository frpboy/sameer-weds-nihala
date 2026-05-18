const calendarTitle = encodeURIComponent("Wedding Celebration: Mohammed Sameer & Nihala Jasmin KK");
const calendarDetails = encodeURIComponent(
  "You are joyfully invited to celebrate the wedding of Mohammed Sameer Kallangadan & Nihala Jasmin KK.\n\nDate: Sunday, July 19, 2026\nTime: 11:00 AM IST\nVenue: Shifa Convention Center\nGoogle Maps: https://maps.app.goo.gl/JDr5v3dgUuwPNbnJA\n\nWe look forward to your presence and heartfelt prayers."
);
const calendarLocation = encodeURIComponent("Shifa Convention Center, Perinthalmanna, Kerala");

export const venue = {
  date: "2026-07-19T11:00:00+05:30",
  day: "Sunday",
  time: "11:00 AM",
  venue: "Shifa Convention Center",
  address: "Perinthalmanna, Kerala",
  mapsUrl: "https://maps.app.goo.gl/JDr5v3dgUuwPNbnJA",
  calendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&dates=20260719T053000Z%2F20260719T103000Z&details=${calendarDetails}&location=${calendarLocation}`,
} as const;
