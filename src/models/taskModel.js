let tasks = [];
let nextId = 1;

const getAllTasks = async ({ completed, sort }) => {
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
};

const getTaskById = async (id) => {
  return tasks.find(task => task.id === id);
};

const createTask = async (data) => {
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
};

const updateTask = async (id, updates) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...updates };
  return tasks[index];
};

const deleteTask = async (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  return tasks.splice(index, 1)[0];
};

const getTasksByPriority = async (priority) => {
  return tasks.filter(task => task.priority === priority.toLowerCase());
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority
};
