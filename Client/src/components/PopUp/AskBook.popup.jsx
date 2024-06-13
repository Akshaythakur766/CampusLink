import { useState } from 'react';
import axios from 'axios';
import './Popup.css';
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';

const AskPopUp = ({ book, onClose }) => {
    const [data, setData] = useState('');

    const handleDelete = () => {
        if (data === book.name) {
            axios.post('/askBook', { bookName: book.name, author: book.author })
                .then(({ data }) => {
                    if (data.message) {
                        onClose();
                        toast.success(data.message);
                    } else if (data.error) {
                        toast.error(data.error);
                        onClose();
                    }
                })
                .catch(error => {
                    toast.error('An error occurred');
                    onClose();
                });
        } else {
            toast.error("Wrong book name");
        }
    };

    return (
        <>
            <div className="modal-wrapper" onClick={onClose}></div>
            <div className="modal-container">
                <CloseIcon className='close-icon' onClick={onClose} />
                <p className='lh-base'>Requesting {book.name}</p>
                <h3>Do you really want to request the book? If yes, then type the book name and press confirm.</h3>
                <input 
                    className='input' 
                    type='text' 
                    value={data} 
                    onChange={(e) => setData(e.target.value)} 
                /><br/>
                <button className='btn bg-dark text-white my-4' onClick={handleDelete}>Confirm</button>
                <button className='btn bg-dark text-white mx-2' onClick={onClose}>Close</button>
            </div>
        </>
    );
};

export default AskPopUp;
