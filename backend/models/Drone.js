const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  droneId: {
    type: String,
    required: true,
    unique: true
  },
  droneType: {
    type: String,
    enum: ['emergency', 'standard'],
    default: 'standard'
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'maintenance', 'charging', 'offline'],
    default: 'available'
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100
  },
  payload: {
    currentWeight: Number,
    maxWeight: Number,
    temperature: Number,  // 载物仓温度
    hasRefrigeration: Boolean  // 是否具备制冷功能
  },
  speed: {
    current: Number,
    max: Number
  },
  lastMaintenance: Date,
  maintenanceStatus: {
    lastCheck: Date,
    nextCheck: Date,
    issues: [{
      type: String,
      severity: String,
      reportDate: Date
    }]
  },
  flightHistory: [{
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    startTime: Date,
    endTime: Date,
    distance: Number,
    status: String
  }]
});

droneSchema.index({ currentLocation: '2dsphere' });
droneSchema.index({ droneType: 1, status: 1 });

module.exports = mongoose.model('Drone', droneSchema); 