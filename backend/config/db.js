const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

function connectMongo() {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
}

module.exports = {
  connectMongo,
};