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
  const rating = Math.floor(Math.random() * 5 + 1);

  const user = new UserWorker({ ...req.body, rating });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userOwner = await UserOwner.findOne(req.body);
    const userWorker = await UserWorker.findOne(req.body);
    if (userOwner) {
      res.status(201).send(userOwner);
    }
    if (userWorker) {
      res.status(201).send(userWorker);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/userWorker/search", async (req, res) => {
  const {
    age,
    education,
    jobDescription,
    gender,
    address,
    salaryRange,
    rating,
  } = req.body;

  var filter = {};

  if (age == "10-20") {
    filter = {
      ...filter,
      age: {
        $gte: 10,
        $lte: 20,
      },
    };
  } else if (age == "21-30") {
    filter = {
      ...filter,
      age: {
        $gte: 21,
        $lte: 30,
      },
    };
  }
  if (age == "31-40") {
    filter = {
      ...filter,
      age: {
        $gte: 31,
        $lte: 40,
      },
    };
  }

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

  if (rating) {
    filter = {
      ...filter,
      rating,
    };
  }

  try {
    const user = await UserWorker.find(filter);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports = router;
