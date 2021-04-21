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
  newEmail: {
    type: String,
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
    default: 'Technician'
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
  dateCreated: {
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
  stripe_account_id: {
    type: String
  },
  stripe_seller: {
    type: Object
  },
  stripesession: {
    type: Object
  },
  stripeProduct: {
    type: String
  },
  stripePriceWeekly: {
    type: String
  },
  stripePriceMonthly: {
    type: String
  },
  businessInfo: {
    businessLogo: { type: String },
    businessName: { type: String },
    businessPhone: { type: String },
    businessEmail: { type: String },
    businessAddress: { type: String }
  },
  emailSettings: {
    emailSendWorkOrder: { type: Boolean, default: true },
    emailSendUnable: { type: Boolean, default: true },
    emailSendSummary: { type: Boolean, default: true },
    emailSendChecklist: { type: Boolean, default: true },
    emailSendReadings: { type: Boolean, default: true },
    emailShowReadingNumbers: { type: Boolean, default: false },
    emailShowChemicalsUsed: { type: Boolean, default: true },
    emailShowTechnician: { type: Boolean, default: true },
    emailSendFreeChlorine: { type: Boolean, default: true },
    emailSendpHlevel: { type: Boolean, default: true },
    emailSendAlkalinity: { type: Boolean, default: true },
    emailSendConditioner: { type: Boolean, default: false },
    emailSendHardness: { type: Boolean, default: false },
    emailSendPhosphateLevel: { type: Boolean, default: false },
    emailSendSaltLevel: { type: Boolean, default: false }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
