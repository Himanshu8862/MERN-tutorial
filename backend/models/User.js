const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

// static resgister method
userSchema.statics.register = async function(email, password) { // we can not use arrow function here, because we are using this keyword

    // validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Enter a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password should be of minimum 8 characters, with atleast 1 lowercase, 1 uppercase, 1 number and 1 symbol")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already exsists")
    }

    // generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hashedPassword })
    return user
}


// static login method
userSchema.statics.login = async function (email, password) {

    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect email")
    }

    // verify password
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect password")
    }

    return user;

}

const User = mongoose.model("User", userSchema);
module.exports = User;