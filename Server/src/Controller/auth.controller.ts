import userModel from "../model/auth"
import jwt from "jsonwebtoken"
import Teacher from "../model/teacherauth"
import CodeModel from "../model/Code"
import  { config} from "../config/env"
async function handleStudentRegister(req:any,res:any){
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

async function handleLogin(req:any, res:any) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        const teacher = await Teacher.findOne({ email });

        if (!user && !teacher) {
            if (email === "staff@gmail.com") {
                if (password === "staff@123") {
                    jwt.sign(
                        { email: "staff@gmail.com", name: 'Staff', role: "staff" },
                        config.jwtSecret,
                        { expiresIn: 30 * 24 * 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.cookie("token", token).json({ role: 'staff' });
                        }
                    );
                } else {
                    return res.json({ error: "Password is incorrect" });
                }
            } else {
                return res.json({ error: "Email does not exist" });
            }
        } else if (user && !teacher) {
            // for student
            const confirmPassword = password === user.password;
            if (confirmPassword) {
                jwt.sign(
                    { email: user.email, id: user._id, name: user?.firstName, role: "student" },
                    config.jwtSecret,
                    { expiresIn: 30 * 24 * 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.cookie("token", token).json({ user, role: 'student' });
                    }
                );
            } else {
                return res.json({ error: "Password is incorrect" });
            }
        } else if (teacher && !user) {
            // for teacher
            const code = await CodeModel.findOne({ email });
            if (code) {
                if (code.role) {
                    const role = code.role.toLowerCase();
                    const confirmPassword = password === teacher.password;
                    if (confirmPassword) {
                        jwt.sign(
                            { email: teacher.email, id: teacher._id, role: role },
                            config.jwtSecret,
                            { expiresIn: 30 * 24 * 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.cookie("token", token).json({ user: teacher, role: role });
                            }
                        );
                    } else {
                        return res.json({ error: "Password is incorrect" });
                    }
                } else {
                    return res.json({ error: "Code does not have a role" });
                }
            } else {
                return res.json({ error: "No code found for the provided email" });
            }
        } else {
            return res.json({ error: "Invalid request" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

//Teacher Register setup

async function handleTeacherRegister(req:any,res:any){
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

    const existcode=await CodeModel.findOne({code})
    const existemail=await Teacher.findOne({email})

    if(existemail){
       return res.json({
            error:"Email is already exist"
        })
    }
    if(!existcode){
        return res.json({
            error:"Invalid Verification Code"
        })
    
    }

    if(existcode){
        if(existcode.Used==true){
            res.json({
                error:'This code is already used'
            })
        }
    }

    const user=await Teacher.create({
        firstName,lastName,email,password,code,birthDate    
    })
    if(user){
    await CodeModel.updateOne(
        { code: code },
        { $set: { Used: true } })
    }
    return res.status(200).json({message:"success",user})}
    catch(err){
        console.log(err)
        return res.status(400).json("error")
    }
}

async function handleLogout(req:any,res:any){
    res.clearCookie('token');
    res.sendStatus(200);
}

export {handleStudentRegister,handleLogin,handleTeacherRegister,handleLogout}