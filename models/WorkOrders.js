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
    // Unassigned, Approval Needed, Assigned, Completed, Closed
  },
  notifyCustomer: {
    type: Boolean
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
  estimatedMinutes: {
    type: String
  },
  laborCost: {
    type: String
  },
  price: {
    type: String
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'customer'
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  scheduledDate: {
    type: Date
  }
});

module.exports = WorkOrder = mongoose.model('workOrder', WorkOrderSchema);
