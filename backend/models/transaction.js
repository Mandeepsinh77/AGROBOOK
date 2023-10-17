const mongoose = require("mongoose")
const trasactionScehma = new mongoose.Schema(
    {
        shopkeeperid:{
            type:String,
            require:true
        },
        customerid: {
            type: String,
            require: true,
            unique: true
        },
        customername: {
            type: String,
            require: true
        },
        customerphoneno: {
            type: String,
            require: true,
            unique: true
        },
        products: [
            {
                itemId: String, // Unique identifier for the item
                itemName: String, // Name of the item
                itemCategory: String, // Category of the item
                costPrice: Number, // Cost price of the item
                sellingPrice: Number, // Selling price of the item
                qty: Number, // Quantity of the item
                unit: String, // Unit of measurement for the item (e.g., 'units', 'kg', 'g', etc.)
                totalPriceOfItem: Number, // Total price for the quantity of this item
            },
        ],
        totalTransactionAmount: {
            type: number,
            require: true,
        }
    })
const transaction = mongoose.model('transaction', trasactionScehma);
module.exports = transaction