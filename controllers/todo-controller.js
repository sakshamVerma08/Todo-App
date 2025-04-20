import Todo from "../schemas/todo-schema.js";
const createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const todo = {
      title,
      description,
      priority,
      status,
    };

    const newTodo = new Todo(todo);

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createTodo;
