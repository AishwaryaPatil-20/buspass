const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server= express();
server.use(cors());
server.use(express.json());


mongoose.connect('mongodb+srv://aishwarya:Z7bbY0cQavBzU1u9@test.eegj4km.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


server.use('/api/auth', require('./routes/authRoutes'));
server.use('/api/buspass', require('./routes/busPassRoutes'));
server.use('/api/tickets', require('./routes/ticketRoutes'));
server.use('/api/pass', require('./routes/dailyPassRoutes'));
server.use('/api/timetable', require('./routes/timetableRoutes'));

server.use('/api/buses', require('./routes/busRoutes'));


server.use('/api/buslocation', require('./routes/busLocationRoutes'));

 server.listen(8055,()=>{
    console.log("Sever is starting on port 8055")
 })