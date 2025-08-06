const taskModel = require('../models/taskModel');

const getAllTasks = (req, res) => {
  const { completed, sort } = req.query;
  const tasks = taskModel.getAllTasks({ completed, sort });
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskModel.getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  res.json(task);
};

const createTask = (req, res) => {
  const { title, description, completed, priority } = req.body;
  const newTask = taskModel.createTask({
    title: title.trim(),
    description: description.trim(),
    completed,
    priority: priority.toLowerCase()
  });
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskModel.getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });

  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title.trim();
  if (req.body.description !== undefined) updates.description = req.body.description.trim();
  if (req.body.completed !== undefined) updates.completed = req.body.completed;
  if (req.body.priority !== undefined) updates.priority = req.body.priority.toLowerCase();

  const updatedTask = taskModel.updateTask(id, updates);
  res.json(updatedTask);
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = taskModel.deleteTask(id);
  if (!deleted) return res.status(404).json({ error: 'Task not found.' });
  res.json({ message: 'Task deleted.', task: deleted });
};

const getTasksByPriority = (req, res) => {
  const priority = req.params.level.toLowerCase();
  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Priority must be one of: low, medium, high.' });
  }
  const tasks = taskModel.getTasksByPriority(priority);
  res.json(tasks);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority
};