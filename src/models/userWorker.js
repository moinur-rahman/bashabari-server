const mongoose = require("mongoose");
const validator = require("validator");

const userWorkerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password can not contain "password"');
        }
      },
    },
    phoneNo: {
      type: String,
    },
    age: {
      type: String,
    },
    education: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    salaryRange: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userWorkerSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

const User = mongoose.model("UserWorker", userWorkerSchema);

module.exports = User;
