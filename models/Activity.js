const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer'
  },
  log: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  icon: {
    type: String
  },
  comments: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  lastUpdated: {
    type: Date
  }
});

module.exports = Activity = mongoose.model('activity', ActivitySchema);
