import { useMutation } from "@tanstack/react-query";

const simulateAuth = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

const SimulateAuthentication = async () => {
  const data = await simulateAuth();
  return data;
};

export function useSimulateAuth() {
  return useMutation({
    mutationFn: SimulateAuthentication,
  });
}
