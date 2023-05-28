const bcrypt = require('bcryptjs');

// hash the password
const hashPassword = (password) => {
   // generate salt
   let salt = bcrypt.genSaltSync(10);
   // hash the password
   let hash = bcrypt.hashSync(password, salt);
   return hash;
};

// verify the password
const verifyPassword = (password, dbpass) => {
   // compare the password with the hashed password
   return bcrypt.compareSync(password, dbpass);
};

module.exports = {
   hashPassword,
   verifyPassword,
};
