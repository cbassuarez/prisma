import React from 'react';
import { Phase } from '@prisma/config';
import { usePhase } from '../state/PhaseContext';

interface Props {
  allowed: Phase[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PhaseGuard: React.FC<Props> = ({ allowed, fallback = null, children }) => {
  const { phase } = usePhase();
  if (!allowed.includes(phase)) return <>{fallback}</>;
  return <>{children}</>;
};
