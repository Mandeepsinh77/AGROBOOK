const mongoose = require('mongoose');

const cardDetailsSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cardBankName: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
});

const CardDetails = mongoose.model('CardDetails', cardDetailsSchema);

module.exports = CardDetails;