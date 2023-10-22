// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    customerId: {
        type: String,
        require: true,
    },
    customerName: {
        type: String,
        require: true,
    },
    customerPhone: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    items: [
        {
            itemNo: String,
            itemname: String,
            costPrice: String,
            sellingPrice: String,
            unit: String,
            quantity: Number,
            totalPriceOfItem: String
        },
    ],
    totalPayment: {
        type: Number,
        require: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;