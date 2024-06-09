const ClassModel = require('../model/Class');
const studentClass = require('../model/studentVew.model');

async function handleGenerateAttendance(req, res) {
    try {
        const userID = req.user.id;
        const { classid, otp, time, topicname } = req.body;

        // Set the desired date and time for attendance
        const attendanceDate = new Date(); // Current date and time
        // attendanceDate.setMinutes(attendanceDate.getMinutes() + time); // Add specified minutes
        
        // Adjust the time to IST (UTC+5:30)
        attendanceDate.setHours(attendanceDate.getHours() + 5); // Add 5 hours for UTC+5
        attendanceDate.setMinutes(attendanceDate.getMinutes() + 30); // Add 30 minutes for the extra 30 minutes of IST

        await ClassModel.findOneAndUpdate(
            { teacher_id: userID, _id: classid },
            { $set: { otp: otp } }
        );

        const response = await ClassModel.find({ teacher_id: userID, _id: classid }).populate('student', '_id');

        // Ensure that the class is found
        if (!response || response.length === 0) {
            return res.status(404).json({ error: 'Class not found or you are not authorized to access it. or otp is not added' });
        }

        // Extract student IDs from the response
        const studentIds = response.flatMap(cls => cls.student.map(student => student._id));

        // Update attendance for each student
        await Promise.all(studentIds.map(async id => {
            // Update logic for each student in studentClass collection
            await studentClass.findOneAndUpdate(
                { student: id, 'classes.class': classid },
                {
                    $set: {
                        'classes.$.show': true,
                    },
                    $push: {
                        'classes.$.Attendance': {
                            Date: attendanceDate,
                            generate: true,
                            topicname: topicname
                        }
                    }
                }
            );

            // Schedule timeout to automatically set 'generate' to false and 'show' to false after 'time' minutes
            setTimeout(async () => {
                await studentClass.findOneAndUpdate(
                    {
                        student: id,
                        'classes.class': classid,
                        'classes.Attendance.Date': attendanceDate // Ensure it's the same attendance record
                    },
                    {
                        $set: {
                            'classes.$.Attendance.$[elem].generate': false,
                            'classes.$.show': false
                        }
                    },
                    { arrayFilters: [{ 'elem.generate': true }] }
                );
            }, time * 60 * 1000);
        }));

        res.status(200).json({ message: 'Attendance generated successfully.' });
    } catch (error) {
        console.error('Error generating attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function handleMarkAttendence(req, res) {
    const userID = req.user.id;
    const { present, classid, otp } = req.body;

    try {
       
        const otp1=await ClassModel.findOne(
            { _id: classid  });
            
        // Retrieve the OTP from the classItem
        const savedotp = otp1.otp;


        // Check if the provided OTP matches the saved OTP
        if (savedotp !== otp) {
            return res.json({ error: "OTP does not match." });
        }

        // Update attendance for the student in the class
        const response = await studentClass.findOneAndUpdate(
            { student: userID, 'classes.class': classid, 'classes.Attendance.generate': true },
            { $set: { 'classes.$.Attendance.$[elem].present': present } },
            { arrayFilters: [{ 'elem.generate': true }] } // Filter to update only where generate is true
        );

        // Check if response is null
        if (!response) {
            return res.json({ error: 'Time limit ended' });
        }

        // Send success response
        res.json({ message: "Attendance marked successfully." });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { handleGenerateAttendance, handleMarkAttendence };