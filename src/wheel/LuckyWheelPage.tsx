import React, { useState } from 'react';
import LuckyWheel from './LuckyWheel';
import Lever from './Lever';
import EmailGate from './EmailGate';
import PrizeModal from './PrizeModal';
import { PRIZES } from './wheelData';
import { db } from './db';

type Phase = 'email' | 'ready' | 'spinning' | 'done';

const LuckyWheelPage: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('email');
  const [userEmail, setUserEmail] = useState('');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [wonPrize, setWonPrize] = useState<(typeof PRIZES)[number] | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleEmailValidated(email: string) {
    setUserEmail(email);
    setPhase('ready');
  }

  function handleLeverPull() {
    if (phase !== 'ready') return;
    const idx = Math.floor(Math.random() * PRIZES.length);
    setTargetIndex(idx);
    setPhase('spinning');
  }

  async function handleSpinComplete(prizeIdx: number) {
    const prize = PRIZES[prizeIdx];
    await db.saveRecord({
      timestamp: new Date().toISOString(),
      email: userEmail,
      reward: prize.description,
      promoCode: prize.promoCode,
    });
    setWonPrize(prize);
    setPhase('done');
    setShowModal(true);
  }

  return (
    <div className="wheel-page">
      {/* Background glow circles */}
      <div className="wheel-bg-glow wheel-bg-glow-1" />
      <div className="wheel-bg-glow wheel-bg-glow-2" />

      {/* Header */}
      <header className="wheel-header">
        <a href="https://www.hoaxcoffee.com/" target="_blank" rel="noreferrer">
          <img src="/icons/hoax.svg" alt="HOAX" className="wheel-logo" />
        </a>
        <h1 className="wheel-title">HOAX Lucky Wheel</h1>
        <p className="wheel-subtitle">Pörgesd meg a szerencsekereket és nyerj!</p>
      </header>

      {/* Email gate */}
      {phase === 'email' && (
        <div className="wheel-gate-section">
          <EmailGate onValidated={handleEmailValidated} />
        </div>
      )}

      {/* Validated feedback */}
      {(phase === 'ready' || phase === 'spinning' || phase === 'done') && (
        <div className="wheel-gate-section">
          <p className="email-confirmed">
            ✓ <span>{userEmail}</span>
          </p>
        </div>
      )}

      {/* Wheel + Lever */}
      <div className="wheel-stage">
        <LuckyWheel
          targetIndex={targetIndex}
          spinning={phase === 'spinning'}
          onSpinComplete={handleSpinComplete}
        />
        <Lever
          onPull={handleLeverPull}
          disabled={phase !== 'ready'}
        />
      </div>

      {/* Status hint */}
      <div className="wheel-hint-area">
        {phase === 'email' && (
          <p className="wheel-hint-text">Add meg az e-mail-címed a pörgetéshez ↑</p>
        )}
        {phase === 'ready' && (
          <p className="wheel-hint-text animate-pulse">Húzd meg az emeltyűt! →</p>
        )}
        {phase === 'spinning' && (
          <p className="wheel-hint-text">Pörög a szerencsekerék…</p>
        )}
        {phase === 'done' && (
          <button className="wheel-show-prize-btn" onClick={() => setShowModal(true)}>
            Megnyeremény megtekintése
          </button>
        )}
      </div>

      {/* Prize modal */}
      {showModal && wonPrize && (
        <PrizeModal prize={wonPrize} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default LuckyWheelPage;
