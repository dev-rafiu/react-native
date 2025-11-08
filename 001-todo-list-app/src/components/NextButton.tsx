import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";

type Props = {
  scrollTo: () => void;
  isLastScreen: boolean;
};
function NextButton({ scrollTo, isLastScreen }: Props) {
  return (
    <Pressable
      onPress={scrollTo}
      className="w-16 h-16 rounded-full bg-white items-center justify-center"
    >
      {isLastScreen ? (
        <AntDesign name="check" size={32} color={"#000"} />
      ) : (
        <AntDesign name="arrow-right" size={32} color={"#000"} />
      )}
    </Pressable>
  );
}

export default NextButton;
