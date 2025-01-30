import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from "../../context/Refresh";
import GeneratePopUp from '../PopUp/Genatten.popup';
import AddStudent from '../PopUp/AddStudent.popup';
import RemoveSt from '../PopUp/RemoveSt.popup';
import HEader from '../HEader';
 interface studentInterface {
    _id:number
    firstName:string,
    LastName:string,
    rollNo:number,
    semester:string,
    course:string
 }
const StudentList = () => {
    const location = useLocation();
    const { state } = location;
    const provider = useContext(UserContext);
    const { refresh1, refresh2 } = provider;
    //this id of class id ,name
    const { id, name, course, semester } = state;

    const [students, setStudents] = useState<studentInterface[]>([]);
    const [studentToRemove, setStudentToRemove] = useState<{id1:number , subname:string, classid:number}|null>(null); // Track which student to remove
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showGenerateAttendanceModal, setShowGenerateAttendanceModal] = useState(false);

    const closeAddStudentModal = () => {
        setShowAddStudentModal(false);
    };

    const closeGenerateAttendanceModal = () => {
        setShowGenerateAttendanceModal(false);
    };
    const openRemoveStudentModal = (id1:number, subname:string) => {
        setStudentToRemove({ id1, subname, classid: id });
    };

    const closeRemoveStudentModal = () => {
        setStudentToRemove(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/studentList', { id, name, course, semester });
                setStudents(response.data.student);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id, name, course, semester, refresh1, refresh2]);
    // console.log({studentToRemove ,student: students[0]?._id} , "Comparison" , studentToRemove === students[0]?._id)
    const displaydata = students.map((student, index:number) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{student?.firstName} {student?.LastName}</td>
            <td>{student?.rollNo}</td>
            <td>{student?.course}</td>
            <td>{student?.semester}</td>
            <td>
                <button className='btn btn-outline-danger fw-bold' onClick={() => openRemoveStudentModal(student?._id, student.firstName)}>Remove</button>
                {/* {studentToRemove === student?._id && <RemoveSt closeModal={closeRemoveStudentModal} />} */}
            </td>
        </tr>
    ));

    return (
        <div>
            <HEader name={'Take Attendance'} />
            <div className='percent'>
                <div className='percent-p '>Generate Attendance<br /><br />
                    <button className="btn btn-outline-success   fw-bold w- 40 ms-0 me-2 " onClick={() => setShowAddStudentModal(true)}>Add Student</button>
                    {showAddStudentModal && <AddStudent closeModal={closeAddStudentModal} id={id} course={course} semester={semester} />}
                    <button className='btn btn-outline-primary fw-bold w-30' onClick={() => setShowGenerateAttendanceModal(true)}>Generate Attendance</button>
                    {showGenerateAttendanceModal && <GeneratePopUp closeModal={closeGenerateAttendanceModal} id={id} />}
                    <br /><br />
                </div>
                <div className="table-container">
                    <table className=' table-custom'>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Name</th>
                                <th>Roll no</th>
                                <th>Course</th>
                                <th>Semester</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaydata}
                        </tbody>
                    </table><br /><br />
                </div>

                {studentToRemove && <RemoveSt closeModal={closeRemoveStudentModal} id={studentToRemove} />}
            </div>
        </div>
    );
};

export default StudentList;





// {showAddStudentModal && <AddStudent closeModal={closeAddStudentModal} id={id} course={course} semester={semester} />}
