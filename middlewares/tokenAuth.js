const Sessions = require('../models/Sessions');

const { verifyJWT } = require('../services/jwtAuth');

// middleware fn to check if the token is valid and to check if the session is expired

const tokenAuth = async (req, res, next) => {
   // get the token from the header
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

   if (!token) {
      return res.status(404).json({
         message: 'Token not found',
         isExpired: true,
      });
   }

   // verify the token

   let { isExpired, err: jwtError } = verifyJWT(token);

   if (jwtError) {
      let result = await Sessions.expireSession(token);

      return res.status(400).json({
         message: 'Invalid token',
         isExpired,
      });
   }

   // check if the session is expired

   let { session, err } = await Sessions.checkSession(token);

   if (err) {
      return res.status(500).json({
         message: 'Internal Server Error',
         error: err.message,
         isExpired: true,
      });
   }

   if (!session) {
      let result = await Sessions.expireSession(token);

      return res.status(400).json({
         message: 'Invalid session',
         isExpired: true,
      });
   }

   // if session is expired remove the session ( for minimizing the number of sessions in the db)

   if (session.is_expired) {
      // remove session

      const res = await Sessions.removeSession(token);

      if (res) {
         return res.status(500).json({
            message: 'Internal Server Error',
            error: res.message,
            isExpired: true,
         });
      }

      return res.status(400).json({
         message: 'Session expired',
         isExpired: true,
      });
   }

   // pass user_id and token to the next middleware

   req.user_id = session.user_id;
   req.token = token;

   next();
};

// EXPORTS
module.exports = tokenAuth;
