const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Backend for IPS is up and working</h1>");
});

app.listen(3000);