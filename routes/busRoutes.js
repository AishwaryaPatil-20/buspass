const express = require("express");
const router = express.Router();
const {
  updateBusLocation,
  getNearbyBuses,
} = require("../controllers/busController");

router.post("/location", updateBusLocation);
router.get("/nearby", getNearbyBuses);

module.exports = router;
