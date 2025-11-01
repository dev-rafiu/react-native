import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import StickyHeader from "@/src/components/StickyHeader";
import { IconSymbol } from "@/src/components/ui/IconSymbol";

type TabIconProps = {
  name: React.ComponentProps<typeof IconSymbol>["name"];
  color: string;
  focused: boolean;
  label: string;
};

const TabIcon = ({ name, color, focused, label }: TabIconProps) => {
  const animatedValue = React.useRef(
    new Animated.Value(focused ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [focused, animatedValue]);

  return (
    <View
      style={{
        width: 100,
        alignItems: "center",
        gap: 2,
        marginTop: 12,
      }}
    >
      <IconSymbol size={22} name={name} color={color} />
      <Text style={{ color: "#fff", marginTop: 0, fontSize: 12 }}>{label}</Text>
    </View>
  );
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StickyHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#63D9F3",
          tabBarInactiveTintColor: "#fff",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#05243E",
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            shadowOpacity: 0,
            height: 60 + insets.bottom,
          },
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
          tabBarButton: (props) => (
            <Pressable
              {...(props as any)}
              android_ripple={{ color: "transparent" }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="house.fill"
                color={color}
                focused={focused}
                label="Home"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="list.bullet"
                color={color}
                focused={focused}
                label="Tasks"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
