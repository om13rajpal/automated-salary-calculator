const limiter = require("express-rate-limit");

const rateLimiter = limiter({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

module.exports = {
    rateLimiter,
}