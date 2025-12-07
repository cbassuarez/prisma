import React, { useState } from 'react';
import { prismaMapConfig } from '@prisma/config';

export const OperatorPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAuthorized(input === prismaMapConfig.operator.password);
  };

  if (!authorized) {
    return (
      <div className="max-w-md flex flex-col gap-3">
        <h2 className="font-serif text-2xl">Operator</h2>
        <p className="font-serif text-sm leading-relaxed">
          Enter the operator passphrase to reveal controls. This stub is intentionally simple; wire it to live tools as
          the performance kit evolves.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border border-neutral-400 rounded px-3 py-2 text-sm font-mono flex-1"
            placeholder="Password"
          />
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-50 text-[10px] font-mono uppercase tracking-[0.18em]"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-serif text-2xl">Operator Console</h2>
      <p className="font-mono text-[11px] text-neutral-600">
        Config version: {prismaMapConfig.routes.length} routes · {prismaMapConfig.nodes.length} nodes · floors:{' '}
        {prismaMapConfig.floors.join(', ')}
      </p>
      <div className="border border-neutral-300 rounded-2xl p-4 bg-white">
        <p className="font-serif text-sm mb-2">Quick status</p>
        <ul className="list-disc list-inside font-mono text-[11px] space-y-1">
          <li>Show start: {prismaMapConfig.show.startISO}</li>
          <li>Show end: {prismaMapConfig.show.endISO}</li>
          <li>Beast node: {prismaMapConfig.beastNodeId}</li>
        </ul>
        <p className="font-mono text-[11px] text-neutral-600 mt-3">TODO: add live overrides, route pacing, and AV links.</p>
      </div>
    </div>
  );
};
