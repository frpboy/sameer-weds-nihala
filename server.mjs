// Local dev server — mirrors the Vercel /api/rsvp.ts function exactly
// Runs on port 3001, proxied by Vite from /api/*
import { createServer } from 'http';
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env manually (no dotenv dependency needed)
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  const envFile = readFileSync(join(__dirname, '.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const PORT = 3001;

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  if (!req.url?.startsWith('/api/rsvp')) { res.writeHead(404); res.end('{}'); return; }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'DATABASE_URL not set in .env' }));
    return;
  }

  const sql = neon(dbUrl);

  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT full_name, attendance, guest_count, dietary_or_notes, created_at
        FROM rsvps ORDER BY created_at DESC LIMIT 100
      `;
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    } catch (e) {
      console.error('[GET] DB error:', e.message);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch RSVPs' }));
    }
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', async () => {
      try {
        const { fullName, attendance, guestCount, dietaryOrNotes } = JSON.parse(body);
        if (!fullName || !attendance) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'fullName and attendance are required' }));
          return;
        }
        const result = await sql`
          INSERT INTO rsvps (full_name, attendance, guest_count, dietary_or_notes)
          VALUES (${fullName}, ${attendance}, ${String(guestCount || '1')}, ${dietaryOrNotes || ''})
          RETURNING *
        `;
        console.log(`✅ RSVP saved: ${fullName} (${attendance})`);
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, data: result[0] }));
      } catch (e) {
        console.error('[POST] DB error:', e.message);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to save RSVP' }));
      }
    });
    return;
  }

  res.writeHead(405);
  res.end(JSON.stringify({ error: 'Method not allowed' }));
});

server.listen(PORT, () => {
  console.log(`\n🟢 Local RSVP API server → http://localhost:${PORT}/api/rsvp`);
  console.log(`   Database: ${process.env.DATABASE_URL ? '✅ Connected to Neon' : '❌ DATABASE_URL missing'}\n`);
});
