import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ghostLabels = [
  { text: 'SUBLEVEL', x: 18, y: 24 },
  { text: 'L3 · VOID', x: 70, y: 18 },
  { text: 'MARK TAPER', x: 32, y: 90 },
  { text: '34.157°N 118.289°W', x: 88, y: 66 },
];

export const RitualMiniMap: React.FC = () => {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, [-24, 24], [6, -6]);
  const rotateY = useTransform(tiltX, [-24, 24], [-6, 6]);
  const floatY = useSpring(useTransform(tiltY, [-24, 24], [-6, 6]), { stiffness: 40, damping: 12 });
  const isCoarse = useMemo(() => (typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false), []);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isCoarse) return undefined;
    const handleMove = (event: MouseEvent) => {
      const card = ref.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      tiltX.set(Math.max(Math.min(x, 40), -40));
      tiltY.set(Math.max(Math.min(y, 40), -40));
    };

    const reset = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', reset);
    };
  }, [isCoarse, tiltX, tiltY]);

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto md:mx-0"
      animate={isCoarse ? { y: [0, -4, 0] } : undefined}
      transition={isCoarse ? { duration: 12, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <motion.div
        ref={ref}
        className="relative w-full overflow-hidden rounded-3xl border border-neutral-300/80 bg-gradient-to-br from-white/70 via-prisma-paper/90 to-neutral-200/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        style={isCoarse ? undefined : { rotateX, rotateY, y: floatY }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern id="ritual-map-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.9" fill="#c2b8a8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ritual-map-dots)" />
            <rect width="100%" height="100%" fill="url(#ritual-map-dots)" transform="translate(4 4)" opacity="0.26" />
          </svg>
        </div>

        <div className="relative p-5">
          <motion.svg
            viewBox="0 0 200 140"
            className="w-full h-[180px]"
            aria-hidden="true"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.path
              d="M36 30 L126 30 L150 48 L150 86 L102 86 L82 104 L36 104 Z"
              fill="none"
              stroke="#141414"
              strokeWidth={1.4}
              strokeDasharray="2 5"
              opacity={0.9}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />

            <g opacity={0.52}>
              <path d="M18 96 C48 72 92 64 138 70" stroke="#e34e4e" strokeWidth={1.2} strokeDasharray="1 4" fill="none" />
              <path d="M40 40 C78 60 118 58 150 62" stroke="#2f66d0" strokeWidth={1.2} strokeDasharray="1 4" fill="none" />
              <path d="M52 26 C94 28 134 30 160 38" stroke="#2f9d4d" strokeWidth={1.2} strokeDasharray="1 4" fill="none" />
              <path d="M52 112 C96 102 126 106 166 116" stroke="#e0b422" strokeWidth={1.2} strokeDasharray="1 4" fill="none" />
            </g>

            <motion.circle
              cx={158}
              cy={104}
              r={9}
              fill="rgba(0,0,0,0.18)"
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx={158} cy={104} r={4.5} fill="#0f0f0f" />
            <text
              x={158}
              y={122}
              textAnchor="middle"
              fill="#0f0f0f"
              style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 7, letterSpacing: 1.5 }}
            >
              THE WILD BEAST
            </text>

            {ghostLabels.map((label) => (
              <motion.text
                key={label.text}
                x={label.x}
                y={label.y}
                fill="#8f8778"
                style={{ fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 7, letterSpacing: 1.5 }}
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.35, 0.16] }}
                transition={{ duration: 10 + Math.random() * 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                {label.text}
              </motion.text>
            ))}
          </motion.svg>

          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-700">
            <span>4 routes · 1 convergence</span>
            <span>Campus overlay</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
