import TaskItem from "@/src/components/TaskItem";
import { Typography } from "@/src/constants/Typography";
import { Task } from "@/src/hooks/useTaks";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type SortOption = {
  id: string;
  label: string;
  icon: string;
};

const sortOptions: SortOption[] = [
  { id: "date-asc", label: "Date (Oldest First)", icon: "calendar-outline" },
  { id: "date-desc", label: "Date (Newest First)", icon: "calendar" },
  { id: "priority-high", label: "Priority (High to Low)", icon: "flag" },
  { id: "priority-low", label: "Priority (Low to High)", icon: "flag-outline" },
  { id: "name-asc", label: "Name (A-Z)", icon: "text" },
  { id: "name-desc", label: "Name (Z-A)", icon: "text-outline" },
  { id: "status", label: "Status", icon: "checkmark-circle" },
];

export default function TaskScreen() {
  const insets = useSafeAreaInsets();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
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

  const handleLoadTasks = async () => {
    const storedTasks = await Task.getTasks();
    setTasks(storedTasks);
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await handleLoadTasks();
      } catch (error) {
        console.error("Error loading tasks:", error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async () => {
    setIsBottomSheetVisible(false);

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

    await Task.createTask(newTaskData as Task);
    await handleLoadTasks();
    setIsBottomSheetVisible(false);
    handleResetNewTask();
  };

  const handleSortSelect = (option: SortOption) => {
    setSelectedSort(option);
    setIsDropdownVisible(false);
  };

  const onDateChange = () => {
    // Simple date increment for demo - you can replace with a proper picker later
    const newDate = new Date(newTask.date);
    newDate.setDate(newDate.getDate() + 1);
    setNewTask({ ...newTask, date: newDate });
    setShowDatePicker(false);
  };

  const onTimeChange = () => {
    // Simple time increment for demo - you can replace with a proper picker later
    const newTime = new Date(newTask.time);
    newTime.setHours(newTime.getHours() + 1);
    setNewTask({ ...newTask, time: newTime });
    setShowTimePicker(false);
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

  const renderSortOption = ({ item }: { item: SortOption }) => (
    <TouchableOpacity
      style={styles.sortOption}
      onPress={() => handleSortSelect(item)}
    >
      <Ionicons name={item.icon as any} size={20} color="#fff" />
      <Text style={styles.sortOptionText}>{item.label}</Text>
      {selectedSort?.id === item.id && (
        <Ionicons name="checkmark" size={20} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#1253AA", "#082D52", "#05243E"]}
      style={styles.container}
    >
      <SafeAreaView>
        {/* filter */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by task title"
              placeholderTextColor="gray"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              autoFocus={true}
            />

            <View style={styles.searchIcon}>
              <Ionicons name="search" size={18} color="gray" />
            </View>
          </View>

          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Ionicons name="funnel-outline" size={20} color="gray" />
            <Text style={styles.sortButtonText}>
              {selectedSort ? selectedSort.label : "Sort by"}
            </Text>
            <Ionicons
              name={isDropdownVisible ? "chevron-up" : "chevron-down"}
              size={16}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* tasks list */}
        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>Tasks List</Text>

          <FlatList
            contentContainerStyle={[
              styles.tasksList,
              { paddingBottom: 100 + insets.bottom },
            ]}
            data={tasks}
            renderItem={({ item }) => <TaskItem task={item as Task} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsDropdownVisible(false)}
          >
            <View style={styles.dropdownContainer}>
              <FlatList
                data={sortOptions}
                renderItem={renderSortOption}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>

      {/* floating add task button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsBottomSheetVisible(true)}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>

      {/* bottom sheet modal */}
      <Modal
        visible={isBottomSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsBottomSheetVisible(false)}
      >
        <Pressable
          style={styles.bottomSheetOverlay}
          onPress={() => setIsBottomSheetVisible(false)}
        >
          <Pressable style={styles.bottomSheet} onPress={() => {}}>
            <View style={styles.bottomSheetHeader}>
              <View style={styles.bottomSheetHandle} />
            </View>

            {/* task title input */}
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
                onChangeText={(text) =>
                  setNewTask({ ...newTask, description: text })
                }
              />
            </View>

            {/* date and time selectors */}
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <Text style={styles.dateTimeText}>
                  {formatDate(newTask.date)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time-outline" size={20} color="#666" />
                <Text style={styles.dateTimeText}>
                  {formatTime(newTask.time)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* action buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsBottomSheetVisible(false);
                  handleResetNewTask();
                }}
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

            {/* Simple Date/Time Selection Modals */}
            {showDatePicker && (
              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowDatePicker(false)}
                >
                  <View style={styles.dateTimeModal}>
                    <Text style={styles.modalTitle}>Select Date</Text>
                    <Text style={styles.currentDateTime}>
                      Current: {formatDate(newTask.date)}
                    </Text>
                    <TouchableOpacity
                      style={styles.dateTimeOption}
                      onPress={onDateChange}
                    >
                      <Text style={styles.dateTimeOptionText}>Next Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dateTimeOption}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={styles.dateTimeOptionText}>
                        Keep Current
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            )}

            {showTimePicker && (
              <Modal
                visible={showTimePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowTimePicker(false)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setShowTimePicker(false)}
                >
                  <View style={styles.dateTimeModal}>
                    <Text style={styles.modalTitle}>Select Time</Text>
                    <Text style={styles.currentDateTime}>
                      Current: {formatTime(newTask.time)}
                    </Text>
                    <TouchableOpacity
                      style={styles.dateTimeOption}
                      onPress={onTimeChange}
                    >
                      <Text style={styles.dateTimeOptionText}>Next Hour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dateTimeOption}
                      onPress={() => setShowTimePicker(false)}
                    >
                      <Text style={styles.dateTimeOptionText}>
                        Keep Current
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 18,
  },

  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102D53",
    borderRadius: 6,
  },

  searchInput: {
    flex: 1,
    paddingLeft: 10,
    height: 48,
    fontSize: 16,
    color: "#fff",
    borderRadius: 6,
    backgroundColor: "#102D53",
  },

  tasksContainer: {
    marginTop: 20,
    height: 600,
  },

  tasksList: {
    gap: 15,
  },

  tasksTitle: {
    ...Typography.bodyLarge,
    color: "#fff",
    marginBottom: 12,
  },

  searchIcon: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102D53",
    paddingHorizontal: 15,
    height: 50,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },

  sortButtonText: {
    ...Typography.bodyMedium,
    color: "#fff",
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 100,
    paddingRight: 10,
  },

  dropdownContainer: {
    backgroundColor: "#102D53",
    borderRadius: 8,
    maxHeight: 300,
    minWidth: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a3a5a",
  },

  sortOptionText: {
    ...Typography.bodyMedium,
    color: "#fff",
    fontSize: 14,
    flex: 1,
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

  // Bottom Sheet Styles
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

  bottomSheetHeader: {
    alignItems: "center",
    marginBottom: 20,
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

  actionButtons: {
    flexDirection: "row",
    gap: 12,
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

  // Date/Time Modal Styles
  dateTimeModal: {
    backgroundColor: "#102D53",
    borderRadius: 12,
    padding: 20,
    minWidth: 280,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
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

  dateTimeOptionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});
