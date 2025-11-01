import AsyncStorage from "@react-native-async-storage/async-storage";

export const ONBOARDING_KEY = "hasSeenOnboarding";

export const resetOnboarding = async () => {
  await AsyncStorage.removeItem(ONBOARDING_KEY);
};
