import { useState, useEffect, useRef, type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import LoadingScreen from './shared/components/LoadingScreen';
import { router } from './core/config/router.config';

const App = (): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const timerRef = useRef<number>(0);

  const HANDLE_LOADING_TIMEOUT = (): void => {
    timerRef.current = setTimeout(() => setIsLoading(false), 800);
  };

  const HANDLE_LOADING_CLEANUP = (): void => {
    clearTimeout(timerRef.current);
  };

  const HANDLE_INITIAL_LOADING = (): (() => void) => {
    HANDLE_LOADING_TIMEOUT();
    return HANDLE_LOADING_CLEANUP;
  };

  useEffect(HANDLE_INITIAL_LOADING, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={router} />;
};

export default App;
