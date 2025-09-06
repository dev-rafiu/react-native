import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";
import { TItem } from "./OnboardingItem";

type TProps = {
  data: TItem[];
  scrollX: Animated.Value;
};

function Paginator({ data, scrollX }: TProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
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
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  dot: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
  },
});
