import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HEader from './HEader';
import greeting from '../assets/greeting.svg';
import './OverviewTeache.css';

const OverviewStaff = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/teacherList');
                setList(response.data.list);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='box'>
            <div className='divclassName'>
                <HEader name={"Dashboard"} />
                <div className='Main'>
                    <div className="overview">
                        <div className='greet' style={{ backgroundImage: `url(${greeting})`, width: 390 }}>
                            <div className='text'>
                                <p className='text-h'>Hello Greetings!</p>
                                <p className='text-p'>Welcome {name}</p> {/* Ensure 'name' variable is defined */}
                                <p className='text-p'>Here's what's happening !</p>
                            </div>
                        </div>
                        <div className='percent'>
                            <p className='percent-p'>Teacher List</p>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((teacher, index) => (
                                        <tr key={index}>
                                            <td>{`${teacher.firstName} ${teacher.lastName}`}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.code === 'LIBRRAM8016' ? 'Librarian' : 'Teacher'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="Notification">
                        Notification
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewStaff;
