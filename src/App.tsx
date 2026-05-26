import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import LoadingScreen from "./shared/components/LoadingScreen";
import { router } from "./core/config/router.config";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer: number = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []); // on Mount

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={router} />;
};

export default App;
