import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <h2 className="font-serif text-2xl">About</h2>
      <p className="font-serif text-sm leading-relaxed">
        PRISMA CalArts is a site-aware performance that treats the campus as both score and stage. The map you see here
        is a simplified scaffold meant to be read alongside the live procession and its sound.
      </p>
      <p className="font-serif text-sm leading-relaxed">
        Four routes (A–D) begin at separate points, threading through levels and courtyards before converging at The
        Wild Beast. The floor toggles and animations are intentionally readable so students and visitors can follow
        without an instruction manual.
      </p>
      <p className="font-serif text-sm leading-relaxed">
        This first release keeps the structure small: a clear config, a React map shell, and placeholder text blocks.
        Edit the SVG, refine the geometry, and add the rituals that belong to each line.
      </p>
    </div>
  );
};
