import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment-timezone';
import './viewatt.css';

interface AttendanceDataType {
  Date:string
  generate:boolean
  present:boolean
  topicname:string
}
const ViewAttendance = () => {
  const [data, setData] = useState<AttendanceDataType[]>([]);
  const location = useLocation();
  const { state } = location;
  const classid = state?.classid; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/viewAttendence', { classid });
        setData(response.data.attendance);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchData();
  }, [classid]);

  const getStatusColor = (present:boolean) => {
    return present ? "green" : "red";
  };

  console.log("data" , data)
  // Organize data by month
  const organizedData = data.reduce((acc:any, record) => {
    const monthYear = moment.tz(record?.Date, 'UTC').format('MMMM YYYY');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(record);
    return acc;
  }, []);

  return (
    <div className="divClassName">
      <div className="paragraph bg-white">
        <h2>Attendance</h2>
      </div>
      {Object.entries(organizedData).map(([monthYear, records]:any) => (
        <div className="view-table" key={monthYear}>
          <p>{monthYear}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Topic Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {records?.map((record:AttendanceDataType, index:number) => (
                <tr key={index}>
                  <td>{moment.tz(record.Date, 'UTC').format('MMMM D')}</td>
                  <td>{moment.tz(record.Date, 'UTC').format('h:mm:ss a')}</td>
                  <td>{record.topicname || 'N/A'}</td>
                  <td>
                    <span style={{ color: getStatusColor(record.present), display: 'flex', alignItems: 'center' }}>
                      <CircleIcon style={{ marginRight: '5px' }} /> 
                      {record.present ? "Present" : "Absent"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ViewAttendance;
