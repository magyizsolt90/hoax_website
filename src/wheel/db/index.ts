import { LocalStorageDB } from './localStorageDB';

export type { SpinRecord, WheelDB } from './types';
export { LocalStorageDB } from './localStorageDB';
export { ApiDB } from './apiDB';

// ─── Active implementation ──────────────────────────────────────────────────
// To switch to the real API, replace the last line with:
//   import { ApiDB } from './apiDB';
//   export const db = new ApiDB('https://api.hoaxcoffee.com', process.env.REACT_APP_API_KEY!);
export const db = new ApiDB('https://api.hoaxcoffee.com', process.env.REACT_APP_API_KEY!);
