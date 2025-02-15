import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useContext, useState } from 'react';
import {toast} from 'react-hot-toast';
import { UserContext } from '@CampusLink/core';
import './Popup.css';


const DeletePopUp=(props)=>{
   const [data,setdata]=useState('')

   const provider=useContext(UserContext)
   const {refresh,setrefresh}=provider
    const handleDelete=()=>{
        if(data==props.subname){
            axios.post('/deleteClass',{id:props.id}).then(({data})=>{
                if(data.message){
                    props.closeModal();
                    toast.success(data.message)
                  setrefresh(!refresh)
                }
                else if(data.error){
                    toast.error('Class not found')
                    props.closeModal();
                 
                }
            })
        }
        else{
            toast.error("Wrong Classname")
        }
    }

    return(
        <>
        <div className="modal-wrapper" onClick={props.closeModal}></div>
        <div className="modal-container">
        <CloseIcon className='close-icon' onClick={props.closeModal} />
            <p>Deleting {props.subname}</p>
            <h3>Do you really want to delete the class If yes then type the classname and press confirm</h3>
            <input className='input' type='text' value={data} onChange={(e)=>{setdata(e.target.value)}}/><br/>
            <button className='btn bg-dark text-white my-4 ' onClick={handleDelete}>Confirm</button>
            <button className='btn bg-dark text-white mx-2' onClick={props.closeModal}>Close</button>

        </div>
        
        </>
    )
}

export default DeletePopUp