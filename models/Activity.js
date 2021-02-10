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
  serviceLog: {
    totalChlorine: { type: String },
    totalChlorine: { type: String },
    freeChlorine: { type: String },
    pHlevel: { type: String },
    alkalinity: { type: String },
    conditionerLevel: { type: String },
    hardness: { type: String },
    phosphateLevel: { type: String },
    saltLevel: { type: String },
    chlorineTablets: { type: String },
    liquidChlorine: { type: String },
    liquidAcid: { type: String },
    triChlor: { type: String },
    diChlor: { type: String },
    calHypo: { type: String },
    potassiumMono: { type: String },
    ammonia: { type: String },
    copperBased: { type: String },
    polyQuat: { type: String },
    copperBlend: { type: String },
    sodaAsh: { type: String },
    CalciumChloride: { type: String },
    conditioner: { type: String },
    sodiumBicar: { type: String },
    diatomaceous: { type: String },
    diatomaceousAlt: { type: String },
    sodiumBro: { type: String },
    dryAcid: { type: String },
    clarifier: { type: String },
    phosphateRemover: { type: String },
    salt: { type: String },
    enzymes: { type: String },
    metalSequester: { type: String },
    bromineGran: { type: String },
    bromineTab: { type: String },
    poolFlocc: { type: String },
    borate: { type: String },
    checkList: { type: Array }
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
