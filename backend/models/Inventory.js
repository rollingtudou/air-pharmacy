const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['emergency', 'prescription', 'otc'],
    required: true
  },
  isEmergencyMed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    default: 3
  },
  requiresPrescription: {
    type: Boolean,
    default: true
  },
  storageTemp: {
    type: String,
    enum: ['room', 'refrigerated', 'frozen'],
    default: 'room'
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  criticalStock: {
    type: Number,
    required: true,
    min: 1
  },
  unit: String,
  manufacturer: String,
  expiryDate: Date,
  storageConditions: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

inventorySchema.index({ stock: 1, criticalStock: 1 });

module.exports = mongoose.model('Inventory', inventorySchema); 