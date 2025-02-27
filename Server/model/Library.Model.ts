import mongoose from "mongoose"
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

const LibModel=  mongoose.model('Library',Schema)

export default LibModel