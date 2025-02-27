import ClassModel from "../model/Class";
import userModel from "../model/auth"
import studentClasses from "../model/studentVew.model";

async function handleCreateClass(req:any,res:any){
    const userId=req.user.id;
    const {subj,course,semester}=req.body;
    
    if(!subj&&!course&&!semester){
        return res.json({
            error:"Fill all the fields"
        })
    }

    if(subj&&course&&semester){
        try {
            const newclass= new ClassModel({
                subj,
                course,
                semester,
                teacher_id:userId,
            })
            newclass.save();
            res.status(200).json({
                message:"success",
            })
        } catch (error) {
            console.log(error)
        }
    }

}

async function handleclassListdata(req:any,res:any){

    const userId=req.user.id;
    const ClassListdata=await ClassModel.find({teacher_id:userId});
  
    res.json(ClassListdata);

}


async function handleDeleteClass(req:any, res:any) {
    const userID = req.user.id;
    const { id } = req.body;
    console.log("id", id, "teacher", userID);
    try {
        // Find the class to be deleted
        const deletedClass = await ClassModel.findOneAndDelete({ teacher_id: userID, _id: id });
        if (!deletedClass) {
            return res.json({
                error: "Class not found"
            });
        }

        // Delete the class entry only from StudentClasses
        await studentClasses.updateMany(
            { 'classes.class': id },
            { $pull: { classes: { class: id } } }
        );

        // Return success message
        return res.json({
            message: "Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}



async function handleEditClass(req:any, res:any) {
    const userID = req.user.id;
    const { id,name,semester,course } = req.body;
    
    try {
        const data = await ClassModel.findOneAndUpdate({ teacher_id: userID, _id: id },{subj:name});
        if (!data) {
            return res.json({
                error: "Class not found"
            });
        }
        return res.json({
            message: "Edited Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}



export {handleCreateClass,handleclassListdata,handleDeleteClass,handleEditClass}