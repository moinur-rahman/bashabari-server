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

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/userWorker/search", async (req, res) => {
  const { age, education, jobDescription, gender, address, salaryRange } =
    req.body;

  var filter = {};

  if (education) {
    filter = {
      ...filter,
      education,
    };
  }
  if (jobDescription) {
    filter = {
      ...filter,
      jobDescription,
    };
  }
  if (gender) {
    filter = {
      ...filter,
      gender,
    };
  }
  if (address) {
    filter = {
      ...filter,
      address,
    };
  }
  if (salaryRange) {
    filter = {
      ...filter,
      salaryRange,
    };
  }

  console.log(filter);

  try {
    const user = await UserWorker.find(filter);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports = router;
