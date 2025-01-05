const express = require("express");
const { connectMongo } = require("./config/db");
const { rateLimiter } = require("./middlewares/limiter");
const { printRequest } = require("./utils/printRequest");
const { PORT } = require("./config/config");
const { handleError } = require("./utils/errorHandler");
const { pageNotFound } = require("./utils/notfound");
const { authRoute } = require("./routes/auth");

const app = express();

app.use(rateLimiter);
app.use(printRequest);
app.use(express.json());
app.use(authRoute);

connectMongo();

app.get("/", (req, res)=>{
  res.send("<h1>Backend for IPS' Radaur is up and working </h1>")
})

app.use(pageNotFound)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});