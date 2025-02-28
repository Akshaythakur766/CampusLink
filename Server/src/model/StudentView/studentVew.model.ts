import {ClassModel, UserModel} from "@CampusLink/Server/Model"
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
  },
  classes: [
    {
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ClassModel,
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

export  {StudentClasses};
