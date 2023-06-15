const Workout = require("../models/Workout")
const mongoose = require("mongoose")

// GET all workout
const getWorkoutsCont = async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ "createdAt": -1 })
        res.status(200).json(workouts)
    } catch {
        res.status(400).json({ error: error.message })
    }
}

// GET single workout
const getWorkoutCont = async (req, res) => {
    const id = req.params.id
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "No such workout" })
        }
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(400).json({ error: "No such workout" })
        }
        res.status(200).json({ workout })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// POST a new workout
const createWorkoutCont = async (req, res) => {
    const { title, load, reps } = req.body;
    // console.log(workout)

    let emptyFields = [];
    if(!title){
        emptyFields.push("title")
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }
    if(emptyFields.length>0){
        return res.status(400).json({ error: "Please fill all the fields", emptyFields })
    }


    try {
        const workout = await Workout.create({
            title, reps, load
        })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// DELETE a workout
const deleteWorkoutCont = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "No such workout" })
        }
        const workout = await Workout.findOneAndDelete({_id: id})
        if (!workout) {
            return res.status(400).json({ error: "No such workout" })
        }
        res.status(200).json(workout)

    } catch (error) {
        return res.status.json({ error: error.message })
    }
}


// UPDATE a workout
const updateWorkoutCont = async(req, res) =>{
    const id = req.params.id;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "No such workout" })
        }
        const workout = await Workout.findOneAndUpdate({_id: id},{...req.body})
        if (!workout) {
            return res.status(400).json({ error: "No such workout" })
        }

        res.status(200).json(workout)

    } catch (error) {
        return res.status.json({ error: error.message })
    }
}


module.exports = {
    createWorkoutCont,
    getWorkoutsCont,
    getWorkoutCont,
    deleteWorkoutCont,
    updateWorkoutCont
}