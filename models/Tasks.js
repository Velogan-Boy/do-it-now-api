const prisma = require('../prisma/prisma');

// PRSIMA MODEL (** NOTE: This is not a real Prisma model, just a reference for the schema **)

// model Tasks {
//   id Int @id @default(autoincrement())
//   title String
//   description String?
//   isCompleted Boolean @default(false)
//   deadline DateTime
//   user_id Int
//   created_at DateTime @default(now())
//   user Users @relation(fields: [user_id], references: [id])
// }

// HELPER FUNCTIONS

// For Creating a new task

const createTask = async (title, description, deadline, user_id) => {
   try {
      const data = {
         title,
         description: description ? description : null,
         deadline: deadline ? deadline : null,
         user_id: user_id,
      };

      const task = await prisma.tasks.create({
         data,
      });

      return { task, err: null };
   } catch (err) {
      return { task: null, err };
   }
};

// For Finding a task by id

const findTaskById = async (id) => {
   try {
      const task = await prisma.tasks.findUnique({
         where: { id: id },
      });

      return { task, err: null };
   } catch (err) {
      return { task: null, err };
   }
};

// For Finding all tasks by user_id ( Filter and pagination included )

const findTasksByUserId = async (user_id, pageNo, limit, isCompleted) => {
   try {
      if (!pageNo || pageNo == 0) pageNo = 1;
      if (!limit) limit = 10;

      const whereClause = {
         user_id: user_id,
      };

      
      if (isCompleted !== undefined) {
         whereClause.isCompleted = isCompleted == 1 ? true : false;
      }
      

      const tasks = await prisma.tasks.findMany({
         skip: (pageNo - 1) * limit,
         take: +limit,
         where: {
            ...whereClause,
         },
         orderBy: {
            created_at: 'desc',
         },
      });

      return { tasks, err: null };
   } catch (err) {
      return { tasks: null, err };
   }
};

// For Updating a task by id

const updateTaskById = async (id, { title, description, deadline }) => {
   try {
      const task = await prisma.tasks.update({
         where: { id: id },
         data: {
            title,
            description,
            deadline,
         },
      });

      return { task, err: null };
   } catch (err) {
      return { task: null, err };
   }
};

// To mark a task as completed by id

const markTaskAsCompleted = async (id, isCompleted) => {
   try {
      const task = await prisma.tasks.update({
         where: { id: id },
         data: {
            isCompleted,
         },
      });

      return { task, err: null };
   } catch (err) {
      return { task: null, err };
   }
};

// For Deleting a task by id

const deleteTaskById = async (id) => {
   try {
      await prisma.tasks.delete({
         where: { id: id },
      });

      return null;
   } catch (err) {
      return err;
   }
};

// EXPORTS

module.exports = {
   createTask,
   findTaskById,
   findTasksByUserId,
   updateTaskById,
   markTaskAsCompleted,
   deleteTaskById,
};
