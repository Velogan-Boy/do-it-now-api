const express = require('express');

const router = express.Router();

// Middlewares

const tokenAuth = require('../../middlewares/tokenAuth');
const { validateCreateTask, validateUpdateTask } = require('../../validations/taskValidations');

// Controllers

const {
   getAllTasksController,
   getTaskByIdController,
   createTaskController,
   updateTaskByIdController,
   completeTaskByIdController,
   deleteTaskByIdController,
} = require('../../controllers/taskControllers');

// Declaring routes

router
.get('/', tokenAuth, getAllTasksController)
.get('/:id', tokenAuth, getTaskByIdController)
.post('/', tokenAuth, validateCreateTask, createTaskController)
.put('/:id', tokenAuth, validateUpdateTask, updateTaskByIdController)
.patch('/:id/compete', tokenAuth, completeTaskByIdController)
.delete('/:id', tokenAuth, deleteTaskByIdController);

   

module.exports = router;
