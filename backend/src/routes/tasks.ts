import { Router, Request, Response } from "express";
import { Task, TaskStatus } from "../models/Task";

const router = Router();

// GET /api/tasks — fetch all tasks
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// POST /api/tasks — create a new task
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

// PATCH /api/tasks/:id — update status or title
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const validStatuses: TaskStatus[] = ["todo", "in-progress", "done"];

    if (status && !validStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...(title && { title }), ...(description !== undefined && { description }), ...(status && { status }) },
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
