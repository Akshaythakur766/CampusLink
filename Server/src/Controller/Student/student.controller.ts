import {UserModel , ClassModel , StudentClasses} from "@CampusLink/Server/Model"
 
async function handleaddStudent(req:any, res:any) {
    const { course, semester } = req.body;
    
    try {
        const data = await UserModel.find({ course: course, semester: semester });
        if (!data || data.length === 0) {
            return res.json({ error: "Students not found for the given course and semester" });
        }
    else if(data){
        return res.json({ data });}
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}





async function handleaddStudentToList(req:any, res:any) {
    const UserId = req.user.id;
    const { st_id, id } = req.body;

    try {
        // Find the class document
        const classDocument = await ClassModel.findOne({ teacher_id: UserId, _id: id });

        // Check if the student with st_id already exists in the class
        const studentExists = classDocument?.student.includes(st_id);
        if (studentExists) {
            return res.json({
                error: "Student already added in the class"
            });
        }

        // Update the class document to push the new student
        const response = await ClassModel.findOneAndUpdate(
            { teacher_id: UserId, _id: id },
            { $push: { student: st_id } },
            { new: true } // To return the updated document
        );

        // Handle studentClasses collection updates
        if (response) {
            let studentClassesDocument = await StudentClasses.findOne({ student: st_id });
            if (!studentClassesDocument) {
                // If studentClasses document not found, create a new one
                studentClassesDocument = await StudentClasses.create({ student: st_id, classes: [{ class: id }] });
            } else {
                // If studentClasses document found, update it
                const classExists = studentClassesDocument.classes.some((c:any) => c.class.equals(id));
                if (!classExists) {
                    studentClassesDocument.classes.push({ class: id });
                    await studentClassesDocument.save();
                }
            }
    
        }

        if (response) {
            return res.json({
                data: "Added successfully"
            });
        } else {
            return res.status(404).json({
                error1: "Document not found or not updated"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}



async function handleStudentList(req:any, res:any) {
    try {
      const userId = req.user.id;
      const { id } = req.body;
  
      const response = await ClassModel.findOne({ teacher_id: userId, _id: id }).populate('student');
      
      res.json(response); 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  


  async function handleRemoveStudent(req:any, res:any) {
    const userID = req.user.id;
    const { classid, studentid } = req.body;

    try {
        // Check if the class exists and the user is authorized
        const classObj = await ClassModel.findOne({ _id: classid, teacher_id: userID });

        if (!classObj) {
            return res.json({ error: "Class not found or user is not authorized." });
        }

        // Check if the student exists in the class
        const studentIndex = classObj.student.indexOf(studentid);
        if (studentIndex === -1) {
            return res.json({ error: "Student not found in the class." });
        }

        // Remove the student from the class
        const updatedClassObj = await ClassModel.findOneAndUpdate(
            { _id: classid },
            { $pull: { student: studentid } },
            { new: true }
        );

        // Remove the class from the student's list of classes
        const updatedStudentClasses = await StudentClasses.findOneAndUpdate(
            { student: studentid },
            { $pull: { classes: { class: classid } } },
            { new: true }
        );

        return res.status(200).json({ message: "Student removed successfully." });
    } catch (error) {
        console.error("Error removing student:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}




export {handleaddStudent,handleStudentList,handleaddStudentToList,handleRemoveStudent}