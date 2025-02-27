import StudentClasses from "../model/studentVew.model";
async function handleclassListToStudent(req:any, res:any) {
    const userID = req.user.id;
    try {
        const populatedStudentClasses = await StudentClasses.find({ student: userID }).populate({
            path: 'classes.class',
            model: 'Class'
        }).exec();

        // Extract populated classes and remove any null values
        const populatedClasses = populatedStudentClasses.map(studentClass => {
            return studentClass.classes
                .filter(entry => entry.class !== null) // Remove entries with null class
                .map(entry => ({
                    class: entry.class,
                    show: entry.show // Include the 'show' boolean value
                }));
        }).flat(); // Flatten the array of arrays into a single array
       
        return res.json({ List: populatedClasses });
    } catch (error) {
        console.error('Error populating classes:', error);
        throw error;
    }
}


async function handleViewAttendance(req:any, res:any) {
    const userID = req.user.id;
    const { classid } = req.body;

    try {
        // Find the document in StudentClasses collection matching the user and class
        const attendanceRecord = await StudentClasses.findOne(
            { student: userID, 'classes.class': classid }
        );

        if (!attendanceRecord) {
            return res.status(404).json({ error: "Attendance record not found for the user and class." });
        }

        // Extract and return the attendance information for the specified class
        const classAttendance = attendanceRecord.classes.find((cls:any) => cls.class.toString() === classid);

        return res.status(200).json({ attendance: classAttendance?.Attendance });
    } catch (error) {
        console.error("Error viewing attendance:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}
async function handleClasslistOfStudent(req:any, res:any) {
    const userID = req.user.id;

    try {
        const studentRecord = await StudentClasses.findOne({ student: userID }).populate({
            path: 'classes.class',
            populate: {
                path: 'teacher_id',
                model: 'TeacherAuth'
            }
        });

        if (!studentRecord) {
            return res.json({ error: "No record found" });
        }

        const classList = studentRecord.classes.map((classRecord:any) => {
            const className = classRecord?.class?.subj;
            const teacherName = `${classRecord?.class?.teacher_id?.firstName} ${classRecord?.class?.teacher_id?.lastName}`;
            let presentCount = 0;
            classRecord.Attendance.forEach((attendance:any) => {
                if (attendance.present) {
                    presentCount++;
                }
            });
            const totalAttendance = classRecord.Attendance.length;
            return { className, teacherName, present: presentCount, Total: totalAttendance.toString() };
        });
        return res.json(classList);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}




export { handleclassListToStudent,handleViewAttendance,handleClasslistOfStudent };
    