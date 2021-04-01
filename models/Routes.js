const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new mongoose.Schema({
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  day: {
    type: String
  },
  isOptimized: {
    type: Boolean,
    default: false
  },
  customers: [
    {
      customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
      }
    }
  ]
});

module.exports = Route = mongoose.model('route', RouteSchema);
