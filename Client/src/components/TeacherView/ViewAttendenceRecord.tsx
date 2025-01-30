import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import HEader from "../HEader";

interface AttendenceRecordType{
    name:string,
    rollno:string
    studentId:string
    attendance:boolean[]
}

interface GroupMothType{
    dayMonth:string
    index:number
    day:string
}

const ViewAttdRecord = () => {
    const [attendanceRecords, setAttendanceRecords] = useState<AttendenceRecordType[]>([]);
    const [groupedByMonth, setGroupedByMonth] = useState<any>({});

    const location = useLocation();
    const { state } = location;
    const { id, name, course } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/attendenceRecord', { classid: id });
                const records = response.data.attendanceRecords;
                setAttendanceRecords(records);

                const dates = response.data.firstStudentAttendanceDates;
                const topics = response.data.firstStudentTopicNames;

                // Group dates by month and year
                const groupedData = dates.reduce((acc:any, date:string, index:number) => {
                    const dateTime = new Date(date);
                    const dayMonth = dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const monthYear = dateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

                    if (!acc[monthYear]) {
                        acc[monthYear] = [];
                    }
                    acc[monthYear].push({
                        dayMonth: dayMonth,
                        date: dateTime.toLocaleDateString(),
                        topic: topics[index],
                        index: index
                    });
                    return acc;
                }, {});

                setGroupedByMonth(groupedData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);
    console.log({attendanceRecords , groupedByMonth})
    const calculateTotal = (attendance:boolean[]) => {
        return attendance.reduce((acc, present) => acc + (present ? 1 : 0), 0);
    };

    return (
        <div className="divClassName">
            <HEader name={"Attendance Record"} />
            <div className="percent">
                <div className="percent-p">
                    <p>{name} ({course})</p>
                </div>
                {Object.keys(groupedByMonth).map((monthYear) => (
                    <div className="view-table table-container" key={monthYear}>
                        <p>{monthYear}</p>
                        <table className="table" border={1} style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    {groupedByMonth[monthYear].map(({ dayMonth }:{dayMonth:string}) => (
                                        <th key={dayMonth}>{dayMonth}</th>
                                    ))}
                                    <th>Present</th>
                                    <th>Total</th>
                                    <th>Percentage</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    {groupedByMonth[monthYear].map(({ topic }:{topic:string}) => (
                                        <th key={topic}>{topic}</th>
                                    ))}
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceRecords.map((record) => {
                                    const monthlyAttendance = groupedByMonth[monthYear].map(({ index}:{index:number}) => record.attendance[index]);
                                    const totalPresent = calculateTotal(monthlyAttendance);
                                    const totalDays = groupedByMonth[monthYear].length;
                                
                                    const percentage = ((totalPresent / totalDays) * 100).toFixed(2);

                                    return (
                                        <tr key={record.studentId}>
                                            <td>{record.name}</td>
                                            <td>{record.rollno}</td>
                                            {monthlyAttendance.map((present:boolean, index:number) => (
                                                <td key={index}>
                                                    {present ? (
                                                        <FiberManualRecordTwoToneIcon style={{ color: 'green' }} />
                                                    ) : (
                                                        <FiberManualRecordTwoToneIcon style={{ color: 'red' }} />
                                                    )}
                                                </td>
                                            ))}
                                            <td>{totalPresent}</td>
                                            <td>{totalDays}</td> {/* Total attendance for the month */}
                                            <td>{percentage}%</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAttdRecord;
