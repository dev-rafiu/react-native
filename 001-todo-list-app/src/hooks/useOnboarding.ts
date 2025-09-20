import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const ONBOARDING_KEY = "hasSeenOnboarding";

export const useOnboarding = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null
  );
  // const [isLoading, setIsLoading] = useState(true);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setHasSeenOnboarding(value === "true");
    } catch (error) {
      console.error("Error reading onboarding status:", error);
      setHasSeenOnboarding(false);
    } finally {
      // setIsLoading(false);
    }
  };

  const markOnboardingAsComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  return {
    hasSeenOnboarding,
    // isLoading,
    markOnboardingAsComplete,
  };
};
