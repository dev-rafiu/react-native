import { Animated, useWindowDimensions, View } from "react-native";
import { TSlide } from "../definitions";

type TProps = {
  data: TSlide[];
  scrollX: Animated.Value;
};

function PaginationinIndicator({ data, scrollX }: TProps) {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [16, 40, 16],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={i}
            className="h-[7px] rounded-[10px] bg-white mx-2"
            style={{
              width: dotWidth,
              opacity,
            }}
          />
        );
      })}
    </View>
  );
}

export default PaginationinIndicator;
