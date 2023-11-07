const mongoose = require("mongoose")
const itemSchema =  new mongoose.Schema({
    shopkeeperid: {
        type: String,
        require: true
    },
    itemname: {
        type: String,
        require: true,
        unique:true
    },
    itemcategory: {
        type: String,
        require: true
    },
    costprice: {
        type: String,
        require: true
    },
    sellingprice: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },
    units: {
        type: String,
        require: true
    }
});
const Item = mongoose.model('Item',itemSchema);
module.exports = Item
