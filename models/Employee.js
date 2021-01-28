const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Technician',
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
