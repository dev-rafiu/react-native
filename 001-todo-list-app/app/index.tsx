import { useCheckAuth } from "@/src/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import "../global.css";

const ONBOARDING_KEY = "hasSeenOnboarding";

function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  const { data: isLoggedIn, isLoading: authLoading } = useCheckAuth();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        setHasSeenOnboarding(value === "true");
      } catch (error) {
        console.error("Error reading onboarding status:", error);
        setHasSeenOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (authLoading || hasSeenOnboarding === null) return;

    if (isLoggedIn && hasSeenOnboarding) {
      router.replace("/(tabs)");
    } else {
      router.replace("/onboarding");
    }
  }, [hasSeenOnboarding, isLoggedIn, authLoading]);

  return null;
}

export default App;
