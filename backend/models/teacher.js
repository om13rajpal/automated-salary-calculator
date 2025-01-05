const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minLength: 10,
    maxLength: 10,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  lateEntry: {
    type: Number,
    required: true,
    default: 0,
  },
  totalEntry: {
    type: Number,
    required: true,
    default: 0,
  },
  salary: {
    type: Number,
    required: true,
    default: 0,
  },
  attendance: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attendance",
      },
    ],
    default: [],
  },
});

const teacherModel = mongoose.model("teacher", teacherSchema)

module.exports = {
    teacherModel,
}
