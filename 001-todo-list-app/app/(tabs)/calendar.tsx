import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Calendar() {
  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.screenLabel}>Manage your time</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 120, // Account for sticky header
  },

  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  screenLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
