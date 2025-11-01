import { Typography } from "@/src/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import TaskItem from "@/src/components/TaskItem";
import { Task, TaskType } from "@/src/hooks/useTaks";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  const handleLoadTasks = useCallback(async () => {
    const loadedTasks = await Task.getTasks();
    setTasks(loadedTasks);

    // Calculate stats
    const completed = loadedTasks.filter((t) => t.completed).length;
    const pending = loadedTasks.length - completed;
    setStats({
      total: loadedTasks.length,
      pending,
      completed,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleLoadTasks();
    }, [handleLoadTasks])
  );

  // Get recent tasks (last 3)
  const recentTasks = tasks.slice(0, 3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.subtitle}>Stay organized and productive</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total Tasks</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.pending}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.completed}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>

          {/* Recent Tasks Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Tasks</Text>
              {tasks.length > 3 && (
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/tasks")}
                  style={styles.viewAllButton}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <Ionicons name="arrow-forward" size={16} color="#63D9F3" />
                </TouchableOpacity>
              )}
            </View>

            {recentTasks.length > 0 ? (
              <View style={styles.tasksList}>
                {recentTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={48}
                  color="#63D9F3"
                />
                <Text style={styles.emptyText}>No tasks yet</Text>
                <Text style={styles.emptySubtext}>
                  Create your first task to get started
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    ...Typography.h1,
    color: "#fff",
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: "#63D9F3",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(99, 217, 243, 0.1)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(99, 217, 243, 0.2)",
  },
  statNumber: {
    ...Typography.h2,
    color: "#63D9F3",
    fontSize: 28,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.bodyMedium,
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    ...Typography.h3,
    color: "#fff",
    fontSize: 20,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    ...Typography.bodyMedium,
    color: "#63D9F3",
    fontSize: 14,
  },
  tasksList: {
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    ...Typography.h4,
    color: "#fff",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    ...Typography.bodyMedium,
    color: "#63D9F3",
    textAlign: "center",
    opacity: 0.8,
  },
});
