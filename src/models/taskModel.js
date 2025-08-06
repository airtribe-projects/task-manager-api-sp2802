let tasks = [];
let nextId = 1;

function getAllTasks({ completed, sort }) {
  let result = [...tasks];

  if (completed !== undefined) {
    const boolCompleted = completed === 'true';
    result = result.filter(task => task.completed === boolCompleted);
  }

  if (sort === 'asc') {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === 'desc') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
}

function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

function createTask(data) {
  const newTask = {
    id: nextId++,
    title: data.title,
    description: data.description,
    completed: data.completed,
    priority: data.priority,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...updates
  };
  return tasks[index];
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  return tasks.splice(index, 1)[0];
}

function getTasksByPriority(priority) {
  return tasks.filter(task => task.priority === priority.toLowerCase());
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority
};