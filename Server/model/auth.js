const mongoose =require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    rollNo:{
        type:String,
        required:true
    },
    semester:{
        type:String,
    },
    course:{
        type:String
    },
    phone:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    birthDate:{
        type:Date
    },
    password:{
        type:String,
    },
})

const UserModel=mongoose.model("User",userSchema)

module.exports=UserModel;