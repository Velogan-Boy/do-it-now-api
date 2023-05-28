const joi = require('joi');

const validateUserRegisteration = (req, res, next) => {
   const schema = joi.object({
      name: joi.string().min(3).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).max(20).required(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   next();
};

module.exports = {
   validateUserRegisteration,
};
