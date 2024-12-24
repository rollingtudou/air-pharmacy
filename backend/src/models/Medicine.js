const medicineSchema = {
  id: String,
  name: String,
  description: String,
  category: String,
  requiresPrescription: Boolean,
  stock: Number,
  price: Number,
  storageConditions: {
    temperature: {
      min: Number,
      max: Number
    },
    humidity: {
      min: Number,
      max: Number
    }
  },
  expirationDate: Date
}; 