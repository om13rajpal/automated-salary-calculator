const { attendanceModel } = require("../models/attendance");
const { teacherModel } = require("../models/teacher");
const { sendMail } = require("../utils/mail");

const router = require("express").Router();

router.post("/entry/:id", async (req, res) => {
  const id = req.params.id;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  try {
    const user = await teacherModel.findById(id);

    if (!user) {
      return res.status(400).send("User not found");
    }

    let attendanceId;
    let targetAttendance;

    for (let i = 0; i < user.attendance.length; i++) {
      const attendance = await attendanceModel.findById(user.attendance[i]);
      if (attendance && attendance.year === year) {
        attendanceId = attendance._id;
        targetAttendance = attendance;
        break;
      }
    }

    if (!attendanceId) {
      const newAttendance = await attendanceModel.create({
        year: year,
        month: [
          {
            month: month,
            totalEntry: 1,
            finalSalary: user.salary,
          },
        ],
      });

      const savedAttendance = await newAttendance.save();

      if (!savedAttendance) {
        return res.status(400).send("Failed to create attendance");
      }

      const updatedTeacher = await teacherModel.findByIdAndUpdate(
        id,
        { $push: { attendance: savedAttendance._id } },
        { new: true }
      );

      if (!updatedTeacher) {
        return res.status(400).send("Failed to update teacher");
      }

      return res.status(200).send(savedAttendance);
    }
    const targetMonth = targetAttendance.month.find((m) => m.month === month);

    if (!targetMonth) {
      const updatedAttendance = await attendanceModel.findByIdAndUpdate(
        attendanceId,
        {
          $push: {
            month: {
              month: month,
              totalEntry: 1,
              finalSalary: user.salary,
            },
          },
        },
        { new: true }
      );

      return res.status(200).send(updatedAttendance);
    } else {
      const updatedAttendance = await attendanceModel.findOneAndUpdate(
        {
          _id: attendanceId,
          "month.month": month,
        },
        {
          $inc: {
            "month.$.totalEntry": 1,
          },
        },
        { new: true }
      );

      return res.status(200).send(updatedAttendance);
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred");
  }
});

router.post("/late", async (req, res) => {
  const { id, cut } = req.query;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const teacher = await teacherModel.findById(id);

  if (!teacher) {
    return res.status(400).send("Teacher not found");
  }

  let attendanceId;
  let targetAttendance;

  for (let i = 0; i < teacher.attendance.length; i++) {
    const attendance = await attendanceModel.findById(teacher.attendance[i]);

    if (attendance && attendance.year === year) {
      attendanceId = attendance._id;
      targetAttendance = attendance;
      break;
    }
  }

  if (!attendanceId) {
    const newAttendance = await attendanceModel.create({
      year: year,
      month: [
        {
          month: month,
          totalEntry: 1,
          finalSalary: teacher.salary,
          lateEntry: 1,
        },
      ],
    });

    const savedAttendance = await newAttendance.save();

    if (!savedAttendance) {
      return res.status(400).send("Failed to create attendance");
    }

    const updatedTeacher = await teacherModel.findByIdAndUpdate(
      id,
      {
        $push: {
          attendance: savedAttendance._id,
        },
      },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(400).send("Failed to update teacher");
    }

    return res.status(200).send(savedAttendance);
  } else {
    const targetMonth = targetAttendance.month.find((m) => m.month === month);

    if (!targetMonth) {
      const updatedAttendance = await attendanceModel.findByIdAndUpdate(
        attendanceId,

        {
          $push: {
            month: {
              month: month,
              totalEntry: 1,
              finalSalary: teacher.salary,
              lateEntry: 1,
            },
          },
        },
        { new: true }
      );

      if (!updatedAttendance) {
        return res.status(400).send("Failed to update attendance");
      }

      return res.status(200).send(updatedAttendance);
    } else {
      const lateEntry = targetMonth.lateEntry;

      if (lateEntry > 4) {
        const updatedAttendance = await attendanceModel.findOneAndUpdate(
          {
            _id: attendanceId,
            "month.month": month,
          },
          {
            $inc: {
              "month.$.totalEntry": 1,
              "month.$.lateEntry": 1,
              "month.$.finalSalary": -cut,
              "month.$.deduction": cut,
            },
          },
          { new: true }
        );

        if (!updatedAttendance) {
          return res.status(400).send("Failed to update attendance");
        }

        sendMail(
          teacher.email,
          "Deduction for late entry",
          `You have been deducted ${cut} for late entry`
        );

        return res.status(200).send(updatedAttendance);
      } else {
        const updatedAttendance = await attendanceModel.findOneAndUpdate(
          {
            _id: attendanceId,
            "month.month": month,
          },
          {
            $inc: {
              "month.$.totalEntry": 1,
              "month.$.lateEntry": 1,
            },
          },
          { new: true }
        );

        if (!updatedAttendance) {
          return res.status(400).send("Failed to update attendance");
        }

        return res.status(200).send(updatedAttendance);
      }
    }
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const teacher = await teacherModel.findById(id);

  if (!teacher) {
    return res.status(400).send("Teacher not found");
  }

  const attendance = [];
  for (let i = 0; i < teacher.attendance.length; i++) {
    const att = await attendanceModel.findById(teacher.attendance[i]);
    attendance.push(att);
  }

  return res.status(200).send(attendance);
});

module.exports = {
  attendanceRoute: router,
};
