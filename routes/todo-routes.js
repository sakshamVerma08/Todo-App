// filepath: c:\Backend Practice\todo-app\routes\todo-routes.js
import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createTodo,
  getTodos,
  deleteTodo,
} from "../controllers/todo-controller.js";

const router = express.Router();

router.get("/", authMiddleware, getTodos);

router.post("/create-todo", authMiddleware, createTodo);

router.put("/:id", (req, res) => {
  res.send(`Update todo with ID: ${req.params.id}`);
});

router.delete("/delete-todo/:id", authMiddleware, deleteTodo);

// Example route for deleting a todo
router.delete("/:id", (req, res) => {
  res.send(`Delete todo with ID: ${req.params.id}`);
});

export default router;
