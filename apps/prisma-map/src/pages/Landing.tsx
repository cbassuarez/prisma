import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { prismaMapConfig, getPhase, Phase } from '@prisma/config';
import { RitualPhaseStrip } from '../components/RitualPhaseStrip';
import { RitualMiniMap } from '../components/RitualMiniMap';

const glitchVariants = {
  animate: {
    opacity: [0, 1, 0.76, 1],
    x: [0, -3, 2, -1, 0],
    y: [8, -4, 0, 2, 0],
    filter: ['none', 'drop-shadow(0 0 4px rgba(0,0,0,0.25))', 'none'],
    transition: { duration: 1.3, ease: 'easeOut', times: [0, 0.18, 0.36, 0.62, 1] },
  },
};

const anchorDrift = {
  animate: {
    x: [0, 2, -2, 1, 0],
    opacity: [0.92, 1, 0.95, 1, 0.94],
    transition: { duration: 26, repeat: Infinity, ease: 'easeInOut' },
  },
};

const ghostLabels = [
  'L2.5 – hallway echo',
  'MARK TAPER',
  'EAST WING',
  '34.157°N 118.289°W',
  'threshold',
];

const phaseToCta = (phase: Phase) => {
  if (phase === 'live') return { label: 'Choose a route to follow', variant: 'live' as const };
  if (phase === 'day-of-late' || phase === 'day-after' || phase === 'archive') {
    return { label: 'Traverse the traces', variant: 'trace' as const };
  }
  return { label: 'Explore the map', variant: 'pre' as const };
};

const phaseInvocation = (phase: Phase) => {
  if (phase === 'day-after' || phase === 'archive' || phase === 'day-of-late') {
    return {
      intro:
        'These routes once carried performers and audiences through the corridors. The lines still hum; the traces stay warm.',
      directive:
        'Start anywhere on campus, read the colored paths as afterimages, and walk toward The Wild Beast. The score remembers you.',
    };
  }

  return {
    intro:
      'Enter campus as score. This site is a palimpsest field manual: four colored routes already drawn, waiting to be walked.',
    directive:
      'Begin anywhere on campus. Attach yourself to one of four routes and a performer. Follow the corridors until they carry you to The Wild Beast at the appointed hour.',
  };
};

export const Landing: React.FC = () => {
  const phase = getPhase();
  const { label: ctaLabel, variant: ctaVariant } = phaseToCta(phase);
  const invocationCopy = phaseInvocation(phase);
  const { scrollYProgress } = useScroll();
  const ripple = useTransform(scrollYProgress, [0, 0.25, 0.6], [1, 1.012, 1.018]);
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-prisma-paper text-neutral-900">
      <LandingBackground ripple={ripple} parallax={parallax} />
      <RitualPhaseStrip phase={phase} />

      <main className="relative px-4 sm:px-6 lg:px-12 pt-8 pb-12 md:pb-16 flex flex-col gap-10 md:gap-12 lg:gap-14">
        <HeroBlock ctaLabel={ctaLabel} ctaVariant={ctaVariant} invocationCopy={invocationCopy} phase={phase} />
        <PrimaryCtaBlock ctaLabel={ctaLabel} ctaVariant={ctaVariant} />
        <HowToExperience phase={phase} />
        <RoutesOverview />
        <FooterStrip />
      </main>
    </div>
  );
};

