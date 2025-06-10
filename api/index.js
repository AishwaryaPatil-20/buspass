const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://aishwarya:Z7bbY0cQavBzU1u9@test.eegj4km.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/buspass', require('../routes/busPassRoutes'));
app.use('/api/tickets', require('../routes/ticketRoutes'));
app.use('/api/pass', require('../routes/dailyPassRoutes'));
app.use('/api/timetable', require('../routes/timetableRoutes'));
app.use('/api/buses', require('../routes/busRoutes'));
app.use('/api/buslocation', require('../routes/busLocationRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send("🚀 Smart Bus Pass Backend is Live!");
});

// 🚫 REMOVE this line!
// app.listen(8055, () => console.log("Server running on port 8055"));

module.exports = app; // ✅ Export for Vercel
