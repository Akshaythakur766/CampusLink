import studentClasses from "../model/studentVew.model";
import ClassModel from "../model/Class";
import UserModel from "../model/auth";



async function handleTeacherViewAttendence(req:any, res:any) {
    const userID = req.user.id;
    const { studentid, classid } = req.body;
    try {
        const response:any = await ClassModel.find({ student: studentid, 'classes.class': classid })

        if (!response) {
            res.json({ error: "There is no Attendence record related to thia student" })
        }

        const record = response?.classes?.find((cls:any) => cls.class.toString() === classid)

        if (!record) {
            res.json({ error: "There is no Attendence record related to thia student" })
        }

        res.json({ message: record.Attendance })

    }
    catch (error:any) {
        res.json({  error })
    }
}


async function handleGetTeacherAttendenceRecord(req:any, res:any) {
    const { classid } = req.body;

    try {
        // Find class details by ID
        const classDetail = await ClassModel.findOne({ _id: classid });

        if (!classDetail) {
            return res.json({ error: "There is no record found related to the class" });
        }

        const studentIds = classDetail.student;

        if (studentIds.length === 0) {
            return res.json({ error: "There are no students in this class" });
        }

        // Array to store attendance records for each student
        const attendanceRecords = [];
        let firstStudentAttendanceDates:any = [];
        let firstStudentTopicNames:any = [];

        // Iterate over each student ID
        for (let i = 0; i < studentIds.length; i++) {
            const studentId = studentIds[i];

            // Find the document in StudentClasses model for the current student
            const studentClass = await studentClasses.findOne({ student: studentId });

            if (studentClass) {
                // Extract attendance information from the found document
                const attendanceDetails = studentClass.classes
                    .filter((cls:any) => cls.class.toString() === classid)
                    .map(cls => cls.Attendance)
                    .flat();

                if (i === 0) {
                    // Capture attendance dates and topic names for the first student
                    firstStudentAttendanceDates = attendanceDetails.map(att => att.Date);
                    firstStudentTopicNames = attendanceDetails.map(att => att.topicname);
                }

                // Find the user details for the current student
                const user = await UserModel.findById(studentId);

                // Push attendance records with user details for the current student to the array
                attendanceRecords.push({
                    studentId,
                    name: `${user?.firstName} ${user?.lastName}`,
                    rollno: user?.rollNo,
                    attendance: attendanceDetails.map(att => att.present)
                });
            } else {
                attendanceRecords.push({ studentId, name: "", rollno: "", attendance: [] }); // No attendance record found for the student
            }
        }
        console.log(attendanceRecords,
            firstStudentAttendanceDates,
            firstStudentTopicNames)
        return res.json({
            attendanceRecords,
            firstStudentAttendanceDates,
            firstStudentTopicNames
        });
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        return res.json({ error: "Internal server error" });
    }
}

const handleTeacherOverview = async (req:any, res:any) => {
    const userID = req.user.id;

    try {
        // Fetch classes taught by the teacher
        const classes = await ClassModel.find({ teacher_id: userID }).populate('student');

        // Initialize the response array
        const classDetails = [];

        // Iterate over each class
        for (const cls of classes) {
            // Check if the class has students
            if (cls.student.length === 0) {
                classDetails.push({
                    name: cls.subj,
                    semester: cls.semester,
                    course: cls.course,
                    otp: cls.otp,
                    numberOfStudents: 0,
                    dates: [],
                    studentsPresent: []
                });
                continue; // Skip to the next class
            }

            const firstStudentId = cls.student[0]._id;

            // Fetch attendance records for the first student in the class
            const firstStudentRecords = await studentClasses.findOne({ student: firstStudentId, 'classes.class': cls._id });

            let attendanceDates:any = [];
            if (firstStudentRecords) {
                const classAttendance = firstStudentRecords.classes.find((c:any) => c.class.toString() === cls._id.toString());
                if (classAttendance) {
                    attendanceDates = classAttendance.Attendance.map(att => att.Date);
                }
            }

            // Initialize attendance summary
            const attendanceSummary = attendanceDates.map((date:any) => ({
                date,
                presentCount: 0
            }));

            // Fetch attendance records for all students in the class
            const attendanceRecords = await studentClasses.find({ 'classes.class': cls._id });

            // Update attendance summary with presence counts for each date
            attendanceRecords.forEach(record => {
                const classRecord = record.classes.find((c:any) => c.class.toString() === cls._id.toString());
                if (classRecord) {
                    classRecord.Attendance.forEach(att => {
                        const summaryEntry = attendanceSummary.find((entry:any) => entry.date.getTime() === att?.Date?.getTime());
                        if (summaryEntry && att.present) {
                            summaryEntry.presentCount += 1;
                        }
                    });
                }
            });

            // Convert attendance summary to arrays
            const dates = attendanceSummary.map((entry:any) => entry.date);
            const studentsPresent = attendanceSummary.map((entry:any) => entry.presentCount);

            // Push class details into the response array
            classDetails.push({
                name: cls.subj,
                semester: cls.semester,
                course: cls.course,
                otp: cls.otp,
                numberOfStudents: cls.student.length,
                dates,
                studentsPresent
            });
        }

        // Send the response
        res.json({ list: classDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { handleTeacherViewAttendence,handleGetTeacherAttendenceRecord,handleTeacherOverview }