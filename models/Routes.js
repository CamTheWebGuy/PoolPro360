const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new mongoose.Schema({
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  day: {
    type: String
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
