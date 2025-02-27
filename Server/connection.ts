import mongoose from "mongoose"
async function MongoConnect(URI:string ){
    await mongoose.connect(URI )
    .then(()=>{
        console.log('Database Connected')
    })
    .catch((err:any)=>{
        console.log(`error occurred ${err}`)
    })
}
export {MongoConnect}