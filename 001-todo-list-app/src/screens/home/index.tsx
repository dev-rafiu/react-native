import { LinearGradient } from "expo-linear-gradient";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
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
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 70,
            paddingBottom: 100,
          }}
        >
          {/* header */}
          <View className="mb-[30px]">
            <Text className="font-[Poppins-Bold] text-[32px] leading-[40px] tracking-[-0.5px] text-white mb-2">
              {getGreeting()}
            </Text>
            <Text className="font-[Poppins-Regular] text-base leading-6 tracking-[0.1px] text-[#63D9F3]">
              Stay organized and productive
            </Text>
          </View>

          {/* stats cards */}
          <View className="flex-row gap-3 mb-[30px]">
            <View className="flex-1 bg-[rgba(99,217,243,0.1)] rounded-xl p-4 items-center border border-[rgba(99,217,243,0.2)]">
              <Text className="font-[Poppins-Bold] text-[28px] leading-[36px] tracking-[-0.3px] text-[#63D9F3] mb-1">
                {stats.total}
              </Text>
              <Text className="font-[Poppins-Regular] text-xs leading-6 tracking-[0.1px] text-white opacity-80">
                Total Tasks
              </Text>
            </View>

            <View className="flex-1 bg-[rgba(99,217,243,0.1)] rounded-xl p-4 items-center border border-[rgba(99,217,243,0.2)]">
              <Text className="font-[Poppins-Bold] text-[28px] leading-[36px] tracking-[-0.3px] text-[#63D9F3] mb-1">
                {stats.pending}
              </Text>
              <Text className="font-[Poppins-Regular] text-xs leading-6 tracking-[0.1px] text-white opacity-80">
                Pending
              </Text>
            </View>

            <View className="flex-1 bg-[rgba(99,217,243,0.1)] rounded-xl p-4 items-center border border-[rgba(99,217,243,0.2)]">
              <Text className="font-[Poppins-Bold] text-[28px] leading-[36px] tracking-[-0.3px] text-[#63D9F3] mb-1">
                {stats.completed}
              </Text>
              <Text className="font-[Poppins-Regular] text-xs leading-6 tracking-[0.1px] text-white opacity-80">
                Completed
              </Text>
            </View>
          </View>

          {/* recent tasks section */}
          <View className="mt-2.5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-[Poppins-SemiBold] text-xl leading-8 tracking-[-0.2px] text-white">
                Recent Tasks
              </Text>
              {tasks.length > 3 && (
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/tasks")}
                  className="flex-row items-center gap-1"
                >
                  <Text className="font-[Poppins-Regular] text-sm leading-6 tracking-[0.1px] text-[#63D9F3]">
                    View All
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#63D9F3" />
                </TouchableOpacity>
              )}
            </View>

            {recentTasks.length > 0 ? (
              <View className="gap-3">
                {recentTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </View>
            ) : (
              <View className="items-center justify-center py-10 px-5">
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={48}
                  color="#63D9F3"
                />
                <Text className="font-[Poppins-SemiBold] text-xl leading-7 tracking-[-0.1px] text-white mt-4 mb-2">
                  No tasks yet
                </Text>
                <Text className="font-[Poppins-Regular] text-sm leading-6 tracking-[0.1px] text-[#63D9F3] text-center opacity-80">
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
