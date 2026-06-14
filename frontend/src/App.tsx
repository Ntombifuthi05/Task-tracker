import { useEffect, useState } from "react";
import { Task, TaskStatus, CreateTaskPayload } from "./types/task";
import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "todo", label: "📋 To Do" },
  { status: "in-progress", label: "⚙️ In Progress" },
  { status: "done", label: "✅ Done" },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch {
      setError("Could not connect to the backend. Make sure it is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAdd = async (payload: CreateTaskPayload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    const updated = await updateTask(id, { status });
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Task Tracker</h1>
        <p style={styles.sub}>MERN + TypeScript</p>
      </header>

      <main style={styles.main}>
        <TaskForm onAdd={handleAdd} />

        {loading && <p style={styles.info}>Loading tasks...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {!loading && !error && (
          <div style={styles.columns}>
            {COLUMNS.map(({ status, label }) => {
              const columnTasks = tasks.filter((t) => t.status === status);
              return (
                <div key={status} style={styles.column}>
                  <h2 style={styles.colHeader}>
                    {label} <span style={styles.count}>{columnTasks.length}</span>
                  </h2>
                  <div style={styles.cardList}>
                    {columnTasks.length === 0
                      ? <p style={styles.empty}>No tasks here</p>
                      : columnTasks.map((task) => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                          />
                        ))
                    }
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f0f4f9", fontFamily: "Arial, sans-serif" },
  header: { background: "#1B5E9B", color: "#fff", padding: "24px 32px" },
  logo: { margin: 0, fontSize: 28, fontWeight: 800 },
  sub: { margin: "4px 0 0", opacity: 0.75, fontSize: 14 },
  main: { maxWidth: 1100, margin: "0 auto", padding: 32 },
  columns: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 },
  column: { background: "#e8edf5", borderRadius: 12, padding: 16 },
  colHeader: { fontSize: 15, fontWeight: 700, color: "#1B5E9B", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 },
  count: { background: "#1B5E9B", color: "#fff", borderRadius: 20, padding: "1px 8px", fontSize: 12 },
  cardList: { display: "flex", flexDirection: "column", gap: 12 },
  empty: { fontSize: 13, color: "#999", textAlign: "center", padding: "20px 0" },
  info: { color: "#555", textAlign: "center" },
  error: { color: "#c0392b", textAlign: "center", background: "#fdecea", padding: 14, borderRadius: 8 },
};
