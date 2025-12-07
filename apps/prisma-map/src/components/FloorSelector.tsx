import React from 'react';

type FloorId = 'sub' | 'l2' | 'l3';

interface Props {
  currentFloor: FloorId;
  onChange: (floor: FloorId) => void;
}

export const FloorSelector: React.FC<Props> = ({ currentFloor, onChange }) => {
  const floors: FloorId[] = ['sub', 'l2', 'l3'];

  return (
    <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em]">
      <span className="text-neutral-600">Floor</span>
      <div className="inline-flex rounded-full border border-neutral-400 overflow-hidden">
        {floors.map(floor => {
          const active = floor === currentFloor;
          return (
            <button
              key={floor}
              type="button"
              onClick={() => onChange(floor)}
              className={`px-2 py-1 ${active ? 'bg-neutral-900 text-neutral-50' : 'bg-transparent text-neutral-800'}`}
            >
              {floor === 'sub' ? 'SUB' : floor.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
