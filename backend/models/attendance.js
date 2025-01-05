const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    trim: true,
  },
  month: [
    {
      type: salarySchema,
      required: true,
      trim: true,
    },
  ],
});

const salarySchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    trim: true,
  },
  finalSalary: {
    type: Number,
    required: true,
    trim: true,
  },
  deduction: {
    type: Number,
    required: true,
    trim: true,
  },
  lateEntry: {
    type: Number,
    required: true,
    trim: true,
  },
  totalEntry: {
    type: Number,
    required: true,
    trim: true,
  },
});

const attendanceModel = mongoose.model("attendance", attendanceSchema);

module.exports = {
  attendanceModel,
};
