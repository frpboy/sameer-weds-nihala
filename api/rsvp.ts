import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Uses environment variable in production, fallback to full connection string
    const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_hnfcUw0Wj6Xm@ep-dry-dawn-aopgm14c-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const sql = neon(databaseUrl);

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
