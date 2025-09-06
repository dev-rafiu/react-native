import { Typography } from "@/src/constants/Typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
};

export default function TaskItem({ task }: { task: Task }) {
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

      <Ionicons name="chevron-forward" size={24} color="#0EA5E9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 4,
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
    ...Typography.bodyLarge,
    fontWeight: "bold",
    color: "#000",
  },

  taskDescription: {
    lineHeight: 18,
    maxWidth: 150,
  },
});
