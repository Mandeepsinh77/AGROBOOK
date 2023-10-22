const mongoose = require('mongoose');

const upiDetailsSchema = new mongoose.Schema({
  upiID: {
    type: String,
    required: true,
  },
});

const UpiDetails = mongoose.model('UpiDetails', upiDetailsSchema);

module.exports = UpiDetails;