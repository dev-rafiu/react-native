import CreateTaskDrawer from "@/src/components/CreateTaskDrawer";

import TaskItem from "@/src/components/TaskItem";
import { Typography } from "@/src/constants/Typography";
import { Task, TaskType } from "@/src/hooks/useTaks";
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
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleLoadTasks = async () => {
    const loadedTasks = await Task.getTasks();
    setTasks(loadedTasks);
  };

  const handleClearAllTasks = async () => {
    await Task.clearAllTasks();
    await handleLoadTasks();
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

  const handleSortSelect = (option: SortOption) => {
    setSelectedSort(option);
    setIsDropdownVisible(false);
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
    <>
      <LinearGradient
        colors={["#1253AA", "#082D52", "#05243E"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.filterContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by title ..."
                placeholderTextColor="gray"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                autoFocus={false}
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

          <Pressable
            style={styles.clearAllButton}
            onPress={handleClearAllTasks}
          >
            <Text style={styles.clearAllButtonText}>Clear All Tasks</Text>
          </Pressable>

          <View style={styles.tasksContainer}>
            <FlatList
              style={styles.flatListStyle}
              data={tasks}
              renderItem={({ item }) => <TaskItem task={item as TaskType} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              contentContainerStyle={{ paddingBottom: 20 + insets.bottom }}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No tasks found</Text>
              )}
            />
          </View>

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
      </LinearGradient>

      <CreateTaskDrawer onTaskCreated={handleLoadTasks} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  clearAllButton: {
    width: 120,
    marginLeft: "auto",
    padding: 10,
    marginBottom: 20,
  },

  clearAllButtonText: {
    textAlign: "right",
    color: "#fff",
  },

  safeArea: {
    flex: 1,
  },

  filterContainer: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 70,
    marginBottom: 20,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102D53",
    borderRadius: 100,
  },

  searchInput: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    color: "#fff",
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102D53",
    paddingHorizontal: 15,
    height: 42,
    paddingVertical: 10,
    borderRadius: 6,
    gap: 8,
  },

  sortButtonText: {
    ...Typography.bodyMedium,
    color: "#fff",
    fontSize: 14,
  },

  tasksContainer: {
    flex: 1,
    marginTop: 20,
  },

  flatListStyle: {
    flex: 1,
  },

  tasksList: {
    gap: 15,
    flexGrow: 1,
  },

  searchIcon: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
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

  dateTimeModal: {
    backgroundColor: "#102D53",
    borderRadius: 12,
    padding: 20,
    minWidth: 280,
    alignItems: "center",
  },

  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
