
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const Chatkit = require('@pusher/chatkit-server');
const config = require('config')
// const Coinpayments = require("coinpayments");
// const client = new Coinpayments(options);
// const _ = require("lodash");
const request = require("request");


// const mailer = require('./misc/mailer')
// var passport = require("passport");
// require("./config/passport");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5200');
  next();
});

// var cookieParser = require('cookie-parser')

// const chatkit = new Chatkit.default({
//   instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
//   key: process.env.CHATKIT_SECRET_KEY,
// });

app.use(
  cors({
    // origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);

app.use(express.json());


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
    limit : "50mb"
  }));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}







app.set("port", process.env.PORT || 5200);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

