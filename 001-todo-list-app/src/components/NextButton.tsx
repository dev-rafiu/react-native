import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  scrollTo: () => void;
  isLastScreen: boolean;
};
function NextButton({ scrollTo, isLastScreen }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollTo} style={styles.button}>
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
