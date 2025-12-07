import React from 'react';
import { MapView } from '../components/MapView';

export const MapPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <MapView />
    </div>
  );
};
