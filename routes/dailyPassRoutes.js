const express = require('express');
const router = express.Router();
const DailyPass = require('../models/BusPass');
const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aishwaryap049@gmail.com',
    pass: 'ieco wctu goeb aaoj' 
  }
});

// POST /api/pass
router.post('/', async (req, res) => {
  try {
    const { passType, zoneType, idDigits, email, fare, city } = req.body;

    if (!passType || !zoneType || !idDigits || !email || !fare || !city) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPass = new DailyPass({
      passType,
      zoneType,
      idDigits,
      email,
      fare,
      city
    });

    await newPass.save();

    const mailOptions = {
      from: 'aishwaryap049@gmail.com',
      to: email,
      subject: `Your ${passType} Bus Pass - ${city}`,
      html: `
        <h3>Smart Bus Pass Details</h3>
        <p>Thank you for purchasing a <strong>${passType}</strong> bus pass for the zone <strong>${zoneType}</strong>.</p>
        <p><b>Pass ID (Last digits):</b> ${idDigits}</p>
        <p><b>Fare:</b> ₹${fare.toFixed(2)}</p>
        <p><b>City:</b> ${city}</p>
        <p>Please carry your valid ID matching the pass details while traveling.</p>
        <p>Safe travels! 🚌</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Bus pass created and email sent successfully' });

  } catch (error) {
    console.error('Error in POST /api/pass:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/pass/:email — fetch passes by email
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }

    const passes = await DailyPass.find({ email: { $regex: new RegExp(`^${email}$`, 'i') } }).sort({ createdAt: -1 });

    if (!passes.length) {
      return res.status(404).json([]);
    }

    res.status(200).json(passes);
  } catch (error) {
    console.error('Error in GET /api/pass/:email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
