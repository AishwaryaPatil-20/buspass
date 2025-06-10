// models/BusPass.js

const mongoose = require('mongoose');

const busPassSchema = new mongoose.Schema({
  passType: { type: String, required: true },
  zoneType: { type: String, required: true },
  idDigits: { type: String, required: true },
  email: { type: String, required: true },
  fare: { type: Number, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BusPass', busPassSchema);
