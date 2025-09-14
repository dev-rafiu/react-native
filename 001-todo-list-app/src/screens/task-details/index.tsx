import { Task, TaskType } from "@/src/hooks/useTaks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [task, setTask] = useState<TaskType | null>(null);

  const handleLoadTask = useCallback(async () => {
    if (!id) return;
    const taskDetails = await Task.getTask(id);
    setTask(taskDetails);
  }, [id]);

  useEffect(() => {
    handleLoadTask();
  }, [handleLoadTask]);

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={24}
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
        </View>

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

  headerContainer: {
    paddingVertical: 20,
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 35,
    height: 35,
  },

  backButtonIcon: {
    color: "#fff",
  },

  screenLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  loadingText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },

  errorContainer: {
    alignItems: "center",
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
});
