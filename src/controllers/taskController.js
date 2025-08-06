const taskModel = require('../models/taskModel');

const getAllTasks = (req, res) => {
  res.json(taskModel.getAllTasks());
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskModel.getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  res.json(task);
};

const createTask = (req, res) => {
  const { title, description, completed } = req.body;
  const newTask = taskModel.createTask({
    title: title.trim(),
    description: description.trim(),
    completed
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

  const updatedTask = taskModel.updateTask(id, updates);
  res.json(updatedTask);
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = taskModel.deleteTask(id);
  if (!deleted) return res.status(404).json({ error: 'Task not found.' });
  res.json({ message: 'Task deleted.', task: deleted });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};