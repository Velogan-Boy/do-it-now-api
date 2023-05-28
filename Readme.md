# Personal Task Manager (Do It Now! Api)

## Features

-  **User Authentication**: Register and login users with JWT authentication.

-  **Task Management**: Create, update, delete, and complete tasks.

- **Task Filtering**: Filter tasks by status (complete/incomplete).

- **Task pagination**: Paginate tasks to reduce the response size.

-  **Token-Based Authentication**: Secure user authentication using JSON Web Tokens (JWT).

-  **Input Validation**: Validate user input to ensure data integrity and security.

-  **Database Integration**: Integration with a PostgreSQL database using Prisma ORM.

-  **Error Handling**: Proper error handling and error responses for better user experience.

-  **Middleware**: Use middleware functions for authentication and request validation.

-  **Scalability**: Built on Express.js and Node.js, allowing for scalability and handling multiple concurrent requests.

-  **RESTful API**: Follows the principles of a RESTful API design for clear and consistent routes.

-  **Security**: Implemented password hashing to protect user data.

-  **Documentation**: Documented the API endpoints using Postman.

## Setup Instructions

1. Clone the repository to your local machine.

2. Install the project dependencies

```bash
npm install
```

3. Configure the PostgreSQL database connection in the `.env` file.

4. Run the database push script to create the database tables.

```bash
npm run db-push
```

5. Start the server.

```bash
npm run dev
```

6. The server will be running on `http://localhost:5000`.

## Technologies Used

-  Node.js
-  Express.js
-  PostgreSQL
-  Prisma ORM
-  JSON Web Token (JWT)
-  Joi Validation
-  Bcrypt
-  Cors
-  Dotenv-Flow
-  Nodemon

## Router Configuration

### User Routes (`/api/v1/users`)

-  **GET `/`** - to retrieve user information.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Handler: `getUserInfoController`
   -  Body: None
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `user` - The user information.

<br/>

-  **POST `/register`** - to register a new user.

   -  Request Headers: None
   -  Validation: `validateUserRegisteration`
   -  Handler: `registerUserController`
   -  Body:
      -  `name` - The name of the user.
      -  `email` - The email of the user.
      -  `password` - The password of the user.
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `token` - The JWT token of the user.

<br/>

-  **POST `/login`** - to log in a user.

   -  Request Headers: None
   -  Handler: `loginUserController`

   -  Body: - `email` - The email of the user. - `password` - The password of the user.
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `token` - The JWT token of the user.

<br/>

-  **GET `/logout`** - to log out the user.
   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Handler: `logoutUserController`
   -  Body: None
   -  Response:
      -  `message` - A message indicating the success of the request.

<br/>

### Task Routes (`/api/v1/tasks`)

-  **GET `/`** - to retrieve all the tasks of the user.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Handler: `getAllTasksController`
   -  Body: None
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `tasks` - The tasks of the user in an array.

<br/>

-  **GET `/:id`** - to get task by task id.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Handler: `getTaskByIdController`
   -  Body: None
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `task` - Task of the user.

<br/>

-  **POST `/`** - to create a new task.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Validation: `validateCreateTask`
   -  Handler: `createTaskController`
   -  Body:
      -  `title` - The title of the task.
      -  `description` - The description of the task.
      -  `deadline` - The deadline of the task.
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `task` - The created task.

<br/>

-  **PUT `/:id`** - to update a task.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Validation: `validateUpdateTask`
   -  Handler: `updateTaskByIdController`
   -  Body:
      -  `title` - The title of the task.
      -  `description` - The description of the task.
      -  `deadline` - The deadline of the task.
   -  Response:
      -  `message` - A message indicating the success of the request.
      -  `task` - The updated task.

<br/>

-  **PATCH `/:id/complete`** - to mark a task as complete/incomplete.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Handler: `completeTaskByIdController`
   -  Body: None
   -  Response:
      -  `message` - A message wheather the task is marked as complete or incomplete.
      -  `task` - The updated task.

<br/>

-  **DELETE `/:id`** - to delete a task.

   -  Request Headers:
      -  `Authorization` - The JWT token of the user. (Bearer Token)
   -  Middleware: `tokenAuth`
   -  Handler: `deleteTaskController`
   -  Body: None
   -  Response:
      -  `message` - A message indicating the success of the request.

<br/>

## Postman API Documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/17684559/2s93m7X2TR#5d6cf873-cf68-425b-a00e-1f4811faeb99)
