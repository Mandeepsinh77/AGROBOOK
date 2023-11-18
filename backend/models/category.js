const mongoose = require("mongoose")
const { Schema } = mongoose;
const CategorySchema = new Schema({
    shopkeeperid: {
        type: String,
        require:true
    },
    category_name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Category", CategorySchema);