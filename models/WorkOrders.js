const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkOrderSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true
    // Manual, Automatic
  },
  orderType: {
    type: String,
    required: true
  },
  status: {
    type: String
    // Unassigned, Assigned, Completed, Closed
  },
  notifyCustomer: {
    type: String
  },
  description: {
    type: String
  },
  officeNote: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  technicianName: {
    type: String
  },
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = WorkOrder = mongoose.model('workOrder', WorkOrderSchema);
