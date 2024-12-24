const mongoose = require('mongoose');

const emergencyOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: Number,
    enum: [1, 2, 3],
    default: 1
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  medicalCondition: {
    description: String,
    severity: {
      type: String,
      enum: ['critical', 'severe', 'moderate', 'mild']
    }
  },
  prescriptionImage: String,
  deliveryAddress: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number],
    address: String,
    building: String,
    floor: String,
    room: String
  },
  droneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone'
  },
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  notes: String
}, {
  timestamps: true
});

// 添加地理位置索引
emergencyOrderSchema.index({ deliveryAddress: '2dsphere' });
emergencyOrderSchema.index({ status: 1, priority: 1 });

module.exports = mongoose.model('EmergencyOrder', emergencyOrderSchema); 