import { useState, useEffect } from 'react';
import axios from 'axios';
import './stCLass.css';
import MarkPopup from '../../PopUp/Mark.popup';
import { useNavigate } from 'react-router-dom';
import HEader from '../../HEader';

interface classListType{
    show:boolean
    class:{
        _id:number
        semester:string
        subj:string
        course:string
    }
}

export const StCLassList = () => {
    const [classList, setClassList] = useState<classListType[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState<number|null>(null); // State to store the ID of the selected class
    const navigate = useNavigate();

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/studentClassList');
                setClassList(response.data.List);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []); // empty dependency array to run effect only once

    const handleViewAttendance = (classid:number) => {
        navigate('/dashboard/viewAttendence', { state: { classid } });
    }

    const handleMarkAttendance = (classid:number) => {
        setSelectedClassId(classid); // Set the ID of the selected class
        setShowModal(true);
    }
    console.log("classList " ,classList )
    return (
        <div className="divClassName">
         <HEader name={"Attendance"}/>
        <div className='class-list-container'>
            <p>Class List</p>
            <div className="class-list">
                {classList.map((classItem, index) => (
                    <div key={index} className="class-item">
                        {classItem && ( // Check if classItem is not null
                            <>
                                <p className='item-h'>{classItem.class.subj}</p>
                                <p className='item-p'>Course: {classItem.class.course}</p>
                                <p className='item-p'>Semester: {classItem.class.semester}</p>

                                {classItem.show && ( // Conditionally render the button only if show is true
                                    <button className='btn btn-outline-primary m-2' onClick={() => handleMarkAttendance(classItem.class._id)}>Mark Attendance</button>
                                )}
                                {showModal && <MarkPopup closeModal={closeModal} id={selectedClassId} />}

                                <button className='btn btn-outline-success' onClick={() => handleViewAttendance(classItem.class._id)}>View Attendance</button>
                            </>
                        )}
                    </div> 
                ))}
                </div>
            </div>
        </div>
    );
};

export default StCLassList;
