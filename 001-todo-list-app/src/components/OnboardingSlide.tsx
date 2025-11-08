import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, Text, View } from "react-native";
import { TSlide } from "../definitions";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

function OnboardingSlide({ item }: { item: TSlide }) {
  const { icon, text } = item;

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      className="p-5"
      style={{ width: screenWidth, height: screenHeight }}
    >
      <View className="flex-1 items-center mt-[100px] gap-5">
        <Image
          source={icon}
          className="w-[300px] h-[300px] mx-auto"
          style={{ objectFit: "contain" }}
        />
        <Text className="text-lg text-white max-w-[240px] font-[Poppins-Regular] leading-[23px] text-center font-extrabold">
          {text}
        </Text>
      </View>
    </LinearGradient>
  );
}

export default OnboardingSlide;
