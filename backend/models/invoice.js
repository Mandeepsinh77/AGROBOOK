const mongoose = require('mongoose');

// Define the invoice schema
const invoiceSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  items: [
    {
      itemNo: {
        type: Number,
        required: true,
      },
      itemname: {
        type: String,
        required: true,
      },
      costPrice: {
        type: Number,
        required: true,
      },
      sellingPrice: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPriceOfItem: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPayment: {
    type: Number,
    required: true,
  },
});

// Create the Invoice model
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;