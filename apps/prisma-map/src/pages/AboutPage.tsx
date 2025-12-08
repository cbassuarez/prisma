import React from 'react';
import { GridPaperBackground } from '../components/GridPaperBackground';
import { EmergencyOverlay } from '../components/EmergencyOverlay';

export const AboutPage: React.FC = () => {
  return (
    <GridPaperBackground variant="light" className="rounded-3xl overflow-hidden">
      <div className="p-6 space-y-6 max-w-4xl">
        <section className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-600">About the piece</p>
          <h2 className="font-serif text-3xl">PRISMA · CalArts Edition</h2>
          <p className="font-serif text-sm leading-relaxed text-neutral-800">
            PRISMA CalArts is a site-aware performance that treats the campus as both score and stage. The map is a
            simplified scaffold meant to be read alongside the live procession and its silent signals.
          </p>
          <p className="font-serif text-sm leading-relaxed text-neutral-800">
            Four routes (A–D) begin at separate points, threading through levels and courtyards before converging at The
            Wild Beast. The floor toggles and animations stay readable so students and visitors can follow without an
            instruction manual.
          </p>
        </section>

        <section className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-600">How to experience it</p>
          <div className="space-y-2 font-serif text-sm leading-relaxed text-neutral-800">
            <p>Start anywhere on routes A–D; pick the line whose color you can see or imagine.</p>
            <p>Read the hallways like a book of moves. Each corridor is an instruction; each corner is a decision.</p>
            <p>Let the lines carry you to THE WILD BEAST at 8PM. Arrive with your route and leave an afterimage.</p>
          </div>
        </section>
      </div>
      <EmergencyOverlay density="low" />
    </GridPaperBackground>
  );
};
