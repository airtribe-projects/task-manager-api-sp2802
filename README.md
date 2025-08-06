
# 📝 Task Manager API

A simple RESTful API built using Node.js and Express to manage tasks in memory.  
Supports CRUD operations, filtering, sorting, and priority-based querying.

---

## 📖 Overview

This API allows clients to manage tasks with the following features:
- Create, Read, Update, and Delete (CRUD) tasks
- Validate task input for correctness
- Filter tasks by completion status (`true` or `false`)
- Sort tasks by creation date (`asc` or `desc`)
- Assign and retrieve tasks by priority (`low`, `medium`, `high`)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v14+

### Install dependencies
```bash
npm install
```

### Run the server
```bash
node server.js
```

The server will start at `http://localhost:3000`

---

## 📡 API Endpoints

### 🔍 GET `/tasks`
Retrieve all tasks.

**Query Parameters:**
- `completed=true|false` → filter by status
- `sort=asc|desc` → sort by createdAt

**Example:**
```bash
curl "http://localhost:3000/tasks?completed=false&sort=asc"
```

---

### 📌 GET `/tasks/:id`
Retrieve a task by ID.

```bash
curl http://localhost:3000/tasks/1
```

---

### 🎯 GET `/tasks/priority/:level`
Retrieve tasks by priority (`low`, `medium`, `high`).

```bash
curl http://localhost:3000/tasks/priority/high
```

---

### ➕ POST `/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "New task",
  "description": "Complete module",
  "completed": false,
  "priority": "high"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"New task","description":"Complete module","completed":false,"priority":"high"}'
```

---

### 🔁 PUT `/tasks/:id`
Update a task.

**Partial Update Allowed.**

```bash
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"completed":true,"priority":"medium"}'
```

---

### ❌ DELETE `/tasks/:id`
Delete a task.

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## ✅ Validation Rules

- `title`: non-empty string
- `description`: non-empty string
- `completed`: boolean
- `priority`: must be `low`, `medium`, or `high`

---

## 🧪 Testing

I personally haved used postman for testing but any Postman, curl, or VSCode REST client could be used to test the endpoints.