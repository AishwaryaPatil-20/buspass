const mongoose = require("mongoose");

const BusLocationSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point", required: true },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  isActive: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now },
});

BusLocationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Bus", BusLocationSchema);