interface HeroBlockProps {
  ctaLabel: string;
  ctaVariant: 'pre' | 'live' | 'trace';
  invocationCopy: { intro: string; directive: string };
  phase: Phase;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ ctaLabel, ctaVariant, invocationCopy, phase }) => {
  return (
    <section className="grid gap-8 lg:gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] items-start relative">
      <div className="space-y-5 relative">
        <div className="absolute -left-6 -top-8 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 rotate-[-6deg]">
          tuned // ready
        </div>
        <motion.h1
          variants={glitchVariants}
          initial="animate"
          animate="animate"
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight"
        >
          PRISMA · CalArts Edition
        </motion.h1>
        <motion.p
          className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-neutral-700"
          variants={anchorDrift}
          animate="animate"
        >
          the score wakes up in the corridors; all across campus → Wild Beast
        </motion.p>

        <div className="space-y-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-neutral-700/90">
          <p>April 22 · 8:00 PM</p>
          <p>California Institute of the Arts · The Wild Beast</p>
          <p className="text-neutral-600">Four routes · four performers · one convergence</p>
        </div>

        <div className="space-y-3">
          <p className="font-serif text-[15px] leading-relaxed text-neutral-900/90">{invocationCopy.intro}</p>
          <p className="font-serif text-[15px] leading-relaxed text-neutral-900">{invocationCopy.directive}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <PrimaryCta to="/map" variant={ctaVariant}>
            {ctaLabel}
          </PrimaryCta>
          <SecondaryCta to="/live" phase={phase} />
        </div>
      </div>

      <div className="relative">
        <div className="absolute -right-6 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-amber-200/40 via-transparent to-rose-200/30 blur-3xl" />
        <RitualMiniMap />
      </div>
    </section>
  );
};

interface PrimaryCtaProps {
  to: string;
  variant: 'pre' | 'live' | 'trace';
  children: React.ReactNode;
}

const PrimaryCta: React.FC<PrimaryCtaProps> = ({ to, variant, children }) => {
  const base =
    'inline-flex items-center justify-center px-5 py-2.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] transition-colors border shadow-[0_0_0_0_rgba(0,0,0,0.18)]';
  const styles = {
    pre: 'border-neutral-900 text-neutral-900 bg-transparent hover:bg-neutral-900/5',
    live: 'border-neutral-900 bg-neutral-900 text-amber-50 hover:bg-neutral-800',
    trace: 'border-neutral-900 text-neutral-900 bg-gradient-to-r from-white/50 via-amber-50/60 to-rose-50/60',
  }[variant];

  const animation =
    variant === 'live'
      ? { scale: [1, 1.03, 1], boxShadow: ['0 0 0 0 rgba(0,0,0,0.22)', '0 0 0 12px rgba(0,0,0,0)', '0 0 0 0 rgba(0,0,0,0.22)'] }
      : variant === 'pre'
        ? { boxShadow: ['0 0 0 0 rgba(0,0,0,0.25)', '0 0 0 6px rgba(0,0,0,0)', '0 0 0 0 rgba(0,0,0,0.25)'], opacity: [1, 0.9, 1] }
        : { filter: ['drop-shadow(0 0 0px rgba(253, 164, 72, 0.0))', 'drop-shadow(0 0 12px rgba(253, 164, 72, 0.24))', 'drop-shadow(0 0 0px rgba(253, 164, 72, 0.0))'] };

  return (
    <motion.div animate={animation} transition={{ duration: variant === 'live' ? 6 : 7.5, repeat: Infinity, ease: 'easeInOut' }}>
      <Link to={to} className={`${base} ${styles}`}>
        {children}
      </Link>
    </motion.div>
  );
};

interface SecondaryCtaProps {
  to: string;
  phase: Phase;
}

const SecondaryCta: React.FC<SecondaryCtaProps> = ({ to, phase }) => {
  const text = phase === 'live' ? 'Live monitor' : 'Operator / live feed';
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-neutral-400/80 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] bg-white/70 hover:bg-white/90 transition-colors"
    >
      {text}
    </Link>
  );
};

interface PrimaryCtaBlockProps {
  ctaLabel: string;
  ctaVariant: 'pre' | 'live' | 'trace';
}

const PrimaryCtaBlock: React.FC<PrimaryCtaBlockProps> = ({ ctaLabel, ctaVariant }) => {
  return (
    <section className="rounded-3xl border border-neutral-300/80 bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent animate-[pulse_18s_linear_infinite]" aria-hidden />
      <div className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-700">Primary move</p>
        <p className="font-serif text-lg leading-tight text-neutral-900">
          Read the overlay, feel the hum in the corridors, and step onto the path that pulls you. Every route moves toward the Beast.
        </p>
      </div>
      <div className="relative z-10">
        <PrimaryCta to="/map" variant={ctaVariant}>
          {ctaLabel}
        </PrimaryCta>
      </div>
    </section>
  );
};

