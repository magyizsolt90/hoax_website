import React, { useState } from 'react';

interface Props {
  onPull: () => void;
  disabled: boolean;
}

const Lever: React.FC<Props> = ({ onPull, disabled }) => {
  const [pulling, setPulling] = useState(false);

  function handlePull() {
    if (disabled || pulling) return;
    setPulling(true);
    setTimeout(() => {
      setPulling(false);
      onPull();
    }, 550);
  }

  return (
    <div className="lever-container" aria-label="Spin lever" role="button" tabIndex={0}
      onClick={handlePull}
      onKeyDown={(e) => e.key === 'Enter' && handlePull()}
    >
      {/* Knob */}
      <div
        className="lever-knob"
        style={{
          transform: pulling ? 'translateY(64px)' : 'translateY(0)',
          transition: pulling
            ? 'transform 0.25s ease-in'
            : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.45 : 1,
        }}
      >
        {/* Ball */}
        <div className="lever-ball" />
        {/* Rod segment above base */}
        <div className="lever-rod" />
      </div>

      {/* Fixed base */}
      <div className="lever-base" style={{ opacity: disabled ? 0.45 : 1 }} />

      {!disabled && !pulling && (
        <p className="lever-hint">PULL</p>
      )}
    </div>
  );
};

export default Lever;
