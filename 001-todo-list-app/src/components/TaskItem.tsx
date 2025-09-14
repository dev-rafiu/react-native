import { Typography } from "@/src/constants/Typography";
import { TaskType } from "@/src/hooks/useTaks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskItem({ task }: { task: TaskType }) {
  const handlePress = () => {
    router.push(`/task-details/${task.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskInfoContainer}>
        <Text style={styles.taskTitle}>{task.title}</Text>

        <View style={styles.taskInfo}>
          <Text
            style={styles.taskDescription}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {task.description}
          </Text>
          <Text style={{ fontSize: 16, color: "gray", marginHorizontal: 8 }}>
            |
          </Text>
          <Text>
            {new Date(task.time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>

      <Pressable onPress={handlePress}>
        <Ionicons name="chevron-forward" size={20} color="#0EA5E9" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },

  taskInfoContainer: {
    flex: 1,
  },

  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  taskTitle: {
    ...Typography.bodyMedium,
    fontSize: 17,
    fontWeight: "900",
    color: "#000",
  },

  taskDescription: {
    fontSize: 13,
    maxWidth: 150,
  },
});
