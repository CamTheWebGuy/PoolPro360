const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  token: {
    type: String,
    required: true
  },
  confirmKey: {
    type: String
  },
  expiresAt: {
    type: Date,
    expires: '2h',
    default: Date.now
  }
});

module.exports = User = mongoose.model('reset', ResetSchema);
