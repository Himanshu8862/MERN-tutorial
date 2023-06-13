const express = require("express")
const workoutRouter = express.Router()

// GET all workouts
workoutRouter.get("/", (req,res)=>{
    res.json({
        mssg: "GET all workouts"
    })
})

// GET single workout
workoutRouter.get("/:id", (req,res)=>{
    res.json({
        mssg: "GET a single workout"
    })
})

// POST a new workout
workoutRouter.post("/", (req,res)=>{
    console.log(req.body)
    res.json({
        mssg: "POST a new workout"
    })
})

// DELETE a workout
workoutRouter.delete("/:id", (req,res)=>{
    res.json({
        mssg: "DELETE a workout"
    })
})

// UPDATE a workout
workoutRouter.patch("/:id", (req,res)=>{
    res.json({
        mssg: "UPDATE a workout"
    })
})

module.exports = workoutRouter