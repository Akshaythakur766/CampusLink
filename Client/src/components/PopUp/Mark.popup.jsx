import { useState, useRef } from 'react';
import './Popup.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';

const MarkPopup = ({ id, closeModal }) => {
  const [data, setData] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
  });

  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);

  const handleSubmit = async () => {
    const { otp1, otp2, otp3, otp4 } = data;
    const otp = parseInt(`${otp1}${otp2}${otp3}${otp4}`);
    const response = await axios.post('/markAttendence', { classid: id, present: true, otp });
    console.log('otp', otp, 'classid', id);
    if (response.data.error) {
      toast.error(response.data.error);
    }
    if (response.data.message) {
      toast.success('Attendance marked successfully');
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 1) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });

      // Auto shift focus to next input field
      if (e.target.value.length === 1 && e.target.name === 'otp1') {
        otp2Ref.current.focus();
      } else if (e.target.value.length === 1 && e.target.name === 'otp2') {
        otp3Ref.current.focus();
      } else if (e.target.value.length === 1 && e.target.name === 'otp3') {
        otp4Ref.current.focus();
      }
    }
  };

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        <CloseIcon className="close-icon" onClick={closeModal} />
        <p>Mark Attendance</p>
        <h5>Enter the OTP here</h5>
        <div className="otp-container">
          <input
            type="text"
            name="otp1"
            value={data.otp1}
            onChange={handleChange}
            maxLength="1"
            className="otp-input"
          />
          <input
            type="text"
            name="otp2"
            value={data.otp2}
            onChange={handleChange}
            maxLength="1"
            className="otp-input"
            ref={otp2Ref}
          />
          <input
            type="text"
            name="otp3"
            value={data.otp3}
            onChange={handleChange}
            maxLength="1"
            className="otp-input"
            ref={otp3Ref}
          />
          <input
            type="text"
            name="otp4"
            value={data.otp4}
            onChange={handleChange}
            maxLength="1"
            className="otp-input"
            ref={otp4Ref}
          />
        </div>
        <button className="btn bg-dark text-white" onClick={handleSubmit}>
          Mark Attendance
        </button>
      
      </div>
    </>
  );
};

export default MarkPopup;
