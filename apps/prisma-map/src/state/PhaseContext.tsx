import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getPhase, Phase, PhaseOverride, PhaseResult } from '@prisma/config';

interface PhaseContextValue {
  phase: Phase;
  nextChangeAt: Date | null;
  override: PhaseOverride;
  setOverride: (next: PhaseOverride) => void;
  lastTransition?: {
    id: number;
    from: Phase;
    to: Phase;
    at: number;
  } | null;
}

const PhaseContext = createContext<PhaseContextValue | null>(null);

const STORAGE_KEY = 'prisma.phaseOverride';

function parseOverrideParam(search: string): PhaseOverride | null {
  const params = new URLSearchParams(search);
  const raw = params.get('phase');
  if (!raw) return null;
  const value = raw.toLowerCase();
  if (value === 'auto') return 'auto';
  if (value === 'pre' || value === 'live' || value === 'archive') return value;
  return null;
}

export const PhaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [override, setOverrideState] = useState<PhaseOverride>('auto');
  const [phaseResult, setPhaseResult] = useState<PhaseResult>(() => getPhase());
  const [lastTransition, setLastTransition] = useState<PhaseContextValue['lastTransition']>(null);
  const prevPhaseRef = useRef<Phase | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const parsed = parseOverrideParam(window.location.search);
    let initial: PhaseOverride = 'auto';

    if (parsed) {
      initial = parsed;
      localStorage.setItem(STORAGE_KEY, parsed);
      const url = new URL(window.location.href);
      url.searchParams.delete('phase');
      window.history.replaceState({}, document.title, url.toString());
    } else {
      const stored = localStorage.getItem(STORAGE_KEY) as PhaseOverride | null;
      if (stored === 'pre' || stored === 'live' || stored === 'archive' || stored === 'auto') {
        initial = stored;
      }
    }

    setOverrideState(initial);
  }, []);

  useEffect(() => {
    const result = getPhase({ now: new Date(), override });
    setPhaseResult(result);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (override === 'auto' && result.nextChangeAt) {
      const delay = result.nextChangeAt.getTime() - Date.now();
      timeoutRef.current = window.setTimeout(() => {
        setPhaseResult(getPhase({ now: new Date(), override }));
      }, Math.max(delay, 0));
    }

    intervalRef.current = window.setInterval(() => {
      setPhaseResult(getPhase({ now: new Date(), override }));
    }, 45_000);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [override]);

  useEffect(() => {
    if (prevPhaseRef.current && prevPhaseRef.current !== phaseResult.phase) {
      setLastTransition({ id: Date.now(), from: prevPhaseRef.current, to: phaseResult.phase, at: Date.now() });
    }
    prevPhaseRef.current = phaseResult.phase;
  }, [phaseResult.phase]);

  const value = useMemo<PhaseContextValue>(
    () => ({
      phase: phaseResult.phase,
      nextChangeAt: phaseResult.nextChangeAt,
      override,
      setOverride: next => {
        setOverrideState(next);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, next);
        }
      },
      lastTransition
    }),
    [phaseResult, override, lastTransition]
  );

  return <PhaseContext.Provider value={value}>{children}</PhaseContext.Provider>;
};

export function usePhase(): PhaseContextValue {
  const ctx = useContext(PhaseContext);
  if (!ctx) {
    throw new Error('usePhase must be used within PhaseProvider');
  }
  return ctx;
}

