const express = require("express")
const workoutRouter = express.Router()
const Workout = require("../models/Workout")

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
workoutRouter.post("/", async(req,res)=>{
    const {title, load, reps} = req.body;
    // console.log(workout)
    try {
        const workout = await Workout.create({
            title, reps, load
        })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

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