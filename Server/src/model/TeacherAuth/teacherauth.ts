import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
});

const TeacherAuth = mongoose.model("TeacherAuth", teacherSchema);

export  {TeacherAuth};
