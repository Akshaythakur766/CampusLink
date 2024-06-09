import { useState,useContext } from 'react'
import axios from 'axios'
import './Popup.css'
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast'

import { UserContext } from '../../context/Refresh'


const EditPopUp=(props)=>{
   const [data,setData]=useState({
    name:'',
    semester:'',
    course:'',
    oldname:''
   })

   const handleChange = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    });
};


   const provider=useContext(UserContext)
   const {refresh,setrefresh}=provider
    const handleedit=()=>{
        const {name,semester,course,oldname}=data
        if(oldname==props.subname){
            axios.post('/editClass',{id:props.id,name,semester,course}).then(({data})=>{
                if(data.message){
                    props.closeModal();
                    toast.success(data.message)
                    
                  setrefresh(!refresh)
                }
                else if(data.error){
                    toast.error('server error !')
                    props.closeModal();
                 
                }
            })
        }
        else{
            toast.error("Wrong Name")
        }
    }

    return(
        <>
        <div className="modal-wrapper" onClick={props.closeModal}></div>
        <div className="modal-container">
        <CloseIcon className='close-icon' onClick={props.closeModal} />
            <p>Editing {props.subname}</p>
            <h3>Enter the new Subject Name to edit</h3>
            <input type="text" name="name" value={data.name} onChange={handleChange} placeholder='New Subject Name'/><br/><br/>

            <h5>Enter the Old Subject Name to Confirm</h5>
            <input type="text" name="oldname"  placeholder='Old Subject Name'value={data.oldname} onChange={handleChange}
             /><br/><br/>
            <button className='btn bg-primary text-white fw-bold ' onClick={handleedit}>Confirm</button>
            <button className='btn bg-dark text-white mx-2' onClick={props.closeModal}>Close</button>

        </div>
        
        </>
    )
}

export default EditPopUp