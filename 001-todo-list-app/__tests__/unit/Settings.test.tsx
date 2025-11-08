import renderComponent from "../helpers/render";

import SettingsScreen from "@/src/screens/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("SettingsScreen", () => {
  test("should render correctly", () => {
    renderComponent(<SettingsScreen />);
  });

  test("checks if async storage is used", async () => {
    const result = await AsyncStorage.getItem("isLoggedIn");
    expect(result).toBeDefined();
  });
});
