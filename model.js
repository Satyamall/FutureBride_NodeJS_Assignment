
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{ type: String, required: true},
    role: {type: String, required: true},
    active: {type: Boolean, required: true},
    age: {type: Number, required: true}
})

const User = mongoose.model("users",userSchema)

module.exports = User;