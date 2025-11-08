import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface NavigationHeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export default function NavigationHeader({
  title,
  showBackButton = true,
  onBackPress,
}: NavigationHeaderProps) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-row items-center gap-2 mb-4">
      {showBackButton && (
        <Pressable
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
      )}
      {title && <Text className="text-white text-lg font-medium">{title}</Text>}
    </View>
  );
}
