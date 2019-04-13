const express = require("express");
const authCheck = require("../middleware/auth-check");
const Genre = require("../models/Genre");

const router = new express.Router();

router.post("/create", authCheck, (req, res) => {
  const { genre } = req.body;
  const user = req.user;
  if (!user.roles.includes("Admin")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!"
    });
  }

  Genre.create({ genre }).then((genre) => {
    res.status(200).json({
      success: true,
      message: "Genre added successfully.",
      genre
    });
  });
});

router.get('/all', (req, res) => {
  Genre.find().then((genres) => {
    res.status(200).json(genres);
  });
})

module.exports = router;
