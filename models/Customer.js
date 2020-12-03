const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  gateCode: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
