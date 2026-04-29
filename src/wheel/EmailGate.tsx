import React, { useState } from 'react';
import { db } from './db';

interface Props {
  onValidated: (email: string) => void;
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

const EmailGate: React.FC<Props> = ({ onValidated }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError('Kérjük, adj meg egy érvényes e-mail-címet.');
      return;
    }

    setLoading(true);
    try {
      const played = await db.hasPlayed(email.trim().toLowerCase());
      if (played) {
        setError('Ezzel az e-mail-címmel már játszottál. Minden cím csak egyszer játszhat.');
      } else {
        onValidated(email.trim().toLowerCase());
      }
    } catch {
      setError('Valami hiba történt. Kérjük, próbáld újra.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="email-gate" noValidate>
      <p className="email-gate-label">Add meg az e-mail-címed a pörgetéshez</p>
      <div className="email-gate-row">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(null); }}
          placeholder="te@email.com"
          className="email-input"
          disabled={loading}
          autoComplete="email"
        />
        <button
          type="submit"
          className="email-btn"
          disabled={loading || !email}
        >
          {loading ? '...' : 'OK'}
        </button>
      </div>
      {error && <p className="email-error">{error}</p>}
    </form>
  );
};

export default EmailGate;
