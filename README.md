# 📋 Task Tracker

A full-stack task management application built with the **MERN stack** and **TypeScript**. Tasks are organised into a Kanban-style board with three columns: **To Do**, **In Progress**, and **Done**.

Built as a portfolio project to demonstrate full-stack JavaScript/TypeScript development using MongoDB, Express, React, and Node.js.

---

## 🖥️ Preview

> Clone the project and run it locally to see it in action (setup instructions below).

---

## ✨ Features

- ➕ Create tasks with a title and optional description
- 📌 View tasks organised across three status columns
- 🔄 Advance task status with a single click (To Do → In Progress → Done)
- 🗑️ Delete tasks
- 💾 All data persisted in MongoDB — tasks survive page refresh
- 🔒 Full TypeScript coverage on both frontend and backend
- 🌐 RESTful API with proper HTTP status codes and error handling

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | User interface |
| Frontend | TypeScript | Type safety |
| Frontend | Vite | Build tool and dev server |
| Frontend | Axios | HTTP requests to the API |
| Backend | Node.js | JavaScript runtime |
| Backend | Express.js | REST API framework |
| Backend | TypeScript | Type safety |
| Database | MongoDB Atlas | Cloud database |
| Database | Mongoose | MongoDB object modelling |
| Dev Tools | ts-node-dev | TypeScript hot reload |
| Version Control | Git + GitHub | Source control |

---

## 📁 Project Structure

```
task-tracker/
│
├── backend/                        # Express + TypeScript API
│   ├── src/
│   │   ├── models/
│   │   │   └── Task.ts             # Mongoose schema and TypeScript interface
│   │   ├── routes/
│   │   │   └── tasks.ts            # CRUD route handlers (GET, POST, PATCH, DELETE)
│   │   └── index.ts                # Server entry point, DB connection
│   ├── .env.example                # Environment variable template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                       # React + TypeScript client
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx        # Form for creating new tasks
│   │   │   └── TaskCard.tsx        # Individual task card with status controls
│   │   ├── services/
│   │   │   └── taskService.ts      # Axios API calls (abstracted from components)
│   │   ├── types/
│   │   │   └── task.ts             # Shared TypeScript types and interfaces
│   │   ├── App.tsx                 # Root component, state management
│   │   └── main.tsx                # React entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

---

### 1. Clone the Repository

```bash
git clone https://github.com/Ntombifuthi05/Task-tracker.git
cd Task-tracker
```

---

### 2. Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up for free
2. Create a free **M0 cluster**
3. Under **Database Access** → create a database user with a username and password
4. Under **Network Access** → Add IP Address → enter `0.0.0.0/0` (allows all connections)
5. Click **Connect** → **Drivers** → copy the connection string

---

### 3. Configure the Backend

```bash
cd backend
copy .env.example .env
```

Open `.env` and fill in your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/tasktracker?retryWrites=true&w=majority
```

> ⚠️ If your password contains special characters like `@`, replace them with their URL-encoded equivalent. For example, `@` becomes `%40`.

---

### 4. Run the Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ Connected to MongoDB

```

---

### 5. Run the Frontend

Open a **new terminal window**:

```bash
cd frontend
npm install
npm run dev
```




