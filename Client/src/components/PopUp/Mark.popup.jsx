import {  useState } from 'react'
import './Popup.css'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast'
const MarkPopup = ({id,closeModal}) => {

  const [data,setData]=useState({
    otp:'',
  })

  
    const handleSubmit=async()=>{
      const {otp}=data
      const otp1=parseInt(otp)
      const response =await axios.post('/markAttendence',{classid:id,present:true,otp:otp1})
      console.log('otp',otp1,'classid',id)
      if(response.data.error){
        toast.error(response.data.error)
      }
      if(response.data.message){
        toast.success("Attendence marked successfully")
      }
    }
   


  const handleChange=(e)=>{
      setData({
        ...data,
        [e.target.name]:e.target.value
      })
  }
  return (
    <>
    <div className="modal-wrapper" onClick={closeModal}></div>
    <div className="modal-container">
    <CloseIcon className='close-icon' onClick={closeModal} />
      <p>Mark Attendence</p>
      <h5>Enter the OTP here!</h5>
    <input type="text" name="otp" value={data.otp} onChange={handleChange} placeholder="Enter the OTP here" /><br /><br />
    
    <button className='btn btn-outline-dark ' onClick={handleSubmit}>Mark Attendence</button>
    <button className='btn btn-outline-dark  mx-2' onClick={closeModal}>Close</button>
    </div>
    </>
  )
}
export default MarkPopup