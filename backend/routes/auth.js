const router = require("express").Router();
const bcrypt = require("bcrypt");

const { SECRET_KEY } = require("../config/config");
const { userModel } = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const { validateUser } = require("../utils/zod");

router.post("/login", async (req, res) => {
  const payload = req.body;

  const isValidPayload = validateUser(payload);

  if (!isValidPayload) {
    return res.status(400).json({
      success: false,
      error: "Invalid payload",
    });
  }

  const user = await userModel.findOne({
    username: payload.username,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  const comparePassword = await bcrypt.compare(payload.password, user.password);

  if (!comparePassword) {
    return res.status(401).json({
      success: false,
      error: "Invalid password",
    });
  }

  const tokenData = {
    username: user.username,
    id: user._id,
  };

  const token = generateToken(tokenData, SECRET_KEY, "1h");

  res.json({
    success: true,
    token: token,
    message: "user logged in successfully",
  });
});

router.post("/register", async (req, res) => {
  const payload = req.body;
  const isValidPayload = validateUser(payload);

  if (!isValidPayload) {
    return res.status(400).json({
      success: false,
      error: "Invalid payload",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(payload.password, salt);

  const createUser = await userModel.create({ username: payload.username, password: newPassword });
  const savedUser = await createUser.save();

  if (!savedUser) {
    return res.status(500).json({
      success: false,
      error: "User not created",
    });
  }

  const tokenData = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = generateToken(tokenData, SECRET_KEY, "1h");

  res.json({
    success: true,
    token: token,
    message: "user registered successfully",
  });
});

module.exports = {
    authRoute: router
}