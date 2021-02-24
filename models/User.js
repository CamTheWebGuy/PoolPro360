const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true
  },
  businessName: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  role: {
    type: String,
    default: 'Logistics'
  },
  isOwner: {
    type: Boolean,
    default: false
  },
  isSubUser: {
    type: Boolean,
    default: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  passwordUpdated: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  businessInfo: {
    businessLogo: { type: String },
    businessName: { type: String },
    businessPhone: { type: String },
    businessEmail: { type: String },
    businessAddress: { type: String }
  },
  emailSettings: {
    emailSendSummary: { type: Boolean, default: true },
    emailSendChecklist: { type: Boolean, default: true },
    emailSendReadings: { type: Boolean, default: true },
    emailShowReadingNumbers: { type: Boolean, default: false },
    emailShowChemicalsUsed: { type: Boolean, default: true }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
