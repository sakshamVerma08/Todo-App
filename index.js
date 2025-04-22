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
app.get("/", (req, res) => {
  res.send("TEST THIS ON POSTMAN API");
});
app.use("/api/auth", authRoutes);

app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
