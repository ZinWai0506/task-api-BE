const {db , User , Task} = require("./models")
async function seed() {
    await db.sync({force : true})
    const Alex = await User.create({
        name : "Alex",
        email : "alex@example.com",
        password : "youwannaknow?"
    })
    await Task.create({title : "Do the assignments", priority : 3 , status : "todo", UserId : Alex.id})
    await Task.create({title: "Review pull requests", priority: 2, status: "doing", UserId: Alex.id })
    await Task.create({title: "Water the plants", priority: 1, status: "done", UserId: Alex.id })
    

    console.log("seeded")
    await db.close();
}
seed();