const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
    trim: true,
  },
  startStop: {
    type: String,
    required: true,
    trim: true,
  },
  endStop: {
    type: String,
    required: true,
    trim: true,
  },
  fullTickets: {
    type: Number,
    required: true,
    min: 0,
  },
  halfTickets: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Online', 'Card'],
    default: 'Cash',
  },
  totalFare: {
    type: Number,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Optional, if you use authentication
  },
  status: {
    type: String,
    enum: ['Booked', 'Cancelled'],
    default: 'Booked',
  },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
