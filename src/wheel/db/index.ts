import { LocalStorageDB } from './localStorageDB';
import { ApiDB } from './apiDB';

export type { SpinRecord, WheelDB } from './types';
export { LocalStorageDB } from './localStorageDB';
export { ApiDB } from './apiDB';

// In development there is no backend running, so fall back to localStorage.
// In production the ApiDB hits the real API.
export const db =
  process.env.NODE_ENV === 'development'
    ? new LocalStorageDB()
    : new ApiDB('https://api.hoaxcoffee.com', process.env.REACT_APP_API_KEY!);
