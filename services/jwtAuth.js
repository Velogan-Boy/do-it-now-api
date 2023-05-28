const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// JWT SERVICES

// create a JWT token with email as payload

const createJWT = (email) => {
   var token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: 5 * 86400, // expires in 5 days
      algorithm: process.env.SIGNING_ALGO, // algorithm used to sign the token
   });

   return token;
};

// verify the JWT token and return the decoded payload

const verifyJWT = (token) => {
   let decoded;
   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { exp } = decoded;

      const isExpired = Date.now() >= exp * 1000;

      return { isExpired, err: null };
   } catch (err) {
      return { isExpired: true, err };
   }
};

// EXPORTS
module.exports = {
   createJWT,
   verifyJWT,
};
