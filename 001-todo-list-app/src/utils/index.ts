import AsyncStorage from "@react-native-async-storage/async-storage";

export const resetOnboarding = async () => {
  await AsyncStorage.removeItem("hasSeenOnboarding");
};
