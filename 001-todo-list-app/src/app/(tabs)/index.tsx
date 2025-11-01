import { Typography } from "@/src/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <Text style={styles.title}>Get The Bread, Avoid The Drama</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    ...Typography.h1,
    color: "#fff",
    textAlign: "center",
    maxWidth: 300,
  },
});
