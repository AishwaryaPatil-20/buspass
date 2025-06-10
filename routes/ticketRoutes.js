const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Helper: Calculate fare (you can adjust this logic or make it dynamic)
const calculateFare = (fullTickets, halfTickets) => {
  const fullFare = 20;  // Example fare
  const halfFare = 10;  // Example fare
  return (fullTickets * fullFare) + (halfTickets * halfFare);
};

// ✅ POST /api/tickets - Book a new ticket
router.post('/', async (req, res) => {
  try {
    const { route, startStop, endStop, fullTickets, halfTickets, paymentMethod } = req.body;

    if (!route || !startStop || !endStop || fullTickets === undefined || halfTickets === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const totalFare = calculateFare(fullTickets, halfTickets);

    const ticket = new Ticket({
      route,
      startStop,
      endStop,
      fullTickets,
      halfTickets,
      paymentMethod: paymentMethod || 'Cash',
      totalFare,
    });

    await ticket.save();

    res.status(201).json({ message: 'Ticket booked successfully', ticket });
  } catch (error) {
    console.error('Ticket Booking Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/tickets - Get all tickets (admin/debug)
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Fetch Tickets Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
