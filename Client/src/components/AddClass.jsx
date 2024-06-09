import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'
const Class = () => {
    const [data, setData] = useState({
        subj: '',
        course: '',
        semester: ''
    });

    const [student, setStudent] = useState([])

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
            }
            else if (response.data.message) {
                toast.success("Class Added")
                
                setData({
                    subj: '',
                    course: '',
                    semester: '',
                });
            }
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Subject Name:</h2>
            <input type="text" name="subj" value={data.subj} onChange={handleChange} />
            <h2>Class:</h2>
            <input type="text" name="course" value={data.course} onChange={handleChange} />
            <h2>Semester:</h2>
            <input type="text" name="semester" value={data.semester} onChange={handleChange} />
            <button onClick={CreateClass}>Add class</button>


        </div>
    );
};

export default Class;
