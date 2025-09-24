import NavigationHeader from "@/src/components/NavigationHeader";
import { Task, TaskType } from "@/src/hooks/useTaks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<TaskType | null>(null);

  const handleLoadTask = useCallback(async () => {
    if (!id) return;
    const taskDetails = await Task.getTask(id);
    setTask(taskDetails);
  }, [id]);

  const handleDeleteTask = useCallback(async () => {
    if (!id) return;
    await Task.deleteTask(id);
    router.replace("/(tabs)/tasks?refresh=true");
  }, [id]);

  const handleMarkTaskAsDone = useCallback(async () => {
    if (!id) return;
    await Task.markTaskAsDone(id);
    await handleLoadTask();
  }, [id, handleLoadTask]);

  const showDeleteConfirmation = useCallback(() => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDeleteTask,
        },
      ],
      {
        cancelable: true,
      }
    );
  }, [handleDeleteTask]);

  useEffect(() => {
    handleLoadTask();
  }, [handleLoadTask]);

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <SafeAreaView>
        <NavigationHeader title="Task Details" />

        {!task ? (
          <Text style={styles.notFoundText}>Task not found</Text>
        ) : (
          <View style={styles.taskDetailsContainer}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDescription}>{task.description}</Text>

            <View style={styles.taskMetaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <Text style={styles.metaText}>
                  {new Date(task.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.metaText}>
                  {new Date(task.time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              {task.completed !== undefined && (
                <View style={styles.metaItem}>
                  <Ionicons
                    name={
                      task.completed ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={20}
                    color={task.completed ? "#4CAF50" : "#fff"}
                  />
                  <Text style={styles.metaText}>
                    {task.completed ? "Completed" : "Pending"}
                  </Text>
                </View>
              )}
            </View>

            {/* action buttons */}
            <View style={styles.actionButtonsContainer}>
              <Pressable
                style={styles.actionButton}
                onPress={handleMarkTaskAsDone}
              >
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <Text style={styles.actionButtonText}>Done</Text>
              </Pressable>

              <Pressable
                style={styles.actionButton}
                onPress={showDeleteConfirmation}
              >
                <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
                <Text style={styles.actionButtonText}>Delete</Text>
              </Pressable>

              <Pressable style={styles.actionButton}>
                <Ionicons name="bookmark" size={24} color="#FFA726" />
                <Text style={styles.actionButtonText}>Pin</Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  loadingText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },

  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#0EA5E9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  taskDetailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },

  taskTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  taskDescription: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  taskMetaContainer: {
    gap: 12,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  metaText: {
    color: "#fff",
    fontSize: 16,
  },

  notFoundText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },

  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },

  actionButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    minWidth: 80,
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
  },
});
