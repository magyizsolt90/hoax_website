import { SpinRecord, WheelDB } from './types';

const STORAGE_KEY = 'hoax_wheel_spins';

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function load(): SpinRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function save(records: SpinRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export class LocalStorageDB implements WheelDB {
  async hasPlayed(email: string): Promise<boolean> {
    return load().some((r) => r.email.toLowerCase() === email.toLowerCase());
  }

  async saveRecord(record: Omit<SpinRecord, 'id'>): Promise<SpinRecord> {
    const newRecord: SpinRecord = { ...record, id: uid() };
    const records = load();
    records.push(newRecord);
    save(records);
    return newRecord;
  }

  async getRecord(email: string): Promise<SpinRecord | null> {
    return (
      load().find((r) => r.email.toLowerCase() === email.toLowerCase()) ?? null
    );
  }
}