const HowToExperience: React.FC<{ phase: Phase }> = ({ phase }) => {
  const step1Title = phase === 'live' ? '1. Tune in on campus' : '1. Before the start';
  const step1Body =
    phase === 'live'
      ? 'Be on campus a little before 8 PM. The performers are already moving; the score begins without ceremony.'
      : 'Arrive anywhere on campus just before 8 PM. The performers are already moving; the score begins without ceremony.';

  return (
    <section className="relative">
      <div className="absolute -left-3 -top-6 h-16 w-16 rounded-full bg-rose-200/20 blur-2xl" aria-hidden />
      <h2 className="font-serif text-xl mb-3">How to experience PRISMA</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <FieldCard number="1" title={step1Title} body={step1Body} />
        <FieldCard
          number="2"
          title="Attach to a route"
          body="Choose a colored path, align with a performer, or drift between them. The map shows hints; the bodies finish the score."
        />
        <FieldCard
          number="3"
          title="Converge at the Beast"
          body="Let the corridors carry you to The Wild Beast. All four lines close there; the sound and the archive wake together."
        />
      </div>
    </section>
  );
};

const FieldCard: React.FC<{ number: string; title: string; body: string }> = ({ number, title, body }) => (
  <div className="relative overflow-hidden rounded-2xl border border-neutral-300 bg-white/80 px-4 py-3 flex flex-col gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,199,130,0.14),transparent_40%)]" aria-hidden />
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">{title}</p>
    <p className="font-serif text-sm leading-relaxed text-neutral-900">{body}</p>
    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-neutral-500">{number}</span>
  </div>
);

const RoutesOverview: React.FC = () => {
  const routes = prismaMapConfig.routes;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-xl">Routes at a glance</h2>
        <Link to="/map" className="font-mono text-[10px] uppercase tracking-[0.18em] underline decoration-dotted">
          open map
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.id}
            to={`/routes/${route.id}`}
            className="group relative overflow-hidden rounded-2xl border border-neutral-300 bg-white/75 px-4 py-3 flex items-start gap-3 hover:border-neutral-900 transition-colors"
          >
            <div
              className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-900 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
              style={{ backgroundColor: route.color }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-50">{route.id}</span>
            </div>
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-700">{route.displayName}</p>
              <p className="font-serif text-sm leading-snug mt-1 text-neutral-900">{route.description}</p>
              <div className="mt-1 h-px w-0 group-hover:w-full bg-neutral-900/70 transition-all duration-500" />
            </div>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.08 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ background: `radial-gradient(circle at 20% 20%, ${route.color}33, transparent 45%)` }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

const FooterStrip: React.FC = () => {
  return (
    <section className="mt-6 pt-5 border-t border-neutral-300/80 text-[11px] text-neutral-700 flex flex-col md:flex-row gap-3 md:items-center md:justify-between font-mono tracking-[0.16em] uppercase">
      <p>Documentation and traces will appear here after the performance.</p>
      <p>
        Live stream + operator view at <Link to="/live" className="underline decoration-dotted">/live</Link>
      </p>
    </section>
  );
};

interface LandingBackgroundProps {
  ripple: ReturnType<typeof useTransform>;
  parallax: ReturnType<typeof useTransform>;
}

const LandingBackground: React.FC<LandingBackgroundProps> = ({ ripple, parallax }) => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ scale: ripple }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(32,32,32,0.55) 1px, transparent 0), radial-gradient(circle at 1px 1px, rgba(32,32,32,0.32) 1px, transparent 0)',
            backgroundSize: '26px 26px, 26px 26px',
            backgroundPosition: '0 0, 13px 13px',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ y: parallax, background: 'linear-gradient(115deg, rgba(255,237,213,0.18), transparent 38%, rgba(255,228,230,0.18))' }}
        />
      </motion.div>
      <div className="absolute inset-0">
        <div className="absolute top-16 left-6 text-[10px] font-mono uppercase tracking-[0.32em] text-neutral-500/50">
          CALARTS GRID / corridor overlay
        </div>
        <div className="absolute bottom-24 right-10 flex flex-col gap-1 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-500/40">
          {ghostLabels.map((label) => (
            <motion.span
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.28, 0.14] }}
              transition={{ duration: 14 + Math.random() * 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
