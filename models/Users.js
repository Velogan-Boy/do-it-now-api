const prisma = require('../prisma/prisma'); // Prisma Client

// PRSIMA MODEL (** NOTE: This is not a real Prisma model, just a reference for the schema **)

// model Users {
//   id Int @id @default(autoincrement())
//   name String
//   email String @unique
//   password String
//   created_at DateTime @default(now())
//   sessions Sessions[]
//   tasks Tasks[]
// }

// HELPER FUNCTIONS

// For Creating a new user

const createUser = async (name,email, password) => {
   try {
      const user = await prisma.users.create({
         data: {
            name,
            email,
            password,
         },
      });

      return { user, err: null };
   } catch (err) {
      return { user: null, err };
   }
};

// For Finding a user by email

const findUserByEmail = async (email) => {
   try {
      const user = await prisma.users.findUnique({
         where: { email: email },
      });

      return { user, err: null };
   } catch (err) {
      return { user: null, err };
   }
};

// For Finding a user by user id

const findUserById = async (id) => {
   try {
      const user = await prisma.users.findUnique({
         where: { id: id },
      });

      return { user, err: null };
   } catch (err) {
      return { user: null, err };
   }
};

// EXPORTS

module.exports = {
   createUser,
   findUserByEmail,
   findUserById,
};
