import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.parentView}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>

        <Text style={styles.screenLabel}>Settings</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 60,
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  parentView: {
    flex: 1,
    padding: 20,
  },

  backButtonIcon: {
    color: "#fff",
  },

  screenLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
