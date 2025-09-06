import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  completed?: boolean;
  createdAt?: string;
}

const TASKS_STORAGE_KEY = "@tasks";

export class Task {
  static async getTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (tasksJson) {
        return JSON.parse(tasksJson);
      }
      return [];
    } catch (error) {
      console.error("Error getting tasks:", error);
      return [];
    }
  }

  static async createTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const newTask = {
        ...task,
        id: task.id || Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      tasks.push(newTask);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  static async updateTask(
    taskId: string,
    updates: Partial<Task>
  ): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  static async deleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      await AsyncStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(filteredTasks)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  static async clearAllTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing tasks:", error);
      throw error;
    }
  }
}
