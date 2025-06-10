require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
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
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/buslocation', require('./routes/busLocationRoutes'));

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Smart Bus Pass Backend is Live!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
