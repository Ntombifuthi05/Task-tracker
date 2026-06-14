# Task Tracker — MERN + TypeScript

A full-stack task management application built with the MERN stack and TypeScript.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (via Mongoose) |
| HTTP Client | Axios |

## Features

- Create tasks with a title and optional description
- View tasks organised in three columns: **To Do**, **In Progress**, **Done**
- Advance task status with one click
- Delete tasks
- Fully typed with TypeScript end-to-end
- RESTful API backend

## Project Structure

```
task-tracker/
├── backend/
│   ├── src/
│   │   ├── models/Task.ts       # Mongoose model + types
│   │   ├── routes/tasks.ts      # CRUD route handlers
│   │   └── index.ts             # Express server entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.tsx      # Add task form
    │   │   └── TaskCard.tsx      # Individual task card
    │   ├── services/
    │   │   └── taskService.ts   # Axios API calls
    │   ├── types/
    │   │   └── task.ts          # Shared TypeScript types
    │   ├── App.tsx              # Main component with state
    │   └── main.tsx             # React entry point
    ├── package.json
    └── tsconfig.json
```

## Getting Started

### 1. Set up MongoDB Atlas (free)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a free cluster
3. Under **Database Access**, create a user with a password
4. Under **Network Access**, add `0.0.0.0/0` to allow connections
5. Click **Connect** → **Drivers** and copy your connection string

### 2. Run the Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and paste your MongoDB connection string
npm run dev
```
Server runs on http://localhost:5000

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Author

Ntombifuthi Makosonke
