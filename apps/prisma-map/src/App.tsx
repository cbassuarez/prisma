import React from 'react';
import { AppRoutes } from './router';
import { Layout } from './components/Layout';

export function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}
