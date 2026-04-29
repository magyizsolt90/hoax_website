export interface SpinRecord {
  id: string;
  timestamp: string;
  email: string;
  reward: string;
  promoCode: string;
}

export interface WheelDB {
  hasPlayed(email: string): Promise<boolean>;
  saveRecord(record: Omit<SpinRecord, 'id'>): Promise<SpinRecord>;
  getRecord(email: string): Promise<SpinRecord | null>;
}
