import mongoose from "mongoose";
import Teacher from "./teacherauth"
import User from "./auth"

const classSchema =new mongoose.Schema({
    subj:{
        type:String,
    },
    semester:{
        type:String,
    },
    course:{
        type:String,
    },
    
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Teacher
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    otp:{
        type:Number
    }
})

const ClassModel=mongoose.model("Class",classSchema)

export default ClassModel