import { Typography } from "@/src/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

export default function TaskItem({ task }: { task: Task }) {
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
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
  },

  taskDescription: {
    fontSize: 14,
    lineHeight: 18,
    maxWidth: 150,
  },
});
