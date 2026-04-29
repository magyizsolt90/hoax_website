import { SpinRecord, WheelDB } from './types';

/**
 * Production implementation — swap index.ts to use this once the API endpoint
 * exists. Expected routes:
 *   GET  /wheel/check?email=…   → { hasPlayed: boolean }
 *   POST /wheel/spin             → SpinRecord
 *   GET  /wheel/record?email=…  → SpinRecord | null
 */
export class ApiDB implements WheelDB {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string
  ) {}

  private headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };
  }

  async hasPlayed(email: string): Promise<boolean> {
    const res = await fetch(
      `${this.baseUrl}/wheel/check?email=${encodeURIComponent(email)}`,
      { headers: this.headers() }
    );
    if (!res.ok) throw new Error('check failed');
    const data = await res.json();
    return data.hasPlayed as boolean;
  }

  async saveRecord(record: Omit<SpinRecord, 'id'>): Promise<SpinRecord> {
    const res = await fetch(`${this.baseUrl}/wheel/spin`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error('save failed');
    return res.json();
  }

  async getRecord(email: string): Promise<SpinRecord | null> {
    const res = await fetch(
      `${this.baseUrl}/wheel/record?email=${encodeURIComponent(email)}`,
      { headers: this.headers() }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('fetch failed');
    return res.json();
  }
}
