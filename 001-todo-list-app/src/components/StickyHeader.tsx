import { Ionicons } from "@expo/vector-icons";
import { router, useSegments } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "../constants/Typography";

interface StickyHeaderProps {
  title?: string;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ title }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const segments = useSegments();

  // Get dynamic title based on current route
  const getDynamicTitle = () => {
    if (title) return title; // Use provided title if available

    const currentTab = String(segments[segments.length - 1]);
    if (currentTab === "index") return "Home";
    if (currentTab === "tasks") return "Tasks";
    if (currentTab === "calendar") return "Calendar";
    return "Todo App";
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
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>{displayTitle}</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={handleMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color="#fff"
            style={styles.menuButtonIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {isMenuVisible && (
        <>
          <Pressable
            style={styles.dropdownOverlay}
            onPress={() => setIsMenuVisible(false)}
          />
          <View style={[styles.dropdownContainer, { top: insets.top + 65 }]}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.menuOption,
                  !option.enabled && styles.menuOptionDisabled,
                ]}
                onPress={() => handleOptionPress(option.id, option.enabled)}
                disabled={!option.enabled}
              >
                <Text
                  style={[
                    styles.menuOptionText,
                    !option.enabled && styles.menuOptionTextDisabled,
                  ]}
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

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },

  menuButtonIcon: {
    color: "#fff",
  },

  title: {
    ...Typography.bodyMedium,
    color: "#fff",
    fontWeight: "600",
  },

  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  dropdownOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },

  dropdownContainer: {
    position: "absolute",
    right: 20,
    zIndex: 1001,
    backgroundColor: "#102D53",
    borderRadius: 12,
    minWidth: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },

  menuOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  menuOptionText: {
    ...Typography.bodyMedium,
    color: "#fff",
    fontSize: 16,
  },

  menuOptionDisabled: {
    opacity: 0.5,
  },

  menuOptionTextDisabled: {
    color: "#666",
  },
});

export default StickyHeader;
