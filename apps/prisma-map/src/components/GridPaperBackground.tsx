import React from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';

interface GridPaperBackgroundProps {
  variant?: 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
}

export const GridPaperBackground: React.FC<GridPaperBackgroundProps> = ({ variant = 'light', children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * 6);
    y.set(relY * 6);
  }

  const bgClass =
    variant === 'dark'
      ? 'bg-[radial-gradient(circle_at_1px_1px,#333_1px,transparent_0)] [background-size:20px_20px] bg-black text-rose-50'
      : 'bg-[radial-gradient(circle_at_1px_1px,#d6cdbf_1px,transparent_0)] [background-size:22px_22px] bg-prisma-paper text-prisma-ink';

  return (
    <div className={`relative overflow-hidden ${bgClass} ${className ?? ''}`} onPointerMove={handlePointerMove}>
      <motion.div
        className="absolute inset-[-10%] opacity-70"
        style={{ translateX: x, translateY: y, scale }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

