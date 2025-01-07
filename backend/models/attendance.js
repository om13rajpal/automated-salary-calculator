const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
    trim: true,
  },
  finalSalary: {
    type: Number,
    trim: true,
  },
  deduction: {
    type: Number,
    trim: true,
    default: 0
  },
  lateEntry: {
    type: Number,
    trim: true,
    default: 0
  },
  totalEntry: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
});

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


const attendanceModel = mongoose.model("attendance", attendanceSchema);

module.exports = {
  attendanceModel,
};
