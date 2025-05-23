// filepath: c:\Backend Practice\todo-app\routes\todo-routes.js
import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  markCompleteController
} from "../controllers/todo-controller.js";

const router = express.Router();

router.get("/", authMiddleware, getTodos);

router.post("/create-todo", authMiddleware, createTodo);

router.put("/update-todo/:id", authMiddleware, updateTodo);

router.delete("/delete-todo/:id", authMiddleware, deleteTodo);

router.put("/mark-completed/:id", authMiddleware, markCompleteController);

export default router;
