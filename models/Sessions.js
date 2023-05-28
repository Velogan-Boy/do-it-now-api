const prisma = require('../prisma/prisma'); // Prisma Client

// PRSIMA MODEL (** NOTE: This is not a real Prisma model, just a reference for the schema **)

// model Sessions {
//   id Int @id @default(autoincrement())
//   token String @unique
//   user_id Int
//   created_at DateTime @default(now())
//  is_expired Boolean @default(false)
//   user Users @relation(fields: [user_id], references: [id])
// }

// HELPER FUNCTIONS

// For Checking if a session exists

const checkSession = async (token) => {
   try {
      const session = await prisma.sessions.findUnique({
         where: { token: token },
         select: { is_expired: true, user_id: true },
      });

      return { session, err: null };
   } catch (err) {
      return { session: null, err };
   }
};

// For Creating a new session

const createSession = async (token, user_id) => {
   try {
      const session = await prisma.sessions.create({
         data: {
            token,
            user_id,
         },
      });

      return { session, err: null };
   } catch (err) {
      return { session: null, err };
   }
};

// For Expiring a session

const expireSession = async (token) => {
   try {
      await prisma.sessions.update({
         where: { token: token },
         data: { is_expired: true },
      });

      return null;
   } catch (err) {
      return err;
   }
};

// For Removing a session (logout)

const removeSession = async (token) => {
   try {
      await prisma.sessions.delete({
         where: { token: token },
      });

      return null;
   } catch (err) {
      return err;
   }
};

// For Getting a user by session

const getUserBySession = async (token) => {
   try {
      const user = await prisma.sessions.findUnique({
         where: { token: token },
         select: {
            users: {
               select: {
                  id: true,
                  email: true,
               },
            },
         },
      });

      return { user: user.users, err: null };
   } catch (err) {
      return { user: null, err };
   }
};

// EXPORTS

module.exports = {
   checkSession,
   createSession,
   expireSession,
   removeSession,
   getUserBySession,
};
