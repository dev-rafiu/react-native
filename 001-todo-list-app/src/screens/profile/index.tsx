import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";

function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.parentView}
    >
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={24}
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    padding: 20,
  },

  headerContainer: {
    paddingVertical: 20,
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
