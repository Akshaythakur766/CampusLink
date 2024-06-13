import { useEffect, useState } from 'react';
import HEader from './HEader';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import toast from 'react-hot-toast';
import AskPopUp from './PopUp/AskBook.popup';
import { useNavigate } from 'react-router-dom';

const Library = () => {
    const [books, setBooks] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filteredRecommendedCoursesBooks, setFilteredRecommendedCoursesBooks] = useState({});
    const [showRecommended, setShowRecommended] = useState(false);
    const [showAskPopUp, setShowAskPopUp] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const Navigate=useNavigate()
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

    const handleRecommended = async () => {
        try {
            const response = await axios.get('/recommendbooks');
            filterRecommendedBooks(response.data.subject);
            filterRecommendedCoursesBooks(response.data.course);
            setShowRecommended(true);
            toast.success("Recommended books are displayed");
        } catch (error) {
            console.error('Error fetching recommended books:', error);
        }
    };

    const filterRecommendedBooks = (subjects) => {
        const filtered = books.filter(book => subjects.includes(book.name));
        const uniqueBooks = filtered.filter((book, index, self) =>
            index === self.findIndex((b) => b.name === book.name)
        );
        setFilteredBooks(uniqueBooks.length > 0 ? uniqueBooks : [{ name: "No Book found as same of your subjects", author: "" }]);
    };

    const filterRecommendedCoursesBooks = (courses) => {
        const courseBooks = courses.reduce((acc, course) => {
            const filtered = books.filter(book => book.course === course);
            acc[course] = filtered.length > 0 ? filtered : [{ name: "No Books found for your course ", author: "" }];
            return acc;
        }, {});
        setFilteredRecommendedCoursesBooks(courseBooks);
    };

    // Get unique courses from books
    const uniqueCourses = [...new Set(books.map(book => book.course))];

    // Handle course selection
    const handleCourse = (course) => {
        setSelectedCourse(course);
        setShowRecommended(false);
        toast.success(`${course} books are displayed`);
        const filtered = books.filter(book => book.course === course);
        setFilteredBooks(filtered);
    };

    // Handle Ask button click
    const handleAskClick = (book) => {
        setSelectedBook(book);
        setShowAskPopUp(true);
    };

    const handleAskbutton=()=>{
        Navigate('/dashboard/askedbooks')
    }
    // Close AskPopUp
    const closeAskPopUp = () => {
        setShowAskPopUp(false);
        setSelectedBook(null);
    };

    return (
        <div className='divClassName'>
            <HEader name={'Books'} />
            <div className='percent'>
            <p className="percent-p d-flex justify-content-between align-items-center">
                    Select the Course
                    <button className="btn bg-primary mx-5 text-white" onClick={handleAskbutton}>Requested Books</button>
                </p>
                <span className='ml-3'>
                    <button className='btn btn-outline-success w-30 m-1 fw-bold' onClick={handleRecommended}>
                        Recommended <StarIcon className='pb-1 mx-2' />
                    </button>
                    {uniqueCourses.map(course => (
                        <button key={course} className='btn btn-outline-primary w-40 mx-1 fw-bold' onClick={() => handleCourse(course)}>
                            {course}
                        </button>
                    ))}
                </span>
            </div>
            {selectedCourse && !showRecommended && (
                <div className='percent'>
                    <p className='percent-p m-2'>{selectedCourse}</p>
                    <div className="table-container mt-0">
                        <table className="table-custom">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map(book => (
                                    <tr key={book._id}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            <button className='btn bg-primary text-white' onClick={() => handleAskClick(book)}>Request</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showRecommended && (
                <div className='percent'>
                    <p className='percent-p m-2'> Books by Subject</p>
                    <div className="table-container mt-0">
                        <table className="table-custom">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            <button className='btn bg-primary text-white' onClick={() => handleAskClick(book)}>Request</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {Object.keys(filteredRecommendedCoursesBooks).map(course => (
                        <div key={course}>
                            <p className='percent-p m-2'>{course}</p>
                            <div className="table-container mt-0">
                                <table className="table-custom">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(filteredRecommendedCoursesBooks[course]) && filteredRecommendedCoursesBooks[course].map((book, index) => (
                                            <tr key={index}>
                                                <td>{book.name}</td>
                                                <td>{book.author}</td>
                                                <td>
                                                    <button className='btn bg-primary text-white' onClick={() => handleAskClick(book)}>Request</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showAskPopUp && selectedBook && (
                <AskPopUp book={selectedBook} onClose={closeAskPopUp} />
            )}
        </div>
    );
};

export default Library;
