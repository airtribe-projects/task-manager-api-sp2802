const taskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  const { completed, sort } = req.query;
  const tasks = await taskModel.getAllTasks({ completed, sort });
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const id = Number(req.params.id);
  const task = await taskModel.getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  res.json(task);
};

const createTask = async (req, res) => {
  const { title, description, completed, priority = 'low' } = req.body;
  //my testcases were failing so gave default value to priority field as low if it's not provided at the time of creation as it is not mentioned clearly if it should be mandatory
  const newTask = await taskModel.createTask({
    title: title.trim(),
    description: description.trim(),
    completed,
    priority: priority.toLowerCase()
  });
  res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
  const id = Number(req.params.id);
  const task = await taskModel.getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Task not found.' });

  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title.trim();
  if (req.body.description !== undefined) updates.description = req.body.description.trim();
  if (req.body.completed !== undefined) updates.completed = req.body.completed;
  if (req.body.priority !== undefined) updates.priority = req.body.priority.toLowerCase();

  const updatedTask = await taskModel.updateTask(id, updates);
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await taskModel.deleteTask(id);
  if (!deleted) return res.status(404).json({ error: 'Task not found.' });
  res.json({ message: 'Task deleted.', task: deleted });
};

const getTasksByPriority = async (req, res) => {
  const priority = req.params.level.toLowerCase();
  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Priority must be one of: low, medium, high.' });
  }
  const tasks = await taskModel.getTasksByPriority(priority);
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
