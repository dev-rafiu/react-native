import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

function NextButton({
  scrollTo,
  isLastScreen,
}: {
  scrollTo: () => void;
  isLastScreen: boolean;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.button}>
        {/* display a check icon on last onboarding screen */}
        {isLastScreen ? (
          <AntDesign name="check" size={32} color={"#000"} />
        ) : (
          <AntDesign name="arrowright" size={32} color={"#000"} />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default NextButton;

const styles = StyleSheet.create({
  container: {},

  button: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
