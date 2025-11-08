import NavigationHeader from "@/src/components/NavigationHeader";
import { useLogOut } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const settingsOptions = [
  {
    icon: "person-outline",
    title: "Profile",
  },
  {
    icon: "notifications-outline",
    title: "Notifications",
  },
  {
    icon: "moon-outline",
    title: "Theme",
  },
  {
    icon: "language-outline",
    title: "Language",
  },
  {
    icon: "help-circle-outline",
    title: "Help & Support",
  },
  {
    icon: "information-circle-outline",
    title: "About",
  },
  {
    icon: "log-out-outline",
    title: "Logout",
  },
];

export default function SettingsScreen() {
  const logOutMutation = useLogOut();

  const handleLogOut = () => {
    logOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/auth/login");
      },
    });
  };

  const showLogoutConfirmation = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: handleLogOut,
      },
    ]);
  };

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.parentView}
    >
      <SafeAreaView className="flex-1">
        <NavigationHeader title="Settings" />

        <View className="flex-1 justify-between mt-2">
          {/* settings options */}
          <View className="gap-6 mt-4">
            {settingsOptions.map((option) => (
              <Pressable
                key={option.title}
                className="flex-row items-center py-4 px-2"
              >
                <Ionicons
                  name={option.icon as any}
                  size={24}
                  color="rgba(255, 255, 255, 0.8)"
                />
                <Text className="text-white text-lg font-medium ml-4">
                  {option.title}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* logout button */}
          <Pressable
            className="items-center py-4 px-2"
            onPress={showLogoutConfirmation}
            disabled={logOutMutation.isPending}
          >
            <Text className="text-white text-lg font-medium">
              {logOutMutation.isPending ? "Logging out..." : "Logout"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    padding: 20,
  },
});
