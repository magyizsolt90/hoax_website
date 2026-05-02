# HOAX Lucky Wheel

Campaign page live at **map.hoaxcoffee.com**. Users enter their email, spin the wheel once, and win a promo code. Each email can only play once.

---

## Hey David 👋

The frontend is fully wired and deployed. Persistence currently runs off **localStorage** (browser-only, per device). Your job is to:

1. Create the database table on DigitalOcean
2. Build three API endpoints on `api.hoaxcoffee.com`
3. Swap one line in the frontend to activate the real DB

---

## 1. Database table

Create this table in the existing DigitalOcean Postgres cluster (or whichever DB you prefer — the frontend just talks to a REST API):

```sql
CREATE TABLE wheel_spins (
  id          TEXT        PRIMARY KEY,
  timestamp   TIMESTAMPTZ NOT NULL,
  email       TEXT        NOT NULL UNIQUE,
  reward      TEXT        NOT NULL,
  promo_code  TEXT        NOT NULL
);

CREATE INDEX wheel_spins_email_idx ON wheel_spins (email);
```

> The `UNIQUE` constraint on `email` is a hard guard. The frontend also checks before spinning, but this makes the DB the final source of truth.

---

## 2. API endpoints

Add these three routes to the existing `api.hoaxcoffee.com` backend. All requests carry the existing `x-api-key` header — reuse whatever auth middleware is already there.

---

### `GET /wheel/check?email=<email>`

Check whether an email has already played.

**Response:**
```json
{ "hasPlayed": true }
```

**Example (Express):**
```js
app.get('/wheel/check', async (req, res) => {
  const { email } = req.query;
  const row = await db.query(
    'SELECT id FROM wheel_spins WHERE email = $1',
    [email.toLowerCase()]
  );
  res.json({ hasPlayed: row.rowCount > 0 });
});
```

---

### `POST /wheel/spin`

Save a completed spin. Called immediately after the wheel stops.

**Request body:**
```json
{
  "timestamp": "2026-05-01T18:30:00.000Z",
  "email": "user@example.com",
  "reward": "20% kedvezmény az előfizetésre",
  "promoCode": "HOAX20-B3G"
}
```

**Response — the saved record with its generated `id`:**
```json
{
  "id": "1746122400000-x8k3j2m",
  "timestamp": "2026-05-01T18:30:00.000Z",
  "email": "user@example.com",
  "reward": "20% kedvezmény az előfizetésre",
  "promoCode": "HOAX20-B3G"
}
```

**Example (Express):**
```js
app.post('/wheel/spin', async (req, res) => {
  const { timestamp, email, reward, promoCode } = req.body;
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  try {
    await db.query(
      `INSERT INTO wheel_spins (id, timestamp, email, reward, promo_code)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, timestamp, email.toLowerCase(), reward, promoCode]
    );
    res.json({ id, timestamp, email, reward, promoCode });
  } catch (err) {
    if (err.code === '23505') {           // unique_violation — already played
      res.status(409).json({ error: 'already_played' });
    } else {
      res.status(500).json({ error: 'server_error' });
    }
  }
});
```

---

### `GET /wheel/record?email=<email>`

Fetch a single spin record by email. Returns `HTTP 404` if the email hasn't played yet.

**Response:**
```json
{
  "id": "1746122400000-x8k3j2m",
  "timestamp": "2026-05-01T18:30:00.000Z",
  "email": "user@example.com",
  "reward": "20% kedvezmény az előfizetésre",
  "promoCode": "HOAX20-B3G"
}
```

**Example (Express):**
```js
app.get('/wheel/record', async (req, res) => {
  const { email } = req.query;
  const row = await db.query(
    `SELECT id, timestamp, email, reward, promo_code AS "promoCode"
     FROM wheel_spins WHERE email = $1`,
    [email.toLowerCase()]
  );
  if (row.rowCount === 0) return res.status(404).end();
  res.json(row.rows[0]);
});
```

---

## 3. Activate the real DB in the frontend

Once the endpoints are live, open **`src/wheel/db/index.ts`** and replace the bottom two lines:

```ts
// BEFORE (localStorage — currently active):
import { LocalStorageDB } from './localStorageDB';
export const db = new LocalStorageDB();

// AFTER (real API — uncomment and replace):
import { ApiDB } from './apiDB';
export const db = new ApiDB('https://api.hoaxcoffee.com', process.env.REACT_APP_API_KEY!);
```

Then add `REACT_APP_API_KEY` to the DigitalOcean App Platform environment variables for the `fortune-wheel` component (same key already used for the venues endpoint).

Redeploy — done.

---

## Frontend data contract

All DB interface types live in `src/wheel/db/types.ts`. The full pre-built API client is in `src/wheel/db/apiDB.ts` — no changes needed there, it's already wired to call the three endpoints above.

```ts
interface SpinRecord {
  id: string;
  timestamp: string;   // ISO 8601
  email: string;
  reward: string;      // human-readable prize description
  promoCode: string;   // the code shown to the user
}
```

---

## Running locally

```bash
npm install
npm start
# → http://localhost:3000
```
