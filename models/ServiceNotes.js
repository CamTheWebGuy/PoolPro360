const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceNotesSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer'
  },
  content: {
    type: String,
    required: true
  },
  showDuringVisit: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  lastUpdated: {
    type: Date
  }
});

module.exports = ServiceNotes = mongoose.model(
  'serviceNotes',
  ServiceNotesSchema
);
