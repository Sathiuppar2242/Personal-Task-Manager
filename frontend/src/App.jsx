import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError("Unable to load tasks from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setError("");

      const response = await createTask({
        title: title.trim(),
        description: description.trim()
      });

      setTasks((currentTasks) => [response.data, ...currentTasks]);

      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Unable to create task.");
    }
  };

  const handleToggle = async (task) => {
    try {
      const response = await updateTask(task._id, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      });

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item._id === task._id ? response.data : item
        )
      );
    } catch (err) {
      setError("Unable to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  return (
    <div>
      <h1>Personal Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      {loading && <p>Loading tasks...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks available.</p>
      )}

      {!loading &&
        tasks.map((task) => (
          <div key={task._id}>
            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
              Status: {task.completed ? "Completed" : "Pending"}
            </p>

            <button onClick={() => handleToggle(task)}>
              {task.completed ? "Mark Pending" : "Mark Completed"}
            </button>

            <button onClick={() => handleDelete(task._id)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;