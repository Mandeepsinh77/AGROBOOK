const mongoose = require('mongoose');

const chequeDetailsSchema = new mongoose.Schema({
  chequeNo: {
    type: String,
    required: true,
  },
  chequeAmount: {
    type: Number,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  bankName: {
    type: String, 
    required: true,
  },
});

const ChequeDetails = mongoose.model('ChequeDetails', chequeDetailsSchema);

module.exports = ChequeDetails;