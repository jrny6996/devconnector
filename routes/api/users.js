const express = require("express");
const { check, validationResult } = require("express-validator");
const gravitar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const router = express.Router();

//@route POST api/users
//desc: Register user
//acess: Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Please set a password greater than 8 characters long"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //does user exist
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400)
        .json({ errors: [{ msg: "User already exists" }] });
      }

      //get users gravitar
      const avatar = gravitar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt p/w
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return json webtoken

      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
