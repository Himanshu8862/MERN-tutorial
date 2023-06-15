const express = require("express");
const userRouter = express.Router();
const { userLoginCont, userRegisterCont } = require("../controllers/userController")

// Login route
userRouter.post("/login", userLoginCont)

// Register route
userRouter.post("/register", userRegisterCont)

module.exports = userRouter;