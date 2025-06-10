const BusPass = require("../models/BusPass");

exports.applyPass = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, dob, address, passType, validity } = req.body;

    const newPass = await BusPass.create({
      userId,
      fullName,
      dob,
      address,
      passType,
      validity,
    });

    res.status(201).json({ msg: "Bus pass application submitted", busPass: newPass });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserPasses = async (req, res) => {
  try {
    const passes = await BusPass.find({ userId: req.user.id });
    res.json(passes);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
