const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
   res.status(200).json({ message: 'You hit api v1 route' });
});

// Users Routers
router.use('/users', require('./userRouter'));
// Tasks Routers
router.use('/tasks', require('./taskRouter'));

module.exports = router;
