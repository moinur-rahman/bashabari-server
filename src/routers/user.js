const express = require("express");
const UserOwner = require("../models/userOwner");
const UserWorker = require("../models/userWorker");

const router = new express.Router();

router.post("/userOwner", async (req, res) => {
  const user = new UserOwner(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/userWorker", async (req, res) => {
  const user = new UserWorker(req.body);
  console.log(user);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
