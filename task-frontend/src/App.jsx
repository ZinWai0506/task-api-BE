import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const BASE_API_URL = import.meta.env.VITE_API_URL || "https://task-api-be.onrender.com";

  useEffect(() => {
    fetch(BASE_API_URL + "/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });

    fetch(BASE_API_URL + "/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  return (
    <div>
      <h1>My Deployed App!</h1>
      {users.map((u) => (
        <p key={u.id}>User: {u.name}</p>
      ))}
      {tasks.map((t) => (
        <p key={t.id}>Task: {t.title}</p>
      ))}
    </div>
  );
}

export default App;
