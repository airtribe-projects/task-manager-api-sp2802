const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const validateTask = require('../middleware/validation');

router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTaskById);
router.get('/priority/:level', controller.getTasksByPriority);
router.post('/', validateTask.validateCreate, controller.createTask);
router.put('/:id', validateTask.validateUpdate, controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;