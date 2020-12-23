const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobilePhone: {
    type: String
  },
  serviceAddress: {
    type: String,
    required: true
  },
  serviceState: {
    type: String,
    required: true
  },
  serviceZip: {
    type: String,
    required: true
  },
  gateCode: {
    type: String
  },
  canText: {
    type: String
  },
  poolType: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
