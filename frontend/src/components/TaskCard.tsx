import { Task, TaskStatus } from "../types/task";

interface Props {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "done": "Done",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  "todo": "#6c757d",
  "in-progress": "#e67e22",
  "done": "#27ae60",
};

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  "todo": "in-progress",
  "in-progress": "done",
  "done": "todo",
};

export default function TaskCard({ task, onStatusChange, onDelete }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <span style={{ ...styles.badge, background: STATUS_COLORS[task.status] }}>
          {STATUS_LABELS[task.status]}
        </span>
        <button style={styles.deleteBtn} onClick={() => onDelete(task._id)} title="Delete task">✕</button>
      </div>
      <h3 style={styles.title}>{task.title}</h3>
      {task.description && <p style={styles.desc}>{task.description}</p>}
      <button
        style={styles.advanceBtn}
        onClick={() => onStatusChange(task._id, NEXT_STATUS[task.status])}
      >
        {task.status === "done" ? "↺ Reset to To Do" : `→ Move to ${STATUS_LABELS[NEXT_STATUS[task.status]]}`}
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: { background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: 8 },
  top: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  badge: { color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.5 },
  deleteBtn: { background: "none", border: "none", color: "#aaa", fontSize: 16, cursor: "pointer", padding: 0 },
  title: { margin: 0, fontSize: 16, color: "#1a1a1a" },
  desc: { margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 },
  advanceBtn: { marginTop: 4, background: "#EAF1FB", color: "#1B5E9B", border: "none", padding: "7px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600, alignSelf: "flex-start" },
};
