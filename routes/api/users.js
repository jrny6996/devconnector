const express = require("express");

const router = express.Router();

// @route   POST api/users
// @desc    register user
// @access  Public

router.post("/", (req, res) => {
  console.log(JSON.stringify(req.body));
  res.send("User Route");
});

module.exports = router;
