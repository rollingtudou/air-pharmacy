const orderSchema = {
  id: String,
  userId: String,
  medicines: [{
    medicineId: String,
    quantity: Number
  }],
  status: String,  // PENDING, PROCESSING, IN_DELIVERY, DELIVERED
  deliveryLocation: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  droneId: String,
  createdAt: Date,
  estimatedDeliveryTime: Date
}; 