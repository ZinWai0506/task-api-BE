const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  const { email } = req.query;

  if (email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Couldn't find any user with this email" });
    }
    return res.json(user);
  }

  const users = await User.findAll();
  res.json(users);
});

module.exports = router;