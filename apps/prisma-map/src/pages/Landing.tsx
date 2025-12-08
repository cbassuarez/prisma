import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { prismaMapConfig, getPhase } from '@prisma/config';

const titleContainerVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const titleLetterVariants = {
  initial: { opacity: 0, y: 12 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.04,
      duration: 0.22,
      ease: 'easeOut',
    },
  }),
};

const miniMapVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 } },
};

const taglineDriftVariants = {
  initial: { x: 0 },
  animate: {
    x: 3,
    transition: {
      duration: 24,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

const haloVariants = {
  pulse: {
    scale: [1, 1.06, 1],
    opacity: [0.55, 0.9, 0.55],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const primaryCtaMotion = {
  pulse: {
    scale: [1, 1.02, 1],
    boxShadow: ['0 0 0 0 rgba(0,0,0,0.45)', '0 0 0 6px rgba(0,0,0,0.0)', '0 0 0 0 rgba(0,0,0,0.45)'],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

export const Landing: React.FC = () => {
  return (
    <div className="relative flex flex-col gap-6 md:gap-8 lg:gap-10 py-6">
      <LandingBackgroundLayer />
      <LandingHero />
      <HowToExperience />
      <RoutesOverview />
      <CreditsStrip />
    </div>
  );
};

const LandingBackgroundLayer: React.FC = () => {
  // Full-page subtle dot grid behind the content.
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="landing-dot-grid"
            x="0"
            y="0"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="0.8" fill="#d6cdbf" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#landing-dot-grid)" />
      </svg>
    </div>
  );
};

const LandingHero: React.FC = () => {
  const phase = getPhase();

  let primaryCtaLabel = 'Explore the map';
  let primaryCtaSolid = false;

  if (phase === 'day-of-early') {
    primaryCtaLabel = 'Preview the routes';
  } else if (phase === 'live') {
    primaryCtaLabel = 'Open the map and choose a route';
    primaryCtaSolid = true;
  } else if (phase === 'day-of-late') {
    primaryCtaLabel = 'See where they walked tonight';
  } else if (phase === 'day-after' || phase === 'archive') {
    primaryCtaLabel = 'Traverse the traces';
  }

  let secondaryCtaLabel = 'About this experiment';
  if (phase === 'pre' || phase === 'day-of-early') {
    secondaryCtaLabel = 'How the performance works';
  }

  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start mb-4 md:mb-6 lg:mb-8">
      <motion.div
        variants={titleContainerVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="space-y-4"
      >
        <AnimatedTitle />

        <motion.p
          className="font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase mt-1 text-neutral-600"
          variants={taglineDriftVariants}
          initial="initial"
          animate="animate"
        >
          the score wakes up in the corridors · all across campus → the Wild Beast
        </motion.p>

        <div className="space-y-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em]">
          <p>April 22 · 8:00 PM</p>
          <p>California Institute of the Arts · The Wild Beast</p>
          <p className="text-neutral-500">
            The audience starts on campus and converges at the Beast.
          </p>
        </div>

        <p className="font-serif text-sm sm:text-[15px] leading-relaxed max-w-xl">
          Four performers begin inside the score before you see them. They move through hallways, courtyards, loading
          docks, and thresholds, following four colored routes that all converge at The Wild Beast. This site is a quiet
          instrument: a map, a set of instructions, and a way of tuning yourself to the campus as it changes.
        </p>

        <p className="font-serif text-sm sm:text-[15px] leading-relaxed max-w-xl text-neutral-800">
          Arriving with this page open is a choice to follow, to drift, or to get lost on purpose.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <PrimaryCta to="/map" solid={primaryCtaSolid}>
            {primaryCtaLabel}
          </PrimaryCta>
          <SecondaryCta to="/about">{secondaryCtaLabel}</SecondaryCta>
        </div>
      </motion.div>

      <MiniMapCard />
    </section>
  );
};

const AnimatedTitle: React.FC = () => {
  const mainWord = 'PRISMA';
  const secondary = '· CalArts Edition';

  return (
    <motion.h1
      className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight flex flex-wrap items-baseline gap-x-2 gap-y-1"
      variants={titleContainerVariants}
      initial="initial"
      animate="animate"
    >
      <span className="inline-flex">
        {mainWord.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            variants={titleLetterVariants}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="text-2xl sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.25, ease: 'easeOut' }}
      >
        {secondary}
      </motion.span>
    </motion.h1>
  );
};

interface PrimaryCtaProps {
  to: string;
  solid: boolean;
  children: React.ReactNode;
}

const PrimaryCta: React.FC<PrimaryCtaProps> = ({ to, solid, children }) => {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] border transition-colors';
  const solidClasses = solid
    ? 'border-neutral-900 bg-neutral-900 text-neutral-50'
    : 'border-neutral-900 bg-transparent text-neutral-900';
  return (
    <motion.div
      variants={primaryCtaMotion}
      animate={solid ? 'pulse' : undefined}
      className="inline-flex"
    >
      <Link
        to={to}
        className={`${baseClasses} ${solidClasses}`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

interface SecondaryCtaProps {
  to: string;
  children: React.ReactNode;
}

const SecondaryCta: React.FC<SecondaryCtaProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-neutral-400 text-[10px] font-mono uppercase tracking-[0.18em] bg-prisma-paper/80"
    >
      {children}
    </Link>
  );
};

const MiniMapCard: React.FC = () => {
  return (
    <motion.div
      className="hidden md:flex justify-end"
      variants={miniMapVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="w-64 h-40 rounded-3xl border border-neutral-300 bg-prisma-paper shadow-sm overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Dot grid background */}
        <div className="absolute inset-0" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="hero-dot-grid"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1.2" cy="1.2" r="0.7" fill="#d6cdbf" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
          </svg>
        </div>

        {/* Building outline + Beast marker + faint routes */}
        <div className="absolute inset-3 flex items-center justify-center">
          <svg
            viewBox="0 0 200 120"
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* CalArts-ish footprint */}
            <path
              d="M38 26 L120 26 L138 40 L138 74 L90 74 L74 86 L38 86 Z"
              fill="none"
              stroke="#444"
              strokeWidth={1.2}
            />

            {/* Faint route hints */}
            <path
              d="M20 90 C40 70 80 60 120 65"
              stroke="#e34e4e"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="2 4"
              fill="none"
              opacity={0.35}
            />
            <path
              d="M30 35 C55 50 95 48 130 54"
              stroke="#2f66d0"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="2 4"
              fill="none"
              opacity={0.35}
            />
            <path
              d="M60 92 C90 82 115 88 145 96"
              stroke="#e0b422"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="2 4"
              fill="none"
              opacity={0.35}
            />
            <path
              d="M50 30 C72 32 100 30 132 32"
              stroke="#2f9d4d"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeDasharray="2 4"
              fill="none"
              opacity={0.35}
            />

            {/* Beast marker + halo */}
            <motion.circle
              cx={155}
              cy={90}
              r={8}
              fill="rgba(0,0,0,0.12)"
              variants={haloVariants}
              animate="pulse"
            />
            <circle cx={155} cy={90} r={4} fill="#111111" />
            <text
              x={155}
              y={105}
              textAnchor="middle"
              fill="#111111"
              style={{
                fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 7,
                letterSpacing: 1.5,
              }}
            >
              THE WILD BEAST
            </text>

            {/* Ghost labels */}
            <text
              x={32}
              y={32}
              fill="#99978b"
              style={{
                fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 7,
                letterSpacing: 1.5,
              }}
              opacity={0.4}
            >
              SUBLEVEL
            </text>
            <text
              x={45}
              y={78}
              fill="#99978b"
              style={{
                fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 7,
                letterSpacing: 1.5,
              }}
              opacity={0.34}
            >
              CORRIDOR
            </text>
            <text
              x={112}
              y={40}
              fill="#99978b"
              style={{
                fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 7,
                letterSpacing: 1.5,
              }}
              opacity={0.34}
            >
              MARK TAPER
            </text>
            <text
              x={24}
              y={100}
              fill="#99978b"
              style={{
                fontFamily: 'IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 7,
                letterSpacing: 1.5,
              }}
              opacity={0.34}
            >
              END OF THE WORLD
            </text>
          </svg>
        </div>

        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">
            Campus routes
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-600">
            4 paths · 1 convergence
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HowToExperience: React.FC = () => {
  const phase = getPhase();

  const step1Title = phase === 'live' ? '1. Join the campus' : '1. On the night';
  const step1Body =
    phase === 'live'
      ? 'Be anywhere on campus with your phone a little before 8 PM. PRISMA does not start with a curtain; it starts with people already moving through the score.'
      : 'On April 22, be somewhere on campus a little before 8 PM. PRISMA does not start with a curtain; it starts with people already moving through the score.';

  return (
    <section className="mt-2 md:mt-4 lg:mt-6 mb-4 md:mb-6 lg:mb-8">
      <h2 className="font-serif text-xl mb-3">How to experience PRISMA</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-300 bg-prisma-paper/80 px-4 py-3 flex flex-col gap-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            {step1Title}
          </p>
          <p className="font-serif text-sm leading-relaxed">
            {step1Body}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-300 bg-prisma-paper/80 px-4 py-3 flex flex-col gap-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            2. Choose a route (or don&apos;t)
          </p>
          <p className="font-serif text-sm leading-relaxed">
            Use this site to pick a colored path, attach yourself to a performer, or drift between them. The map knows
            some of the routes; the performers know the rest.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-300 bg-prisma-paper/80 px-4 py-3 flex flex-col gap-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            3. Converge at the Beast
          </p>
          <p className="font-serif text-sm leading-relaxed">
            All routes eventually arrive at The Wild Beast. The performance ends when the last arrival settles and the
            score stops walking.
          </p>
        </div>
      </div>
    </section>
  );
};

const RoutesOverview: React.FC = () => {
  const routes = prismaMapConfig.routes;

  return (
    <section className="mt-2 md:mt-3 lg:mt-4 mb-4 md:mb-6">
      <div className="flex items-baseline justify-between mb-2 gap-4">
        <h2 className="font-serif text-xl">Routes at a glance</h2>
        <Link
          to="/map"
          className="font-mono text-[10px] uppercase tracking-[0.18em] underline decoration-dotted"
        >
          Open full map
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.id}
            to={`/routes/${route.id}`}
            className="group rounded-2xl border border-neutral-300 bg-prisma-paper/85 px-4 py-3 flex items-start gap-3 hover:border-neutral-800 transition-colors"
          >
            <span
              className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-neutral-900"
              style={{ backgroundColor: route.color }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-50">
                {route.id}
              </span>
            </span>
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">
                {route.displayName}
              </p>
              <p className="font-serif text-sm leading-snug mt-1 text-neutral-900">
                {route.description}
              </p>
              <div className="mt-1 h-px w-0 group-hover:w-full bg-neutral-900/70 transition-all duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const CreditsStrip: React.FC = () => {
  return (
    <section className="mt-4 pt-4 border-t border-neutral-300 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[11px] text-neutral-600">
      <p className="font-mono tracking-[0.16em] uppercase">
        Concept and direction: Sebastian Suarez · Performers and camera: CalArts collaborators
      </p>
      <p className="font-mono tracking-[0.16em] uppercase">
        The performance is documented on video. By entering the routes, you may appear on camera as part of the work.
      </p>
    </section>
  );
};
