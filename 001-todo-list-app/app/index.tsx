import { Typography } from "@/src/constants/Typography";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function App() {
  const { hasSeenOnboarding, isLoading } = useOnboarding();

  useEffect(() => {
    if (!isLoading && hasSeenOnboarding !== null) {
      const timer = setTimeout(() => {
        if (hasSeenOnboarding) {
          router.replace("/auth/login");
        } else {
          router.replace("/onboarding");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasSeenOnboarding, isLoading]);

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <AntDesign
          name="checkcircle"
          size={80}
          color={"#fff"}
          style={styles.icon}
        />

        <Text style={styles.title}>
          <Text style={styles.logo}>DO IT</Text>
        </Text>

        <Text style={styles.subtitle}>Your Todo App</Text>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    ...Typography.h1,
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 10,
  },
  logo: {
    ...Typography.h1,
    color: "#fff",
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: "#fff",
    opacity: 0.8,
    marginBottom: 40,
  },
  loadingContainer: {
    marginTop: 20,
  },
});

export default App;
