import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { MapPage } from './pages/MapPage';
import { RouteDetailPage } from './pages/RouteDetailPage';
import { LivePage } from './pages/LivePage';
import { AboutPage } from './pages/AboutPage';
import { DocPage } from './pages/DocPage';
import { OperatorPage } from './pages/OperatorPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/map', element: <MapPage /> },
    { path: '/routes/:id', element: <RouteDetailPage /> },
    { path: '/live', element: <LivePage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/doc', element: <DocPage /> },
    { path: '/operator', element: <OperatorPage /> },
    { path: '*', element: <NotFoundPage /> },
  ]);
}
