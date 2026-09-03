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
  const [editingId, setEditingId] = useState(null);
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

      if (editingId) {
        const response = await updateTask(editingId, {
          title: title.trim(),
          description: description.trim(),
          completed: tasks.find((task) => task._id === editingId)?.completed || false
        });

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task._id === editingId ? response.data : task
          )
        );

        setEditingId(null);
      } else {
        const response = await createTask({
          title: title.trim(),
          description: description.trim()
        });

        setTasks((currentTasks) => [response.data, ...currentTasks]);
      }

      setTitle("");
      setDescription("");
    } catch (err) {
      setError(
        editingId
          ? "Unable to update task."
          : "Unable to create task."
      );
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setError("");
  };

  const handleToggle = async (task) => {
    try {
      setError("");

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
      setError("");

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <p className="app-label">TASK MANAGEMENT</p>
        <h1>Personal Task Manager</h1>
        <p className="app-subtitle">
          Organize your work and keep track of your daily tasks.
        </p>
      </header>

      <main>
        <form className="task-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Task" : "Add New Task"}</h2>

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

          <button type="submit">
            {editingId ? "Update Task" : "Add Task"}
          </button>

          {editingId && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </form>

        {loading && <p className="message">Loading tasks...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <div className="empty-state">
            <h2>No Tasks Yet</h2>
            <p>Create your first task using the form above.</p>
          </div>
        )}

        {!loading && tasks.length > 0 && (
          <section className="task-section">
            <div className="section-header">
              <h2>Your Tasks</h2>
              <span>
                {tasks.length} task{tasks.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="task-list">
              {tasks.map((task) => (
                <article
                  className={`task-card ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task._id}
                >
                  <div className="task-content">
                    <h3>{task.title}</h3>

                    {task.description && <p>{task.description}</p>}

                    <span className="task-status">
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)}>
                      Edit
                    </button>

                    <button onClick={() => handleToggle(task)}>
                      {task.completed
                        ? "Mark Pending"
                        : "Mark Completed"}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;