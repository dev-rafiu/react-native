import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  // Fetch task data based on id
  // const task = useTask(id);

  return (
    <SafeAreaView style={styles.container}>
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
      </View>

      <Text>Task Details for ID: {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
