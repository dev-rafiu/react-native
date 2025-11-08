import { Ionicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface StickyHeaderProps {
  title?: string;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ title }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const segments = useSegments();

  const getDynamicTitle = () => {
    if (title) return title;

    const currentTab = String(segments[segments.length - 1]);
    if (currentTab === "index") return "Home";
    if (currentTab === "tasks") return "Tasks";

    return "Home";
  };

  const displayTitle = getDynamicTitle();

  const menuOptions = [
    {
      id: "settings",
      label: "Settings",
      icon: "settings-outline",
      enabled: true,
    },

    { id: "profile", label: "Profile", icon: "person-outline", enabled: false },

    { id: "help", label: "Help", icon: "help-circle-outline", enabled: false },

    {
      id: "about",
      label: "About",
      icon: "information-circle-outline",
      enabled: false,
    },
  ];

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleOptionPress = (optionId: string, enabled: boolean) => {
    setIsMenuVisible(false);

    if (!enabled) return;

    switch (optionId) {
      case "settings":
        router.push("/settings");
        break;
      default:
        console.log("Selected option:", optionId);
    }
  };

  return (
    <>
      <View
        className="absolute top-0 left-0 right-0 z-[1000] flex-row items-center justify-between px-5 shadow-lg"
        style={{ paddingTop: insets.top + 10 }}
      >
        <Text className="text-white text-base font-semibold font-[Poppins-Regular]">
          {displayTitle}
        </Text>

        <TouchableOpacity
          className="p-2 rounded-[20px] bg-white/10"
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {isMenuVisible && (
        <>
          <Pressable
            className="absolute top-0 left-0 right-0 bottom-0 z-[999]"
            onPress={() => setIsMenuVisible(false)}
          />
          <View
            className="absolute right-5 z-[1001] bg-[#102D53] rounded-xl min-w-[180px] shadow-xl overflow-hidden"
            style={{ top: insets.top + 65 }}
          >
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`px-4 py-3.5 ${!option.enabled ? "opacity-50" : ""}`}
                onPress={() => handleOptionPress(option.id, option.enabled)}
                disabled={!option.enabled}
              >
                <Text
                  className={`text-base font-[Poppins-Regular] leading-6 tracking-[0.1px] ${
                    !option.enabled ? "text-[#666]" : "text-white"
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default StickyHeader;
