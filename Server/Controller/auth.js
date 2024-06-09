const userModel=require("../model/auth")
const jwt =require('jsonwebtoken')
const Teacher=require('../model/teacherauth')


async function handleStudentRegister(req,res){
    const {course,email,firstName,lastName,password,rollNo,semester,phone}=req.body;
try{`11`
    if(!firstName){
       return res.json({
            error:"Enter the name"
        })
    }

    if(!semester||!course){
       return res.json({
            error:"Enter the semester and course correctly"
        })
    }

    const existrollno=await userModel.findOne({rollNo})
    const existemail=await userModel.findOne({email})

    if(existemail){
       return res.json({
            error:"Email is already exist"
        })
    }

    if(existrollno){
         return res.json({
            error:"This rollno is already registered"
        })
    }


    const user=await userModel.create({
        course,email,firstName,lastName,password,rollNo,semester,phone
    })
    return res.status(200).json({message:'success',user})}
    catch(err){
        console.log(err)
        return res.status(400).json("error")
    }
}


// Student Login Setup

async function handleLogin(req,res){
    const {email,password}=req.body;
try{
    const user=await userModel.findOne({email})
    const teacher=await Teacher.findOne({email})
    if(!user&&!teacher){
        return res.json({
            error:"Email does not exist"
        })
    }
    
    //for student
    if(user&&!teacher){
        const confirmpassword=password===user.password
        if(confirmpassword){
        
            jwt.sign({email:user.email,id:user._id,name:user.name,role:"student"},process.env.JWT_SECRET_KEY,{ expiresIn:30*24*3600},(err,token)=>{
                if(err) throw err;
                res.cookie("token",token).json({user,role:'student'})
            })
        }
        else{
            return res.json({
                error:"password is incorrect"
            })
        }
    }
    //for teacher
    if(teacher&&!user){       
        const confirmpassword=password===teacher.password;
        if(confirmpassword){
        
            jwt.sign({email:teacher.email,id:teacher._id,role:"teacher"},process.env.JWT_SECRET_KEY,{},(err,token)=>{
                if(err) throw err;
                res.cookie("token",token).json({user,role:'teacher'})
            })
        }
        else{
            return res.json({
                error:"password is incorrect"
            })
        }
    }

}
catch(err){
    console.log(err)
    return res.status(500).json({
        error:"Internal Server error"
    })
}
}
//Teacher Register setup

async function handleTeacherRegister(req,res){
    const {firstName,lastName,email,password,code,birthDate}=req.body;
try{
    if(!firstName){
       return res.json({
            error:"Enter the name"
        })
    }
    if(!code){
       return res.json({
            error:"Enter the code"
        })
    }

    const existcode=await Teacher.findOne({code})
    const existemail=await Teacher.findOne({email})

    if(existemail){
       return res.json({
            error:"Email is already exist"
        })
    }

    if(existcode){
         return res.json({
            error:"This code is already exist"
        })
    }


    const user=await Teacher.create({
        firstName,lastName,email,password,code,birthDate    
        
    })
    return res.status(200).json({message:"success",user})}
    catch(err){
        console.log(err)
        return res.status(400).json("error")
    }
}

async function handleLogout(req,res){
    res.clearCookie('token');
    res.sendStatus(200);
}

module.exports={handleStudentRegister,handleLogin,handleTeacherRegister,handleLogout}