import React from 'react';
import { getPhase, Phase } from '@prisma/config';

interface Props {
  allowed: Phase[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PhaseGuard: React.FC<Props> = ({ allowed, fallback = null, children }) => {
  const phase = getPhase();
  if (!allowed.includes(phase)) return <>{fallback}</>;
  return <>{children}</>;
};
