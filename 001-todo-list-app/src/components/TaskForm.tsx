import { useState } from "react";
import { Text, TextInput, View, Platform, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Task, TaskType } from "../hooks/useTaks";

type Props = {
  onDismiss: () => void;
  onTaskCreated: () => void;
};

const CreateTaskForm = ({ onDismiss, onTaskCreated }: Props) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleResetNewTask = () => {
    setNewTask({
      title: "",
      description: "",
      date: new Date(),
      time: new Date(),
    });
  };

  const handleCreateTask = async () => {
    if (newTask.title === "" || newTask.description === "") {
      return;
    }

    const newTaskData = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      date: newTask.date.toISOString(),
      time: newTask.time.toISOString(),
    };

    await Task.createTask(newTaskData as TaskType);
    onTaskCreated();
    handleResetNewTask();
    onDismiss();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || newTask.date;
    setShowDatePicker(Platform.OS === "ios");
    setNewTask({ ...newTask, date: currentDate });
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || newTask.time;
    setShowTimePicker(Platform.OS === "ios");
    setNewTask({ ...newTask, time: currentTime });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <View className="flex-row items-center bg-[#102D53] rounded-lg px-3 mb-4">
        <View className="mr-2">
          <Ionicons name="checkbox-outline" size={20} color="#fff" />
        </View>
        <TextInput
          className="flex-1 h-[50px] text-base text-white"
          placeholder="task"
          placeholderTextColor="#666"
          value={newTask.title}
          onChangeText={(text) => setNewTask({ ...newTask, title: text })}
        />
      </View>

      <View className="flex-row bg-[#102D53] rounded-lg px-3 py-3 mb-4">
        <View className="mr-2 mt-1">
          <Ionicons name="menu-outline" size={20} color="#fff" />
        </View>
        <TextInput
          className="flex-1 text-base text-white min-h-[80px]"
          placeholder="Description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={3}
          style={{ textAlignVertical: "top" }}
          value={newTask.description}
          onChangeText={(text) => setNewTask({ ...newTask, description: text })}
        />
      </View>

      <View className="flex-row gap-3 mb-6">
        <Pressable
          onPress={() => {
            setShowTimePicker(false);
            setShowDatePicker(true);
          }}
          className="flex-1 flex-row items-center bg-[#f5f5f5] px-3 py-3 rounded-lg gap-2"
        >
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <Text className="text-base text-[#666]">
            {formatDate(newTask.date)}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowDatePicker(false);
            setShowTimePicker(true);
          }}
          className="flex-1 flex-row items-center bg-[#f5f5f5] px-3 py-3 rounded-lg gap-2"
        >
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text className="text-base text-[#666]">
            {formatTime(newTask.time)}
          </Text>
        </Pressable>
      </View>

      <View className="flex-row gap-3">
        <Pressable
          className="flex-1 py-3 rounded-lg border border-[#0EA5E9] items-center"
          onPress={handleResetNewTask}
        >
          <Text className="text-base text-[#0EA5E9] font-semibold">Cancel</Text>
        </Pressable>

        <Pressable
          className="flex-1 py-3 rounded-lg bg-[#0EA5E9] items-center"
          onPress={handleCreateTask}
        >
          <Text className="text-base text-white font-semibold">Create</Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={newTask.date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={newTask.time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      )}
    </>
  );
};

export default CreateTaskForm;
