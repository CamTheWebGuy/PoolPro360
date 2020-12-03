const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: 'technician',
    required: true
  },
  customers: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);
