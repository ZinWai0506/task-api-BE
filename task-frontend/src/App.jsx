import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const BASE_API_URL = import.meta.env.VITE_API_URL || "https://task-api-be.onrender.com";

  useEffect(() => {
    fetch(`${BASE_API_URL}/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : [data]);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load users from the local API.");
      });
  }, []);

  return (
    <div>
      <h1>My Deployed App!</h1>
      {error ? <p>{error}</p> : null}
      {users.map((u) => (
        <p key={u.id}>User: {u.name}</p>
      ))}
    </div>
  );
}

export default App;
