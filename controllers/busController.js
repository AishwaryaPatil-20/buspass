const Bus = require("../models/BusLocation");

// Update or Create Location
exports.updateBusLocation = async (req, res) => {
  try {
    const { busId, route, latitude, longitude } = req.body;

    const locationData = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const bus = await Bus.findOneAndUpdate(
      { busId },
      {
        route,
        location: locationData,
        lastUpdated: Date.now(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: "Error updating bus location" });
  }
};

// Get nearby buses
exports.getNearbyBuses = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const buses = await Bus.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 3000, // 3km
        },
      },
    });

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching nearby buses" });
  }
};
