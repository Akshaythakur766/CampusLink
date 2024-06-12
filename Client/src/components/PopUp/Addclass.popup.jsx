import { useState,useContext } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/Refresh';

const AddClass = ({ closeModal }) => {
    const {refresh,setrefresh}=useContext(UserContext)
    const [data, setData] = useState({
        subj: '',
        course: '',
        semester: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const CreateClass = async () => {
        try {
            const response = await axios.post('/class', data);
            if (response.data.error) {
                toast.error(response.data.error)
            } else if (response.data.message) {
                toast.success("Class Added")
                setData({
                    subj: '',
                    course: '',
                    semester: '',
                });
                setrefresh(!refresh)
                closeModal(); // Closing the modal after successful creation
            }
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    return (
        <>
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
            <CloseIcon className='close-icon' onClick={closeModal} />
                <p>Add class</p>
                <h4>Enter the Subject name and select the Semester and Course name</h4>
                <input className='input'  type="text" name="subj" value={data.subj} onChange={handleChange} placeholder='Subject Name' /><br /><br />

                <label className='fw-bold'>Select the Class</label><br />
                <select
                name="course"
                onChange={handleChange}>
                <option>Class</option>
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
                </select><br /><br />

                <label className='fw-bold'>Select the Semester</label><br />
                <select
                name="semester"
                onChange={handleChange}>
                <option>Semester</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                </select><br/><br/>
                <button className='btn bg-dark text-white  ' onClick={CreateClass}>Confirm</button>
            </div>
        </>
    );
};

export default AddClass;
