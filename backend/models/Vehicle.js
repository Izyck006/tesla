const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  deposit: { type: String, required: true },
  monthly: { type: String, required: true },
  year: { type: String, required: true },
  status: { type: String, required: true },
  stat1Label: { type: String },
  stat1Value: { type: String },
  stat2Label: { type: String },
  stat2Value: { type: String },
  stat3Label: { type: String },
  stat3Value: { type: String },
  subtitle: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
