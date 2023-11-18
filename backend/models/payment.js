const mongoose = require("mongoose")
const { Schema } = mongoose;
const PaymentSchema = new Schema({
    shopkeeperid: {
        type: String,
        require: true
    },
    totalCost: {
        type: String,
        require: true
    },
    customername: {
        type: String,
        require: true
    },
    customerphoneno: {
        type: String,
        require: true
    },
    amountpaid: {
        type: String,
        require: true
    },
    remaining_amount: {
        type: String,
        require: true
    },
    payment_method: {
        type: String,
        require: true
    },
    cashDetails:{
      type: Schema.Types.ObjectId,
      ref:'cashdetails',  
    },
    chequeDetails: {
        type: Schema.Types.ObjectId,
        ref: 'ChequeDetails',
    },
    cardDetails: {
        type: Schema.Types.ObjectId,
        ref: 'CardDetails',
    },
    upiDetails: {
        type: Schema.Types.ObjectId,
        ref: 'UpiDetails',
    },
})

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment