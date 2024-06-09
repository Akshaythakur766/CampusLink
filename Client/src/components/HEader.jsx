import   PermIdentityIcon  from '@mui/icons-material/AccountCircle';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
const HEader = ({name}) => {
const [username,setname]=useState('')

    useEffect(() => {
        const fetchdata=async()=>{
          try {
            const response=await axios.get('/profile')
            setname(response.data.name)
          } catch (error) {
            console.log(error)
          }
        }
        fetchdata()
    },[])
  return (
    <div className='paragraph'>
    <h2>{name}</h2>
      
    <span className='profile'>
      {/* <span> <FaMoon/> </span> */}
      <span> {username}< PermIdentityIcon /> </span>
    </span>
  </div>
  )
}   

export default HEader