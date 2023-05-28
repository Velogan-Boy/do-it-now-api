const joi = require('joi');

const validateCreateTask = (req, res, next) => {
   const schema = joi.object({
      title: joi.string().min(3).max(20).required(),
      description: joi.string().min(3).max(100),
      deadline: joi.date(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   next();
};

const validateUpdateTask = (req, res, next) => {
   const schema = joi.object({
      title: joi.string().min(3).max(20),
      description: joi.string().min(3).max(100),
      deadline: joi.date(),
      isCompleted: joi.boolean(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   next();
};

module.exports = {
   validateCreateTask,
   validateUpdateTask,
};
