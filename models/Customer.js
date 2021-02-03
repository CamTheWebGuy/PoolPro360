const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobilePhone: {
    type: String
  },
  altPhone: {
    type: String
  },
  serviceLng: {
    type: String
  },
  serviceLat: {
    type: String
  },
  serviceAddress: {
    type: String,
    required: true
  },
  serviceCity: {
    type: String
  },
  serviceState: {
    type: String,
    required: true
  },
  serviceZip: {
    type: String,
    required: true
  },
  gateCode: {
    type: String
  },
  canText: {
    type: String
  },
  poolType: {
    type: String,
    default: 'NA'
  },
  technician: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  technicianName: {
    type: String
  },
  servicePackage: {
    type: String
  },
  serviceRate: {
    type: String
  },
  servicePackageAndRate: {
    type: String
  },
  billingSame: {
    type: Boolean,
    default: false
  },
  billingAddress: {
    type: String
  },
  billingCity: {
    type: String
  },
  billingState: {
    type: String
  },
  billingZip: {
    type: String
  },
  billingType: {
    type: String
  },
  paymentMethod: {
    type: String
  },
  poolEquipment: {
    poolType: {
      type: String
    },
    poolGallons: {
      type: String
    },
    bodiesOfWater: {
      type: String
    },
    pumpMake: {
      type: String
    },
    pumpModel: {
      type: String
    },
    filterMake: {
      type: String
    },
    filterModel: {
      type: String
    },
    heaterMake: {
      type: String
    },
    heaterModel: {
      type: String
    },
    cleanerMake: {
      type: String
    },
    cleanerModel: {
      type: String
    },
    other: [
      {
        category: { type: String },
        make: { type: String },
        model: { type: String }
      }
    ]
  },
  images: [
    {
      url: { type: String }
    }
  ],
  serviceChecklist: [
    {
      item: { type: String, required: true }
    }
  ],
  dateAdded: {
    type: Date,
    default: Date.now()
  },
  isScheduled: {
    type: Boolean,
    default: false
  },
  scheduledDay: {
    type: String
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
