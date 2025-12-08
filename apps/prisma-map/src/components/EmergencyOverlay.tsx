import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { emergencyPhrases, proTipPhrases } from '../content/emergencyPhrases';

interface EmergencyOverlayProps {
  density?: 'low' | 'medium';
}

type FloatingPhrase = {
  id: number;
  text: string;
  position: 'left' | 'right';
};

export const EmergencyOverlay: React.FC<EmergencyOverlayProps> = ({ density = 'low' }) => {
  const pool = useMemo(() => [...emergencyPhrases, ...proTipPhrases], []);
  const [active, setActive] = useState<FloatingPhrase[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (Math.random() > (density === 'medium' ? 0.65 : 0.8)) {
        spawn();
      }
    };

    const handlePointer = (e: PointerEvent) => {
      if (e.movementX * e.movementX + e.movementY * e.movementY > 900 && Math.random() > 0.4) {
        spawn();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointer, { passive: true });
    const seed = window.setInterval(() => spawn(), density === 'medium' ? 15000 : 24000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointer);
      window.clearInterval(seed);
    };
  }, [density, pool]);

  function spawn() {
    const text = pool[Math.floor(Math.random() * pool.length)];
    if (!text) return;
    const phrase: FloatingPhrase = {
      id: Date.now(),
      text,
      position: Math.random() > 0.5 ? 'left' : 'right'
    };

    setActive(prev => [...prev.filter(p => Date.now() - p.id < 5000), phrase]);
    window.setTimeout(() => {
      setActive(prev => prev.filter(p => p.id !== phrase.id));
    }, 4200);
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-end p-4 gap-2">
      <AnimatePresence>
        {active.map(item => (
          <motion.div
            key={item.id}
            className={`max-w-xs md:max-w-sm ${item.position === 'left' ? 'self-start' : 'self-end'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="rounded-lg border border-rose-500/70 bg-[radial-gradient(circle_at_1px_1px,#0f0f0f_1px,transparent_0)] [background-size:18px_18px] bg-black/85 px-4 py-3 text-rose-50 shadow-lg">
              <p className="font-mono text-[11px] leading-relaxed tracking-[0.16em]">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

