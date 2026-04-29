import React, { useState } from 'react';
import { Prize } from './wheelData';

interface Props {
  prize: Prize;
  onClose: () => void;
}

const PrizeModal: React.FC<Props> = ({ prize, onClose }) => {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    const text = prize.promoCode;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => markCopied())
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text: string) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); markCopied(); } catch {}
    document.body.removeChild(ta);
  }

  function markCopied() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-card ${prize.isJackpot ? 'modal-jackpot' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Bezárás">
          ✕
        </button>

        {prize.isJackpot ? (
          <>
            <div className="modal-icon">🏆</div>
            <h2 className="modal-title jackpot-title">JACKPOT!</h2>
            <p className="modal-subtitle">Hihetetlen! A főnyereményt nyerted!</p>
          </>
        ) : (
          <>
            <div className="modal-icon">🎉</div>
            <h2 className="modal-title">Gratulálunk!</h2>
            <p className="modal-subtitle">Nyertél egy</p>
          </>
        )}

        <p className="modal-reward">{prize.description}</p>

        <div className="promo-block">
          <p className="promo-label">Promo kód</p>
          <button
            className="promo-code-btn"
            onClick={copyCode}
            title="Kattints a másoláshoz"
          >
            <span className={`promo-code-value ${copied ? 'promo-copied' : ''}`}>
              {prize.promoCode}
            </span>
            <span className="promo-copy-hint">
              {copied ? '✓ Másolva' : 'Kattints a másoláshoz'}
            </span>
          </button>
        </div>

        <p className="modal-footer">
          A kódot az előfizetésnél vagy partnerünknél tudod beváltani.
        </p>

        <button className="modal-btn" onClick={onClose}>
          Bezárás
        </button>
      </div>
    </div>
  );
};

export default PrizeModal;
