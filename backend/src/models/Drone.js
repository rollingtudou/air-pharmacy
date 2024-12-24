const droneSchema = {
  id: String,
  status: String,  // IDLE, FLYING, CHARGING, MAINTENANCE
  batteryLevel: Number,
  currentLocation: {
    latitude: Number,
    longitude: Number
  },
  payload: {
    maxWeight: Number,
    currentWeight: Number
  },
  maintenanceRecord: [{
    date: Date,
    description: String
  }]
}; 