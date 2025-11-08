import {
  render,
  RenderOptions,
  RenderAPI,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

// Create a default QueryClient for tests
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
};

// /**
//  * Reusable render function that wraps components with all necessary providers
//  * @param component - The React component to render
//  * @param update - Optional render method (e.g., rerender). Defaults to render
//  * @param renderOptions - Optional render options from @testing-library/react-native
//  * @returns Render result with all query methods (getByText, etc.)
//  */
function renderComponent(
  component: ReactElement,
  update: ((component: ReactElement) => RenderAPI) | null = null,
  renderOptions: RenderOptions = {}
): RenderAPI {
  const queryClient = createTestQueryClient();
  const renderMethod = update || render;

  return renderMethod(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{component}</NavigationContainer>
    </QueryClientProvider>,
    renderOptions
  );
}

export default renderComponent;
