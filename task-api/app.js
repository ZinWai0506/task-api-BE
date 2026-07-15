const express = require("express");
const morgan = require("morgan")
const { db , User } = require("./models");
const tasksRouter = require("./routes/tasks");
const userRouter = require("./routes/user");
const app = express();
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(express.json());
app.use(morgan('combined'))
app.use(logger)
app.get("/", (req,res)=>{
  res.redirect("/api/tasks")
})
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/tasks", tasksRouter)
app.use("/api/users", userRouter)
app.get('/users',async (req,res,next)=>
{
  try {
    const users = await User.findAll()
    console.log('Yay!!!, i got users')
    res.json(users)
  } catch (err) {
    next(err)
  }
})
app.use((req,res)=>{
  res.status(404).json({ error: "Not found" });
})
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});
db.sync()
  .then(() => {
    console.log("DB connected")
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((er)=> 
  {
    console.log(er)
  })
