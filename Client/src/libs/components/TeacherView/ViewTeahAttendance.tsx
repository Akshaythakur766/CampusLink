import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "@CampusLink/core";
import { useNavigate } from "react-router-dom";
import HEader from "../HEader";

interface DataTypes {
  _id: number;
  name: string;
  course: string;
  semester: string;
  subj: string;
}

export const ViewTechAttendance = () => {
  const provider = useContext(UserContext);
  const { refresh } = provider;
  const [data, setData] = useState<DataTypes[]>([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/classList");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleViewAttendance = (
    id: number,
    name: string,
    course: string,
    semester: string
  ) => {
    Navigate("/dashboard/ViewAttendenceRecord", {
      state: { id, name, course, semester },
    });
  };
  const displaydata = data.map((info, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{info.subj}</td>
      <td>{info.semester}</td>
      <td>{info.course}</td>
      <td>
        <button
          className="btn  btn-outline-primary w-30 m-1"
          onClick={() =>
            handleViewAttendance(
              info._id,
              info.subj,
              info.course,
              info.semester
            )
          }
        >
          View Attendance
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="divClassName">
      <HEader name={"View Attendance"} />
      <div className="class-flex">
        <div className="class-left">
          <div className="in-between">List of all the classes.</div>
          <div className="table-container">
            <table className="table-custom ">
              <thead>
                <tr>
                  <th>Sr.NO</th>
                  <th>Subject Name</th>
                  <th>Semester</th>
                  <th>Course</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{displaydata}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTechAttendance;
