const path = require("path");
const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

module.exports = app;
