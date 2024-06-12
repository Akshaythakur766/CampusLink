import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";

import { UserContext } from '../../context/Refresh'

import toast from "react-hot-toast";

const RemoveSt = (props) => {
  const [name,setname]=useState('')
  const provider=useContext(UserContext)

  const {refresh2,setrefresh2}=provider
console.log(props);


async function handleRemove(e) {
  e.preventDefault();
  if(name==props.id.subname){
  try {
    const response = await axios.post('/removeStudent', {
      classid: props.id.classid,
      studentid: props.id.id1
    });

    if (response.data.message) {
      props.closeModal();
      toast.success(`${props.id.subname} removed successfully`);
      setrefresh2(!refresh2);
    } else {
      toast.error(response.data.error || 'An error occurred');
    }
  } catch (error) {
    console.error('Error removing student:', error);
    toast.error('An error occurred');
  }
}
else{
  toast.error("Name is incorrect")
}
}


  return (
    <>
      <div className="modal-wrapper" onClick={props.closeModal}></div>
      <div className="modal-container">
      <CloseIcon className='close-icon' onClick={props.closeModal} />
        <div className="">Removing "{props.id.subname}"  from the class</div>
        <h3>Enter the data that you want to edit</h3>
        <input  className='input'  type="text" value={name} onChange={(e)=>{setname(e.target.value)}}/><br/> 
       
        <button className='btn btn-outline-danger my-4 ' onClick={handleRemove}>Confirm</button>
      </div>
    </>
  );
};

export default RemoveSt;