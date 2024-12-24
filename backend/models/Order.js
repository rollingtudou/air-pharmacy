const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  orderType: {
    type: String,
    enum: ['emergency', 'normal'],
    default: 'normal'
  },
  priority: {
    type: Number,
    enum: [1, 2, 3], // 1: 最高优先级, 2: 中等优先级, 3: 普通优先级
    default: 3
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: Number,
    isEmergencyMed: Boolean
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },
  prescriptionImage: String,  // 处方图片URL
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// 添加紧急订单索引
orderSchema.index({ orderType: 1, priority: 1, status: 1 });
orderSchema.index({ deliveryAddress: '2dsphere' });

module.exports = mongoose.model('Order', orderSchema); 