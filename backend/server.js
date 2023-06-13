const express = require("express")
require("dotenv").config()
const workoutRouter = require("./routes/workout")

// express app
const app = express();

// middleware
app.use(express.json()) // any request that comes in, it looks into the body of the request and passes it to the req object
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use("/api/workouts", workoutRouter);

// listen for requests
app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`))