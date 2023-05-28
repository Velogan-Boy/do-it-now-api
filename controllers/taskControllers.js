const Users = require('../models/Users');
const Tasks = require('../models/Tasks');

// TASK CONTROLLERS

// @route   GET /tasks
// @desc    Get All Tasks
// @body    none
// @access  Private (should pass tokenAuth middleware)
// @query   page, limit, isCompleted (optional)

const getAllTasksController = async (req, res) => {
   const { user_id } = req;

   const { page, limit, isCompleted } = req.query; // /tasks?page=1&limit=10&isCompleted=1

   const { tasks, err } = await Tasks.findTasksByUserId(user_id, page, limit, isCompleted);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!tasks) {
      res.status(200).json({ message: 'No Tasks Found', tasks: [] });
   }

   return res.status(200).json({ message: 'Tasks Found Successfully', tasks });
};

// @route   GET /tasks/:id
// @desc    Get Task By Id
// @body    none
// @access  Private (should pass tokenAuth middleware)

const getTaskByIdController = async (req, res) => {
   const { id } = req.params;

   const { task, err } = await Tasks.findTaskById(+id);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!task) {
      return res.status(404).json({ message: 'Task not found' });
   }

   return res.status(200).json({ message: 'Task Found Successfully', task });
};

// @route   POST /tasks
// @desc    Create New Task
// @body    title, description, deadline
// @access  Private (should pass tokenAuth middleware)

const createTaskController = async (req, res) => {
   const { user_id } = req;

   const { title, description, deadline } = req.body;

   const { user, err } = await Users.findUserById(user_id);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }

   const { task, err: taskErr } = await Tasks.createTask(title, description, deadline, user_id);

   if (taskErr) {
      return res.status(500).json({ message: 'Internal Server Error', error: taskErr.message });
   }

   return res.status(201).json({ message: 'Task Created Successfully', task });
};

// @route   PUT /tasks/:id
// @desc    Update Task By Id
// @body    title, description, deadline
// @access  Private (should pass tokenAuth middleware)

const updateTaskByIdController = async (req, res) => {
   const { id } = req.params;
   const { title, description, deadline } = req.body;

   const { task, err } = await Tasks.findTaskById(+id);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!task) {
      return res.status(404).json({ message: 'Task not found' });
   }

   const { updatedTask, err: updateErr } = await Tasks.updateTaskById(+id, { title, description, deadline });

   if (updateErr) {
      return res.status(500).json({ message: 'Internal Server Error', error: updateErr.message });
   }

   return res.status(200).json({ message: 'Task Updated Successfully', updatedTask });
};

// @route   PATCH /tasks/:id/complete
// @desc    Mark as Completed Task By Id (vice versa)
// @body    none
// @access  Private (should pass tokenAuth middleware)

const completeTaskByIdController = async (req, res) => {
   const { id } = req.params;

   const { task, err } = await Tasks.findTaskById(+id);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!task) {
      return res.status(404).json({ message: 'Task not found' });
   }

   const { updatedTask, err: updateErr } = await Tasks.markTaskAsCompleted(+id, !task.isCompleted);

   if (updateErr) {
      return res.status(500).json({ message: 'Internal Server Error', error: updateErr.message });
   }

   if (!task.isCompleted) {
      return res.status(200).json({ message: 'Task Marked as Completed', updatedTask });
   } else {
      return res.status(200).json({ message: 'Task Marked as Incomplete', updatedTask });
   }
};

// @route   DELETE /tasks/:id
// @desc    Delete Task By Id
// @body    none
// @access  Private (should pass tokenAuth middleware)

const deleteTaskByIdController = async (req, res) => {
   const { id } = req.params;

   const { task, err } = await Tasks.findTaskById(+id);

   if (err) {
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
   }

   if (!task) {
      return res.status(404).json({ message: 'Task not found' });
   }

   let deleteErr = await Tasks.deleteTaskById(+id);

   if (deleteErr) {
      return res.status(500).json({ message: 'Internal Server Error', error: deleteErr.message });
   }

   return res.status(200).json({ message: 'Task Deleted Successfully', task: [] });
};

// EXPORTS

module.exports = {
   getAllTasksController,
   getTaskByIdController,
   createTaskController,
   updateTaskByIdController,
   completeTaskByIdController,
   deleteTaskByIdController,
};
