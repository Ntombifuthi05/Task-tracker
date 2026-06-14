import axios from "axios";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "../types/task";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", payload);
  return data;
};

export const updateTask = async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
  const { data } = await api.patch<Task>(`/tasks/${id}`, payload);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
