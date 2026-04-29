import React, { useEffect, useRef, useState } from 'react';
import { PRIZES, SEGMENT_ANGLE, SEGMENT_COUNT } from './wheelData';

// ─── Geometry helpers ────────────────────────────────────────────────────────

const CX = 200;
const CY = 200;
const R = 170;
const R_INNER = 38;
const R_LIGHTS = 188;
const LIGHT_COUNT = 30;
const SPIN_DURATION = 5200; // ms

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function slicePath(startDeg: number, endDeg: number): string {
  const s = polar(R, startDeg);
  const e = polar(R, endDeg);
  const si = polar(R_INNER, startDeg);
  const ei = polar(R_INNER, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${si.x} ${si.y}`,
    `L ${s.x} ${s.y}`,
    `A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${R_INNER} ${R_INNER} 0 ${large} 0 ${si.x} ${si.y}`,
    'Z',
  ].join(' ');
}

const LIGHTS = Array.from({ length: LIGHT_COUNT }, (_, i) =>
  polar(R_LIGHTS, (i * 360) / LIGHT_COUNT)
);

// Segment colours: alternating red / gold; jackpot gets bright gold
const SEG_RED = '#B92020';
const SEG_RED_STROKE = '#8B1010';
const SEG_GOLD = '#D4840A';
const SEG_GOLD_STROKE = '#A0620A';
const SEG_JACKPOT = '#FFD700';
const SEG_JACKPOT_STROKE = '#B8960A';

function segColor(idx: number, isJackpot: boolean) {
  if (isJackpot) return { fill: SEG_JACKPOT, stroke: SEG_JACKPOT_STROKE };
  return idx % 2 === 0
    ? { fill: SEG_RED, stroke: SEG_RED_STROKE }
    : { fill: SEG_GOLD, stroke: SEG_GOLD_STROKE };
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  targetIndex: number | null;
  spinning: boolean;
  onSpinComplete: (prizeIndex: number) => void;
}

const LuckyWheel: React.FC<Props> = ({ targetIndex, spinning, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [animating, setAnimating] = useState(false);
  const baseRotation = useRef(0);
  const callbackFired = useRef(false);

  useEffect(() => {
    if (!spinning || targetIndex === null || animating) return;

    callbackFired.current = false;
    setAnimating(true);

    // Formula: rotate so segment targetIndex ends up under the pointer (top).
    // Segment i centre = i * SEGMENT_ANGLE + SEGMENT_ANGLE/2 degrees from top.
    const segCentre = targetIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const fullSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const target = baseRotation.current + fullSpins + segCentre;
    baseRotation.current = target;
    setRotation(target);

    const t = setTimeout(() => {
      setAnimating(false);
      if (!callbackFired.current) {
        callbackFired.current = true;
        onSpinComplete(targetIndex);
      }
    }, SPIN_DURATION + 200);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, targetIndex]);

  return (
    <div className="wheel-wrapper">
      {/* Fixed pointer triangle */}
      <div className="wheel-pointer">
        <svg width="28" height="36" viewBox="0 0 28 36">
          <defs>
            <linearGradient id="ptrGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
          </defs>
          <polygon
            points="14,34 1,2 27,2"
            fill="url(#ptrGrad)"
            stroke="#FF6600"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Rotating wheel */}
      <svg
        viewBox="0 0 400 400"
        className="wheel-svg"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: animating
            ? `transform ${SPIN_DURATION}ms cubic-bezier(0.05, 0.82, 0.18, 1)`
            : 'none',
          filter: animating ? 'drop-shadow(0 0 18px rgba(255,120,0,0.5))' : 'none',
        }}
      >
        <defs>
          {/* Hub gradient */}
          <radialGradient id="hubG" cx="38%" cy="32%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#D0D0D0" />
            <stop offset="100%" stopColor="#707070" />
          </radialGradient>
          {/* Rim gradient */}
          <radialGradient id="rimG" cx="50%" cy="50%" r="50%">
            <stop offset="88%" stopColor="#1A0000" stopOpacity="0" />
            <stop offset="100%" stopColor="#1A0000" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Outer glow disc */}
        <circle cx={CX} cy={CY} r={R + 24} fill="#3D0000" opacity="0.7" />

        {/* Segments */}
        {PRIZES.map((prize, i) => {
          const start = i * SEGMENT_ANGLE;
          const end = (i + 1) * SEGMENT_ANGLE;
          const mid = start + SEGMENT_ANGLE / 2;
          const { fill, stroke } = segColor(i, prize.isJackpot);
          const tp = polar(R * 0.67, mid);
          const tpSub = polar(R * 0.55, mid);
          const rot = mid - 90;

          return (
            <g key={i}>
              <path d={slicePath(start, end)} fill={fill} stroke={stroke} strokeWidth="1.2" />
              {/* Primary label */}
              <text
                x={tp.x}
                y={tp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={prize.isJackpot ? '#1A0000' : 'white'}
                fontSize={prize.isJackpot ? 10 : 11}
                fontWeight="700"
                fontFamily="Rubik, sans-serif"
                transform={`rotate(${rot}, ${tp.x}, ${tp.y})`}
                style={{ userSelect: 'none' }}
              >
                {prize.label}
              </text>
              {/* Sublabel */}
              {prize.sublabel && (
                <text
                  x={tpSub.x}
                  y={tpSub.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={prize.isJackpot ? '#1A0000' : 'rgba(255,255,255,0.85)'}
                  fontSize={8}
                  fontWeight="600"
                  fontFamily="Rubik, sans-serif"
                  transform={`rotate(${rot}, ${tpSub.x}, ${tpSub.y})`}
                  style={{ userSelect: 'none' }}
                >
                  {prize.sublabel}
                </text>
              )}
            </g>
          );
        })}

        {/* Rim overlay (edge darkening) */}
        <circle cx={CX} cy={CY} r={R} fill="url(#rimG)" />

        {/* Gold border ring */}
        <circle
          cx={CX}
          cy={CY}
          r={R + 4}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="8"
        />

        {/* Bulb lights */}
        {LIGHTS.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r="5.5"
            fill={i % 2 === 0 ? '#FFE066' : '#FF8822'}
            stroke="#8B6000"
            strokeWidth="0.8"
            className={
              animating
                ? i % 2 === 0
                  ? 'bulb-blink'
                  : 'bulb-blink-alt'
                : ''
            }
          />
        ))}

        {/* Spoke separators – subtle lines from hub to rim */}
        {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
          const a = i * SEGMENT_ANGLE;
          const inner = polar(R_INNER, a);
          const outer = polar(R, a);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="1"
            />
          );
        })}

        {/* Center hub */}
        <circle cx={CX} cy={CY} r={R_INNER} fill="url(#hubG)" />
        <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke="#D4AF37" strokeWidth="3" />
        {/* Hub bolts */}
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const p = polar(R_INNER - 10, a);
          return (
            <circle key={a} cx={p.x} cy={p.y} r="3.5" fill="#AAAAAA" stroke="#666" strokeWidth="0.8" />
          );
        })}
        {/* Hub centre dot */}
        <circle cx={CX} cy={CY} r="6" fill="#888" stroke="#555" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default LuckyWheel;
