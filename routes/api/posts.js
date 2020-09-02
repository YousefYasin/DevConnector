const express = require("express");
const router = express.Router();

// Get request api/posts/test
// test the route
//access public

router.get("/test", (req, res) => res.json({message: "Post Works"}));

module.exports = router