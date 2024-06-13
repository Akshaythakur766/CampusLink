const mongoose= require('mongoose')

const Schema=new mongoose.Schema({
    name:{
        type:String,
    },
    author:{
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
})