const zod = require("zod");

const userSchema = zod.object({
  username: zod.string().min(3).max(20),
  password: zod.string().min(6).max(30),
});

const teacherSchema = zod.object({
  fullName: zod.string().min(3).max(50),
  phoneNumber: zod.string().min(10).max(10),
  email: zod.string().email(),
  department: zod.string().min(3).max(50),
  lateEntry: zod.number(),
  totalEntry: zod.number(),
});

function validateUser(payload) {
  const result = userSchema.safeParse(payload);
  return result.success;
}

function validateTeacher(payload) {
  const result = teacherSchema.safeParse(payload);  
  return result.success;
}

module.exports = {
  validateUser,
  validateTeacher,
};
