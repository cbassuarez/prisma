import React from 'react';

export const DocPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 max-w-2xl">
      <h2 className="font-serif text-2xl">Documentation</h2>
      <p className="font-serif text-sm leading-relaxed">
        Documentation is in preparation. The final packet will cover wayfinding details, route briefs, and how to
        operate the map during the performance. For now, use the config package as the source of truth for routes and
        timing.
      </p>
      <p className="font-mono text-[11px] leading-relaxed text-neutral-600">
        TODO: add operator handbook, signage PDFs, and streaming guidelines.
      </p>
    </div>
  );
};
