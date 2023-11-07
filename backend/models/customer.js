const mongoose = require("mongoose")
// Schema For The Customer 
const customerSchema = new mongoose.Schema({
    shopkeeperid: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    middlename: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pincode: {
        type: String,
        require: true,
        
    },  
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneno: {
        type: String,
        require: true,
        unique: true
    },
    visited:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        default:'status'
    }
});

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer
