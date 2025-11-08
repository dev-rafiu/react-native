import { waitFor, screen } from "@testing-library/react-native";
import { Task, TaskType } from "@/src/hooks/useTaks";
import TaskDetailsScreen from "@/src/screens/task-details";
import renderComponent from "../helpers/render";

// Mock expo-router
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ id: "test-task-id" })),
  router: {
    replace: jest.fn(),
    push: jest.fn(),
    back: jest.fn(),
  },
  useSegments: () => [],
}));

// Mock Task module
jest.mock("@/src/hooks/useTaks", () => {
  const actual = jest.requireActual("@/src/hooks/useTaks");
  return {
    ...actual,
    Task: {
      getTask: jest.fn(),
    },
  };
});

describe("TaskDetailsScreen", () => {
  const mockTask: TaskType = {
    id: "test-task-id",
    title: "Test Task",
    description: "This is a test task description created by the user",
    date: new Date().toISOString(),
    time: new Date().toISOString(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (Task.getTask as jest.Mock).mockResolvedValue(mockTask);
  });

  test("render page title", () => {
    const { getByText } = renderComponent(<TaskDetailsScreen />);

    getByText(/Task Details/i);
  });

  test("render task description", async () => {
    const { getByText } = renderComponent(<TaskDetailsScreen />);

    // Wait for async task loading
    await waitFor(() => {
      expect(getByText(mockTask.description)).toBeTruthy();
    });
  });

  test("render task title", async () => {
    const { getByText } = renderComponent(<TaskDetailsScreen />);

    await waitFor(() => {
      expect(getByText(mockTask.title)).toBeTruthy();
    });
  });

  test("render done,delete and pin buttons", async () => {
    renderComponent(<TaskDetailsScreen />);

    const doneButton = await screen.findByText(/Done/i);
    const deleteButton = await screen.findByText(/Delete/i);
    const pinButton = await screen.findByText(/Pin/i);

    expect(doneButton).toBeVisible();
    expect(deleteButton).toBeVisible();
    expect(pinButton).toBeVisible();
  });

  test("shows task not found when task is null", async () => {
    (Task.getTask as jest.Mock).mockResolvedValue(null);

    const { getByText } = renderComponent(<TaskDetailsScreen />);

    await waitFor(() => {
      expect(getByText(/Task not found/i)).toBeTruthy();
    });
  });
});
