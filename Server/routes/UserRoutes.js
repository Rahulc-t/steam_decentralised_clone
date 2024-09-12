const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels.js');
// const Appointment = require('../models/appointmentModel.js');
// const Limit = require('../models/appointmentlimit.js');
// const Review = require('../models/review.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('../middleware/authMiddle.js');
const path = require('path');
// const multer=require("multer")
const fs=require("fs")
// const multer=require("multer")
// const fs=require("fs")
// const sharp=require("sharp")
// const path=require("path")

const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;