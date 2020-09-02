const express = require("express");

const router = express.Router();

// Get request api/users/test
// test the route
//access public
router.get("/test", (req, res) => res.json({message: "user Works"}));

module.exports = router