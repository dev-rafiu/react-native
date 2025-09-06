import { Typography } from "@/src/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <Text style={styles.title}>Homebrew</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 120, // Account for sticky header
  },
  title: {
    ...Typography.h1,
    color: "#fff",
  },
});
