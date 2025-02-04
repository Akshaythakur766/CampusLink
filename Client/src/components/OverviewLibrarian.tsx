import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './OverviewTeache.css';
import HEader from './HEader';

interface LibraryData{
    _id:string
    course:string
    name:string
    quantity:number
    author:string
}

const OverviewLibrarian = () => {
    const [books, setBooks] = useState<LibraryData[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string|null>(null);
    const [filteredBooks, setFilteredBooks] = useState<LibraryData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Get unique courses from books
    const uniqueCourses = [...new Set(books.map(book => book.course))];

    // Handle course selection
    const handleCourse = (course:string) => {
        setSelectedCourse(course);
        toast.success(`${course} books are displayed`);
        const filtered = books.filter(book => book.course === course);
        setFilteredBooks(filtered);
    };

    return (
        <div className='box'>
            <div className='divClassName'>
                <HEader name={"Dashboard"} />
                <div className='Main'>
                    <div className="overview">
                        <div className='greet' style={{ backgroundImage: `url(/greeting.svg)`, width: 390 }}>
                            <div className='text'>
                                <p className='text-h'>Hello Greetings!</p>
                                <p className='text-p'>Welcome, Librarian</p>
                                <p className='text-p'>Here's what's happening!</p>
                            </div>
                        </div>
                        <div className='percent'>
                            <p className='percent-p'>Books</p>
                            <span className='ml-3'>
                                {uniqueCourses.map(course => (
                                    <button key={course} className='btn btn-outline-success w-40 m-1 fw-bold' onClick={() => handleCourse(course)}>
                                        {course}
                                    </button>
                                ))}
                            </span>
                        </div>
                        {selectedCourse && (
                            <div className='percent'>
                                <p className='percent-p m-2'>{selectedCourse}</p>
                                <div className="table-container-2 mt-0">
                                    <table className="table-custom">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Quantity</th>
                                                <th>Author</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBooks.map(book => (
                                                <tr key={book._id}>
                                                    <td>{book.name}</td>
                                                    <td>{book.quantity}</td>
                                                    <td>{book.author}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewLibrarian;
