import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '@CampusLink/core';
import './Student.css';

const AddStudent = (props) => {
  const { closeModal, id, course, semester } = props;
  const { setrefresh1, refresh1 } = useContext(UserContext);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/addStudent', { course, semester });
        setStudents(response.data.data || []);
        if (!response.data.data || response.data.data.length === 0) {
          // toast.error('No student found in this course till now');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [course, semester]);

  const handleUpdate = async (st_id) => {
    try {
      const response = await axios.post('/addStudentToList', { st_id, id });
      if (response.data.data) {
        toast.success("Added Successfully");
        setrefresh1(!refresh1);
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='modal-wrapper' onClick={closeModal}></div>
      <div className='modal-container-add'>
        <CloseIcon className='close-icon' onClick={closeModal} />
        <p>Select the students here</p>
        <h5>Students list is on the base of selected course and semester</h5>
        {students.length > 0 ? (
          <div className="table-scrollable">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Name</th>
                  <th>Roll no</th>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.rollNo}</td>
                    <td>{item.course}</td>
                    <td>{item.semester}</td>
                    <td>
                      <button className='btn btn-success my-0' onClick={() => handleUpdate(item._id)}>Add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-danger'>No student found in this course/semester till now</p>
        )}
      </div>
    </>
  );
};

export default AddStudent;
