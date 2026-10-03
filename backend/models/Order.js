const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  color: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' },
  customerDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    zipCode: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
