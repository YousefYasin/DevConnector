const express = require("express");

const router = express.Router();

// Get request api/profile/test
// test the route

//access public
router.get("/test", (req, res) => res.json({message: "Profile Works"}));

module.exports = router