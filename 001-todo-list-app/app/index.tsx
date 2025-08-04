import NextButton from "@/src/components/NextButton";
import OnboardingItem from "@/src/components/OnboardingItem";
import Paginator from "@/src/components/Paginator";
import { ONBOARDING_SLIDES } from "@/src/utils/slides";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View, ViewToken } from "react-native";

interface Slides {
  id: string;
  title: string;
  description: string;
  image: any;
}
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList<Slides>>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      slideRef?.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/(tabs)/settings");
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          ref={slideRef}
          data={ONBOARDING_SLIDES}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          bounces={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </View>

      <View style={styles.pagination}>
        <Paginator data={ONBOARDING_SLIDES} scrollX={scrollX} />
        <NextButton scrollTo={scrollTo} />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {},

  pagination: {
    position: "absolute",
    bottom: 70,
    right: 50,
    width: 250,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
