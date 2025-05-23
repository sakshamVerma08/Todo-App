import Todo from "../schemas/todo-schema.js";
export const createTodo = async (req, res, next) => {
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

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();

    if (!todos) {
      return res.status(400).json({ message: "No todos found" });
    }

    return res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({ message: "Todo coudln't be deleted" });
    }

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Couldn't get ID" });
    }

    const updates = {};
    for (const key in req.body) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).jso({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo updated successfully",
      success: true,
      data: updatedTodo,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markCompleteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Couldn't get ID" });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res
      .status(200)
      .json({ message: "Todo marked as completed", success: true, data: todo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
