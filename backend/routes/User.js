const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const fetchuser = require("../middleware/fetchuser");
const secret = "todo";

// signup route
router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const existuser = await User.findOne({ email });
      if (existuser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const salt = await bcrypt.genSalt(10);
      const finalpassword = await bcrypt.hash(password, salt);
      const user = new User({
        email,
        password: finalpassword,
      });
      await user.save();
      const token = jwt.sign({ id: user._id }, secret);
      res.status(201).json({ user, token });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

// login route
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 3 })],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const emailexist = await User.findOne({ email });
      if (!emailexist) {
        return res
          .status(400)
          .json({ success, msg: "enter valid credentials" });
      }
      const existpassword = await bcrypt.compare(password, emailexist.password);
      if (!existpassword) {
        return res
          .status(400)
          .json({ success, msg: "enter valid credentials" });
      }
      const token = jwt.sign({ id: emailexist._id }, secret);
      success = true;
      res.status(200).json({ success, emailexist, token });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  }
);

// login user details
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const id = req.user;
    const details = await User.findById(id).select("-password");
    if (!details) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json({ details });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

// logout user
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
