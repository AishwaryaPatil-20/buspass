const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://aishwarya:Z7bbY0cQavBzU1u9@test.eegj4km.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/buspass', require('./routes/busPassRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/pass', require('./routes/dailyPassRoutes'));
app.use('/api/timetable', require('./routes/timetableRoutes'));

// Existing bus routes
app.use('/api/buses', require('./routes/busRoutes'));

// New bus location routes (add this line here)
app.use('/api/buslocation', require('./routes/busLocationRoutes'));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
