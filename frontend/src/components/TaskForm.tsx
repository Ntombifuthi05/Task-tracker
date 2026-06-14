import { useState } from "react";
import { CreateTaskPayload } from "../types/task";

interface Props {
  onAdd: (payload: CreateTaskPayload) => Promise<void>;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError("Title is required"); return; }
    setLoading(true);
    setError("");
    try {
      await onAdd({ title: title.trim(), description: description.trim() || undefined });
      setTitle("");
      setDescription("");
    } catch {
      setError("Failed to add task. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add New Task</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        style={styles.input}
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />
      <textarea
        style={{ ...styles.input, height: 72, resize: "vertical" }}
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
      />
      <button style={styles.button} type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 32 },
  heading: { margin: "0 0 16px", fontSize: 18, color: "#1B5E9B" },
  input: { display: "block", width: "100%", boxSizing: "border-box", padding: "10px 14px", marginBottom: 12, border: "1px solid #d0d7de", borderRadius: 8, fontSize: 15, fontFamily: "inherit" },
  button: { background: "#1B5E9B", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontSize: 15, cursor: "pointer", fontFamily: "inherit" },
  error: { color: "#c0392b", marginBottom: 10, fontSize: 14 },
};
