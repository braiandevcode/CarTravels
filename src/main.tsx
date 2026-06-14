import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import MaintenancePage from './shared/components/MaintenancePage.tsx';

const MAINTENANCE_MODE: boolean = import.meta.env.VITE_MAINTENANCE_MODE === '1'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      {MAINTENANCE_MODE ? <MaintenancePage /> : <App />}
    </ErrorBoundary>
  </StrictMode>,
);
