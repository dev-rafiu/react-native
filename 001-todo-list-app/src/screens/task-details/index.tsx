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
        <NavigationHeader />

        {!task ? (
          <Text className="text-white text-base text-center mt-[50px]">
            Task not found
          </Text>
        ) : (
          <View className="mt-5 p-5 bg-white/10 rounded-xl">
            <Text className="text-white text-2xl font-bold mb-3">
              {task.title}
            </Text>

            <Text className="text-white text-base leading-6 mb-5">
              {task.description}
            </Text>

            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <Text className="text-white text-base">
                  {new Date(task.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text className="text-white text-base">
                  {new Date(task.time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              {task.completed !== undefined && (
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    name={
                      task.completed ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={20}
                    color={task.completed ? "#4CAF50" : "#fff"}
                  />
                  <Text className="text-white text-base">
                    {task.completed ? "Completed" : "Pending"}
                  </Text>
                </View>
              )}
            </View>

            {/* action buttons */}
            <View className="flex-row justify-around mt-[30px] pt-5 border-t border-white/20">
              <Pressable
                className="items-center py-2.5 px-4 rounded-lg bg-white/10 min-w-[80px]"
                onPress={handleMarkTaskAsDone}
              >
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <Text className="text-white text-sm font-semibold mt-1.5">
                  Done
                </Text>
              </Pressable>

              <Pressable
                className="items-center py-2.5 px-4 rounded-lg bg-white/10 min-w-[80px]"
                onPress={showDeleteConfirmation}
              >
                <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
                <Text className="text-white text-sm font-semibold mt-1.5">
                  Delete
                </Text>
              </Pressable>

              <Pressable className="items-center py-2.5 px-4 rounded-lg bg-white/10 min-w-[80px]">
                <Ionicons name="bookmark" size={24} color="#FFA726" />
                <Text className="text-white text-sm font-semibold mt-1.5">
                  Pin
                </Text>
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
});
