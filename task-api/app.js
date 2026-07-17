const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const { db , User } = require("./models");
const tasksRouter = require("./routes/tasks");
const userRouter = require("./routes/user");
const app = express();
const PORT = process.env.PORT || 3000;

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(cors())
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
  })
  .catch((er) => {
    console.error(er)
  })

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
