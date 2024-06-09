import { useState } from 'react';
import axios from 'axios';
import './Popup.css';
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
const GeneratePopUp = ({ id, closeModal }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        number: '',
        checked: false,
        time: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    function generateOTP() {
        // Generate a random 4-digit number
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp.toString(); // Convert number to string
    }

    const GenerateAttendence = () => {
        const { name, number, checked, time } = data;
        const itime = parseInt(time)
        if (checked) {
            const otp = generateOTP();
            axios.post('/generateAttendence', { classid: id, number, otp, time: itime, topicname: name }).then(({ data }) => {
                if (data.message) {
                    closeModal();
                    navigate('/dashboard/otpAttendance', { state: { classid: id, otp:otp } })
                    toast.success(data.message);
                } else if (data.error) {
                    toast.error('Server error!');
                    closeModal();
                }
            });
        } else {
            toast.error("Please check the box");
        }
    };

    return (
        <>
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
            <CloseIcon className='close-icon' onClick={closeModal} />
                <p>Generating Attendance</p>
                <h4>Enter the Topic name and Time Limit</h4>
                <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Topic Name" required /><br />

                <input type="Number" name="time" value={data.time} onChange={handleChange} placeholder="Time(minutes)" required /><br /><br />
                <input
                    type="checkbox" className="form-check-input checkbox" checked={data.checked}
                    placeholder='Check me '
                    onChange={(e) => { setData({ ...data, checked: e.target.checked }) }}
                />
                <label className="form-check-label " htmlFor="exampleCheck1">Check me out</label><br />

                <button className="btn bg-success text-white fw-bold m-2" onClick={GenerateAttendence}>Generate Attendance</button>
                {/* <button className='btn btn-outline-dark fw-bold  mx-2' onClick={closeModal}>Close</button> */}
            </div>
        </>
    );
};

export default GeneratePopUp;
