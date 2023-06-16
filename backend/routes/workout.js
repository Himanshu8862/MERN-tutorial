const express = require("express")
const workoutRouter = express.Router()
const {
    createWorkoutCont,
    getWorkoutsCont,
    getWorkoutCont,
    deleteWorkoutCont,
    updateWorkoutCont
} = require("../controllers/workoutController")
const requireAuth = require("../middleware/requireAuth")

// this middleware function gets fired before any of the routes below
workoutRouter.use(requireAuth)

// GET all workouts
workoutRouter.get("/", getWorkoutsCont)

// GET single workout
workoutRouter.get("/:id", getWorkoutCont)

// POST a new workout
workoutRouter.post("/", createWorkoutCont)

// DELETE a workout
workoutRouter.delete("/:id", deleteWorkoutCont)

// UPDATE a workout
workoutRouter.patch("/:id", updateWorkoutCont)

module.exports = workoutRouter