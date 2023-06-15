const express = require("express")
require("dotenv").config()
const workoutRouter = require("./routes/workout")
const mongoose = require("mongoose");
const userRouter = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json()) // any request that comes in, it looks into the body of the request and passes it to the req object
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use("/api/workouts", workoutRouter);
app.use("/api/users", userRouter)

// connect to DB
mongoose.connect(process.env.MONGO_URI,)
    .then(() => {
        console.log("Connected to db");
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        })

    }).catch((err) => {
        console.log(err)
    })