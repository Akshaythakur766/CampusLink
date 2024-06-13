const mongoose =require('mongoose')

const Schema= new mongoose.Schema({
    name:{
        type:String
    },
    quantity:{
        type:String
    },
    course:{
        type:String
    },
    author:{
        type:String
    },
    edition:{
        type:String
    },
  

})

const LibModel= new mongoose.model('Library',Schema)

module.exports= LibModel