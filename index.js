import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import { createTodo, getTodos } from "./controllers/todo-controller.js";
import { authMiddleware } from "./middlewares/auth.js";
import {
  signUpController,
  loginController,
} from "./controllers/auth-controller.js";

const app = express();
connectToDB;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APPLICATION ROUTES //
app.post("/signup", signUpController);

app.get("/login", loginController);

app.get("/get-todos", authMiddleware, getTodos);

app.post("/create-todo", authMiddleware, createTodo);

app.delete("/delete-todo:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
