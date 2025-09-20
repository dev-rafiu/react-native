import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const login = async () => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      AsyncStorage.setItem("isLoggedIn", "true");
      resolve(true);
    }, 2000);
  });

  return data;
};
export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

const logOut = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  await AsyncStorage.removeItem("isLoggedIn");
};
export function useLogOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

const checkAuth = async () => {
  const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? true : false;
};

export function useCheckAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
  });
}

export const setLoggedIn = async () => {
  await AsyncStorage.setItem("isLoggedIn", "true");
  console.log("hurray");
};
