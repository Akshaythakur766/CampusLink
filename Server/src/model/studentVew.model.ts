import Class from "./Class";
import User from "./auth";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  classes: [
    {
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
      otp: {
        type: Number,
      },
      show: {
        type: Boolean,
      },
      Attendance: [
        {
          Date: {
            type: Date,
          },
          generate: {
            type: Boolean,
            default: false,
          },
          present: {
            type: Boolean,
            default: false,
          },
          topicname: {
            type: String,
          },
        },
      ],
    },
  ],
});
const StudentClasses = mongoose.model("StudentClasses", schema);

export default StudentClasses;
