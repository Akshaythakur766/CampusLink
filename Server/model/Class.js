const mongoose =require("mongoose");
const Teacher = require("./teacherauth");
const User=require("./auth")

const classSchema = mongoose.Schema({
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

module.exports=ClassModel;