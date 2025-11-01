import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { ONBOARDING_SLIDES } from "@/src/utils/slides";
import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import NextButton from "@/src/components/NextButton";
import OnboardingSlide from "@/src/components/OnboardingSlide";
import PaginationinIndicator from "@/src/components/PaginationIndicator";

import * as SystemUI from "expo-system-ui";
import { TSlide } from "@/src/definitions";

function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList<TSlide>>(null);
  const { markOnboardingAsComplete } = useOnboarding();

  const { height: screenHeight } = Dimensions.get("screen");

  useEffect(() => {
    StatusBar.setHidden(true, "fade");

    if (Platform.OS === "android") {
      SystemUI.setBackgroundColorAsync("transparent");
      NavigationBar.setVisibilityAsync("hidden");
    }

    return () => {
      StatusBar.setHidden(false, "fade");
      if (Platform.OS === "android") {
        NavigationBar.setVisibilityAsync("visible");
      }
    };
  }, []);

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
      StatusBar.setHidden(false, "fade");
      if (Platform.OS === "android") {
        NavigationBar.setVisibilityAsync("visible");
      }

      await markOnboardingAsComplete();
      router.replace("/auth/login");
    }
  };

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <FlatList
        ref={slideRef}
        keyExtractor={(item) => item.id.toString()}
        data={ONBOARDING_SLIDES}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
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

      <View style={styles.paginationContainer}>
        <PaginationinIndicator data={ONBOARDING_SLIDES} scrollX={scrollX} />
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

  // flatListContainer: {
  //   flex: 1,
  // },

  paginationContainer: {
    position: "absolute",
    bottom: 70,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    paddingRight: 40,
    width: "70%",
  },
});
