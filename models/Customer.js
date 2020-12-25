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
    required: true
  },
  mobilePhone: {
    type: String
  },
  serviceAddress: {
    type: String,
    required: true
  },
  serviceCity: {
    type: String
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
    type: String,
    default: 'NA'
  },
  technician: {
    type: String
  },
  servicePackage: {
    type: String
  },
  billingSame: {
    type: Boolean,
    default: false
  },
  billingAddress: {
    type: String
  },
  billingCity: {
    type: String
  },
  billingState: {
    type: String
  },
  billingZip: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
