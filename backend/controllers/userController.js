const User = require("../models/User")

// login user
const userLoginCont = async (req, res) => {
    res.json({ mssg: "user login" })
}

// register user
const userRegisterCont = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.register(email, password)
        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    userLoginCont,
    userRegisterCont
}