
import mongoose from "mongoose"

const Schema=new mongoose.Schema({
    name:{
        type:String,
    },
    author:{
        type:String
    },
    email:{
        type:String
    },
    bookName:{
        type:String,
    },
    course:{
        type:String,
    },
    semester:{
        type:String,
    },
    rollno:{
        type:String,
    },
    role:{
        type:String,
    },   
    available:{
        type:Boolean,
    },note:{
        type:String
    }
})

const Available=  mongoose.model("Request",Schema)

export  {Available}