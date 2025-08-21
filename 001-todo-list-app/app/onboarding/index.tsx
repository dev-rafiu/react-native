import NextButton from "@/src/components/NextButton";
import OnboardingItem from "@/src/components/OnboardingItem";
import Paginator from "@/src/components/Paginator";
import { ONBOARDING_SLIDES } from "@/src/utils/slides";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View, ViewToken } from "react-native";

interface Slides {
  id: number;
  icon: any;
  text: string;
}

function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList<Slides>>(null);
  const { markOnboardingAsComplete } = useOnboarding();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      slideRef?.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await markOnboardingAsComplete();
      router.replace("/auth/login");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
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
        <NextButton
          scrollTo={scrollTo}
          isLastScreen={currentIndex === ONBOARDING_SLIDES.length - 1}
        />
      </View>
    </View>
  );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  pagination: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
