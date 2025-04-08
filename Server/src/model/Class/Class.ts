import mongoose from "mongoose";
import {  UserModel,TeacherAuth} from "@CampusLink/Server/Model"
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
        ref:"TeacherAuth"
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:UserModel.modelName
    }],
    otp:{
        type:Number
    }
})

const ClassModel=mongoose.model("Class",classSchema)

export  {ClassModel}