import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.parentView}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
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

    // borderWidth: 1,
  },

  parentView: {
    flex: 1,
    padding: 20,
  },

  backButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    width: 35,
    height: 35,
  },

  backButtonIcon: {
    color: "#63D9F3",
  },

  screenLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
