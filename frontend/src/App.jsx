import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (err) {
        setError("Unable to load tasks from the server.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <div>
      <h1>Personal Task Manager</h1>

      {loading && <p>Loading tasks...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks available.</p>
      )}

      {!loading &&
        !error &&
        tasks.map((task) => (
          <div key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>
              Status: {task.completed ? "Completed" : "Pending"}
            </p>
          </div>
        ))}
    </div>
  );
}

export default App;