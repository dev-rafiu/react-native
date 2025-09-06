import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import StickyHeader from "@/src/components/StickyHeader";
import { IconSymbol } from "@/src/components/ui/IconSymbol";

type TabIconProps = {
  name: React.ComponentProps<typeof IconSymbol>["name"];
  color: string;
  focused: boolean;
};
const TabIcon = ({ name, color, focused }: TabIconProps) => (
  <View style={{ alignItems: "center" }}>
    <IconSymbol size={28} name={name} color={color} />
    {focused && (
      <View
        style={{
          height: 3,
          width: 24,
          backgroundColor: "#fff",
          marginTop: 4,
          borderRadius: 2,
        }}
      />
    )}
  </View>
);

export default function TabLayout() {
  return (
    <>
      <StickyHeader />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#63D9F3",
          tabBarInactiveTintColor: "#fff",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarIconStyle: {
            marginBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="house.fill" color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="list.bullet" color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="calendar" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
