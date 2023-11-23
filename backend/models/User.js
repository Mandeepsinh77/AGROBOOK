const mongoose = require("mongoose")
const { Schema } = mongoose;
const UserSchema = new Schema({
    shopname:{
        type: String,
        require:true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    verifytoken:String,
    user_token:{
        type: String,
    }
})

module.exports = mongoose.model("user", UserSchema);