const jwt = require("jsonwebtoken")
const User = require("../models/User")

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" })
    }

    // get token from header
    const token = authorization.split(" ")[1]

    // verify jwt
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)

        // once the token is verified we need to check if that user is present in the DB
        // and then store its into the req object
        req.authUser = await User.findOne({_id}).select("_id")
        next()


    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Request is not authorized"})
    }

}

module.exports = requireAuth