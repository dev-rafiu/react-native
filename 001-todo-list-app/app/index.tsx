import { useCheckAuth } from "@/src/hooks/useAuth";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { router } from "expo-router";
import { useEffect } from "react";

function App() {
  const { hasSeenOnboarding } = useOnboarding();
  const { data: isLoggedIn, isLoading: authLoading } = useCheckAuth();

  useEffect(() => {
    if (authLoading) return;

    if (isLoggedIn && hasSeenOnboarding) {
      router.replace("/(tabs)");
    } else {
      router.replace("/onboarding");
    }
  }, [hasSeenOnboarding, isLoggedIn, authLoading]);

  return;
}

export default App;
