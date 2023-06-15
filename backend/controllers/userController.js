const User = require("../models/User")

// login user
const userLoginCont = async (req, res) => {
    res.json({ mssg: "user login" })
}

// register user
const userRegisterCont = async (req, res) => {
    res.json({ mssg: "user resgister" })
}

module.exports = {
    userLoginCont,
    userRegisterCont
}