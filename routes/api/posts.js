const express = require("express");

const router = express.Router();

// @route   GET api/posts
// @desc    test route
// @access  Public

router.get("/", (req, res) => res.send("Posts Route"));

module.exports = router;
