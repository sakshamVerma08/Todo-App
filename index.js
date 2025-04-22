import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import authRoutes from "./routes/auth-routes.js";
import todoRoutes from "./routes/todo-routes.js";
const app = express();
connectToDB;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port " + process.env.PORT);
});

/* 

IMPLEMENTATION IDEAS FOR ROUTES:

Get All Todos: A route to fetch all the todos for a user. This typically requires authentication to ensure only the user's todos are retrieved.

Get a Single Todo: A route to fetch the details of a specific todo by its ID.

Create a New Todo: A route to allow users to create a new todo. This would require the user to send details like the title, description, and due date.

Update a Todo: A route to update an existing todo by its ID. Users can modify fields like the title, description, or status (e.g., completed or not).

Delete a Todo: A route to delete a specific todo by its ID.

Mark Todo as Completed: A route to specifically mark a todo as completed without modifying other fields.

Filter Todos: A route to filter todos based on criteria like status (completed or pending), due date, or priority.

Search Todos: A route to search todos by keywords in the title or description.

Paginate Todos: A route to fetch todos in a paginated manner, especially useful if the user has a large number of todos.

Share a Todo: A route to allow users to share a todo with another user (optional, if collaboration is a feature).

*/
