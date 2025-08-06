const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const validateTask = require('../middleware/validation');

// CRUD routes with validation
router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.post('/', validateTask.validateCreate, controller.createTask);
router.put('/:id', validateTask.validateUpdate, controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;