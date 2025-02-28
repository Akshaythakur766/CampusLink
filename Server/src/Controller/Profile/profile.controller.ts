import {UserModel , TeacherAuth} from "@CampusLink/Server/Model"

async function handleProfile(req:any,res:any){
    const userID=req.user.id;
    const role=req.user.role;
    const response1=await UserModel.findOne({_id:userID})
    const response2=await TeacherAuth.findOne({_id:userID})
    const name='';
    if(response1){
        const firstname=response1.firstName ?? ""
        const lastname=response1.lastName ?? ""
        const name=firstname+lastname
        res.json({role,name});
    }
    if(response2){
        const firstname=response2.firstName ?? ""
        const lastname=response2.lastName ?? ""
        const name=firstname+lastname
        res.json({role,name});
    }  
    if(role=='staff'){
        res.json({role,name:"Staff"})
    }  
}
export {handleProfile};