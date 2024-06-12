const mongoose=require('mongoose')

const Schema= new mongoose.Schema({
    name:{
        type:String,
    },
    code:{
        type:String,
    },
    Used:{
        type:Boolean,
        default:false
    }
})

const CodeModel=new Mongoose.model("Staff",Schema)

module.exports =CodeModel