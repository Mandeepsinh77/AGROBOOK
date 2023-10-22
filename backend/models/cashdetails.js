const mongoose = require('mongoose');

const cashDeatilsSchema = new mongoose.Schema({
  cash_amount: {
    type: String,
    required: true,
  },
});

const cashDetails = mongoose.model('cashDetails', cashDeatilsSchema);

module.exports = cashDetails;