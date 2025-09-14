import { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Platform,
} from "react-native";
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
      <View style={styles.inputContainer}>
        <Ionicons
          name="checkbox-outline"
          size={20}
          color="#fff"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.taskInput}
          placeholder="task"
          placeholderTextColor="#666"
          value={newTask.title}
          onChangeText={(text) => setNewTask({ ...newTask, title: text })}
        />
      </View>

      {/* description input */}
      <View style={styles.descriptionContainer}>
        <Ionicons
          name="menu-outline"
          size={20}
          color="#fff"
          style={styles.descriptionIcon}
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={3}
          value={newTask.description}
          onChangeText={(text) => setNewTask({ ...newTask, description: text })}
        />
      </View>

      {/* date and time selectors */}
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <Text style={styles.dateTimeText}>{formatDate(newTask.date)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.dateTimeText}>{formatTime(newTask.time)}</Text>
        </TouchableOpacity>
      </View>

      {/* action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleResetNewTask}
        >
          <Text style={styles.cancelButtonText}>cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.createButtonText}>create</Text>
        </TouchableOpacity>
      </View>

      {/* date/time pickers */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  fab: {
    position: "absolute",
    bottom: 130,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#63D9F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    minHeight: 400,
  },

  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102D53",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  inputIcon: {
    marginRight: 8,
  },

  taskInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#fff",
  },

  descriptionContainer: {
    flexDirection: "row",
    backgroundColor: "#102D53",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },

  descriptionIcon: {
    marginRight: 8,
    marginTop: 4,
  },

  descriptionInput: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    textAlignVertical: "top",
    minHeight: 80,
  },

  dateTimeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  dateTimeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },

  dateTimeText: {
    fontSize: 16,
    color: "#666",
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0EA5E9",
    alignItems: "center",
  },

  cancelButtonText: {
    fontSize: 16,
    color: "#0EA5E9",
    fontWeight: "600",
  },

  createButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#0EA5E9",
    alignItems: "center",
  },

  createButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 100,
    paddingRight: 10,
  },

  currentDateTime: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 20,
  },

  dateTimeOption: {
    backgroundColor: "#1a3a5a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 4,
    width: "100%",
    alignItems: "center",
  },

  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },

  dateTimeOptionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  dateTimeModal: {
    backgroundColor: "#102D53",
    borderRadius: 12,
    padding: 20,
    minWidth: 280,
    alignItems: "center",
  },
});

export default CreateTaskForm;
