const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const BusPass = require('../models/BusPass');

router.post('/apply', authMiddleware, async (req, res) => {
  try {
    const { fullName, dob, address, passType, validity } = req.body;

    const newPass = new BusPass({
      user: req.user.id,
      fullName,
      dob,
      address,
      passType,
      validity,
    });

    await newPass.save();
    res.status(201).json({ msg: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
