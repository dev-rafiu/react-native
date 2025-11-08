/* eslint-env jest */
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
}));

// Suppress act warnings from async operations and icon loading
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("An update to") &&
    args[0].includes("inside a test was not wrapped in act")
  ) {
    return;
  }
  originalError.call(console, ...args);
};
