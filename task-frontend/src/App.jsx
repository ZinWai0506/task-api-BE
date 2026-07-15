  const [users, setUsers] = useState([])
  const [foods, setFoods] = useState([])
  const BASE_API_URL = import.meta.env.VITE_API_URL || 'https://task-api-be.onrender.com/api/users'

  useEffect(() => {
    fetch(BASE_API_URL + '/users')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
    fetch(BASE_API_URL + '/foods')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setFoods(data)
      })
  }, [])

  return (
    <div>
      <h1>My Deployed App!</h1>

      {
        users.map((u) => (
          <p key={u.id}>User: {u.name}</p>
        ))
      }
      {
        foods.map((f) => (
          <p key={f.id}>Food: {f.name}</p>
        ))
      }
    </div>
  )


export default App
