import { useEffect } from "react";
import { router } from "expo-router";
import { useCheckAuth } from "@/src/hooks/useAuth";

import "../../global.css";

import { useOnboarding } from "@/src/hooks/useOnboarding";

function App() {
  const { hasSeenOnboarding } = useOnboarding();

  const { data: isLoggedIn, isLoading: authLoading } = useCheckAuth();

  useEffect(() => {
    if (authLoading || hasSeenOnboarding === null) return;

    if (isLoggedIn && hasSeenOnboarding) {
      router.replace("/(tabs)");
    } else if (hasSeenOnboarding && !isLoggedIn) {
      router.replace("/auth/login");
    } else {
      router.replace("/onboarding");
    }
  }, [hasSeenOnboarding, isLoggedIn, authLoading]);

  return null;
}

export default App;
