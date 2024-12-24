const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['emergency', 'prescription', 'otc'],
    required: true
  },
  isEmergencyMed: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true,
    min: 0
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
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  storageTemp: {
    type: String,
    enum: ['room', 'refrigerated', 'frozen'],
    default: 'room'
  },
  manufacturer: String,
  expiryDate: Date,
  image: String,
  deliveryMethod: {
    type: String,
    enum: ['drone', 'standard'],
    default: 'standard'
  },
  priority: {
    type: Number,
    enum: [1, 2, 3], // 1: 最高优先级, 2: 中等优先级, 3: 普通优先级
    default: 3
  },
  storageLocation: {
    warehouse: String,
    shelf: String,
    position: String
  },
  lastRestockDate: Date,
  nextRestockDate: Date
}, {
  timestamps: true
});

// 添加库存预警索引
medicineSchema.index({ stock: 1, criticalStock: 1 });
medicineSchema.index({ expiryDate: 1 });
medicineSchema.index({ isEmergencyMed: 1, stock: 1 });

module.exports = mongoose.model('Medicine', medicineSchema); 