import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not configured.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const sql = neon(databaseUrl);

  // GET — return all RSVPs for the live wishes wall
  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT full_name, attendance, guest_count, dietary_or_notes, created_at
        FROM rsvps
        ORDER BY created_at DESC
        LIMIT 50;
      `;
      return res.status(200).json(rows);
    } catch (error) {
      console.error('RSVP fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch RSVPs.' });
    }
  }

  // POST — submit a new RSVP
  if (req.method === 'POST') {
    try {
      const { fullName, attendance, guestCount, dietaryOrNotes } = req.body;

      if (!fullName || !attendance) {
        return res.status(400).json({ error: 'Full name and attendance are required' });
      }

      const result = await sql`
        INSERT INTO rsvps (full_name, attendance, guest_count, dietary_or_notes)
        VALUES (${fullName}, ${attendance}, ${String(guestCount || '1')}, ${dietaryOrNotes || ''})
        RETURNING *;
      `;

      return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
      console.error('RSVP insertion error:', error);
      return res.status(500).json({ error: 'Failed to submit RSVP. Please try again.' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
