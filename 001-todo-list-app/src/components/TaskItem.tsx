import { TaskType } from "@/src/hooks/useTaks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TaskItem({ task }: { task: TaskType }) {
  const handlePress = () => {
    router.push(`/task-details/${task.id}`);
  };

  return (
    <View className="flex-row items-center justify-between bg-white rounded-lg p-2 mb-4">
      <View className="flex-1">
        <Text className="text-lg font-bold text-[#000]">{task.title}</Text>

        <View className="flex-row items-center">
          <Text
            className="text-sm text-[#666] max-w-[150px]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {task.description}
          </Text>

          <Text className="text-sm text-[#666]">|</Text>

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
