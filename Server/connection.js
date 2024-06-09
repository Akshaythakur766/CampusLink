const mongoose=require("mongoose")

async function MongoConnect(URI){
    await mongoose.connect(URI)
    .then(()=>{
        console.log('Database Connected')
    })
    .catch((err)=>{
        console.log(`error occurred ${err}`)
    })
}

module.exports={MongoConnect}