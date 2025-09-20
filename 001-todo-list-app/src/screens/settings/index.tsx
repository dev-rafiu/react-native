import NavigationHeader from "@/src/components/NavigationHeader";
import { useLogOut } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView style={styles.safeArea}>
        <NavigationHeader title="Settings" />

        <View style={styles.contentContainer}>
          {/* settings options */}
          <View style={styles.settingsList}>
            <Pressable style={styles.settingItem}>
              <Ionicons
                name="person-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>Profile</Text>
            </Pressable>

            <Pressable style={styles.settingItem}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>Notifications</Text>
            </Pressable>

            <Pressable style={styles.settingItem}>
              <Ionicons
                name="moon-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>Theme</Text>
            </Pressable>

            <Pressable style={styles.settingItem}>
              <Ionicons
                name="language-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>Language</Text>
            </Pressable>

            <Pressable style={styles.settingItem}>
              <Ionicons
                name="cloud-upload-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>Backup & Sync</Text>
            </Pressable>

            <Pressable style={styles.settingItem}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>Help & Support</Text>
            </Pressable>

            <Pressable style={styles.settingItem}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text style={styles.settingText}>About</Text>
            </Pressable>
          </View>

          {/* logout button */}
          <Pressable
            style={styles.logoutButton}
            onPress={showLogoutConfirmation}
            disabled={logOutMutation.isPending}
          >
            <Text style={styles.logoutButtonText}>
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

  safeArea: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },

  settingsList: {
    gap: 8,
    marginTop: 20,
  },

  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
  },

  settingText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginLeft: 15,
  },

  logoutButton: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },

  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
