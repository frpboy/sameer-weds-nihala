# 05 — Database Schema

## PostgreSQL (Neon) — RSVP Table

Run this once in the [Neon SQL Editor](https://console.neon.tech) to initialize:

```sql
CREATE TABLE IF NOT EXISTS rsvps (
  id               SERIAL PRIMARY KEY,
  full_name        VARCHAR(255) NOT NULL,
  attendance       VARCHAR(50)  NOT NULL,       -- 'yes' | 'no'
  guest_count      VARCHAR(50)  DEFAULT '1',
  dietary_or_notes TEXT,
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## TypeScript Interface (Frontend)

```typescript
interface RsvpEntry {
  fullName?:       string;   // from POST body
  full_name?:      string;   // from GET (DB column name)
  attendance:      string;   // 'yes' | 'no'
  guestCount?:     string | number;
  guest_count?:    string | number;
  dietaryOrNotes?: string;
  dietary_or_notes?: string;
  created_at:      string;
}
```

Both camelCase (POST body) and snake_case (DB response) are handled transparently in `RsvpSection.tsx`.

## API Endpoints

| Method | Endpoint    | Description                             |
|--------|-------------|-----------------------------------------|
| GET    | `/api/rsvp` | Fetch all RSVPs (last 100, newest first)|
| POST   | `/api/rsvp` | Insert new RSVP, returns created row    |

### POST Body

```json
{
  "fullName": "Rahul",
  "attendance": "yes",
  "guestCount": "2",
  "dietaryOrNotes": "Looking forward to it!"
}
```

## Environment Variable

Set in `.env` (local) and Vercel project settings (production):

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require&channel_binding=require
```
