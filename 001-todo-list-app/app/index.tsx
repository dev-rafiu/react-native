import { useOnboarding } from "@/src/hooks/useOnboarding";
import { router } from "expo-router";
import { useEffect } from "react";

function App() {
  const { hasSeenOnboarding, isLoading } = useOnboarding();

  useEffect(() => {
    if (!isLoading && !hasSeenOnboarding) {
      router.push("/onboarding");
    } else {
      router.push("/auth/login");
    }
  }, [hasSeenOnboarding, isLoading]);

  return null;
}

export default App;
