const express = require("express")
const router = express.Router()
const { Task } = require("../models")
const {Op}  = require("sequelize")
function requireTitle(req,res,next){
    if (!req.body.title){
        return res.status(400).json({error : "title is required"})
    }
    next();
}
router.get("/",async (req,res)=> {
    const {status,search,minPriority} = req.query
    const where  = {}
    if (status) 
        where.status = status;
    if (search)
        where.title = {[Op.iLike] : `%${search}%`}
    if (minPriority)
        where.priority = {[Op.gte] : Number(minPriority)}
    const tasks = await Task.findAll({where})
    res.json(tasks)
})
router.get("/:id", async(req,res)=>{
    const tasks = await Task.findByPk(req.params.id);
    if (!tasks) return res.status(404).json({error : "Task not found"})
    res.json(tasks)

})
router.post("/",requireTitle,async (req,res,next)=>
{
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task);
    }
    catch (err) {
        if (err.name === "SequelizeValidationError"){
            return res.status(400).json({error : err.errors[0].message})
        }
        next(err);
    }
})
router.patch("/:id", async (req,res)=>{
    const task = await Task.findByPk(req.params.id)
    if (!task) return res.status(404).json({error : "Task not found"})
    await task.update(req.body)
    res.json(task)
})
router.delete("/:id", async (req , res)=>{
    const task = await Task.findByPk(req.params.id)
    if (!task) return res.status(404).json({error : "Task not found"})
    await task.destroy();
    res.sendStatus(204);
})
module.exports = router;
