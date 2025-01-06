const { addIssueToContext } = require("zod");
const { teacherModel } = require("../models/teacher");
const { validateTeacher } = require("../utils/zod");

const router = require("express").Router();

router.post("/add", async (req, res) => {
  const payload = req.body;
  const isValidData = validateTeacher(payload);

  if (!isValidData) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  const createTeacher = await teacherModel.create({
    fullName: payload.fullName,
    phoneNumber: payload.phoneNumber,
    email: payload.email,
    department: payload.department,
    lateEntry: payload.lateEntry,
    totalEntry: payload.totalEntry,
    salary: payload.salary,
  });

  const savedTeacher = await createTeacher.save();

  if (!savedTeacher) {
    return res.status(400).json({
      success: false,
      message: "Failed to create teacher",
    });
  }

  return res.json({
    success: true,
    message: "Teacher created successfully",
    data: savedTeacher,
  });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const deletedTeacher = await teacherModel.findByIdAndDelete(id);

  if (!deletedTeacher) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete teacher",
    });
  }

  return res.json({
    success: true,
    message: "Teacher deleted successfully",
    data: deletedTeacher,
  });
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const payload = req.body;
  const isValidData = validateTeacher(payload);

  if (!isValidData) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
    });
  }

  const updatedTeacher = await teacherModel.findByIdAndUpdate(
    id,
    {
      fullName: payload.fullName,
      phoneNumber: payload.phoneNumber,
      email: payload.email,
      department: payload.department,
      lateEntry: payload.lateEntry,
      totalEntry: payload.totalEntry,
      salary: payload.salary,
    },
    { new: true }
  );

  if (!updatedTeacher) {
    return res.status(400).json({
      success: false,
      message: "Failed to update teacher",
    });
  }

  return res.json({
    success: true,
    message: "Teacher updated successfully",
    data: updatedTeacher,
  });
});

router.get("/all", async (req, res) => {
  const teachers = await teacherModel.find();

  if (!teachers) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch teachers",
    });
  }

  return res.json({
    success: true,
    data: teachers,
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const teacher = await teacherModel.findById(id);

  if (!teacher) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch teacher",
    });
  }

  return res.json({
    success: true,
    data: teacher,
  });
});

module.exports = {
  teacherRoute: router,
};
