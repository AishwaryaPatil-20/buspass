const express = require("express");
const router = express.Router();
const Bus = require("../models/BusLocation");

// Nearby buses get करायचा API
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude required" });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // MongoDB geoNear aggregation for nearby points
    const nearbyBuses = await Bus.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 5000, // max 5km radius (in meters)
        },
      },
      { $match: { isActive: true } }, // active buses filter
      { $limit: 10 }, // max 10 results
    ]);

    res.json(nearbyBuses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
