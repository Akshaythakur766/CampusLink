import axios from "axios";
import HEader from "./HEader";
import { useState, useEffect } from "react";

const AskedBook = () => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/askedbooks');
                if (response.data.list && response.data.list.length > 0) {
                    setList(response.data.list);
                } else {
                    setError("No books requested");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Error fetching data");
            }
        };

        fetchData();
    }, []);

    const getNote = (item) => {
        if (item.available === true) {
            return "Book is available. Issue the book from the library within two days";
        } else if (item.available === false) {
            return "Book is Unavailable. Request again after a week";
        } else {
            return "Book status not updated yet";
        }
    };

    return (
        <div className="divClassName">
            <HEader name="Books" />
            <div className="percent">
                <p className="percent-p">Books:</p>

                {error ? (
                    <p className="text-danger mx-4">{error}</p>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Note</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr key={index}>
                                    <td><b>{item.bookName}</b></td>
                                    <td><b>{item.author}</b></td>
                                    <td>{getNote(item)}</td>
                                    <td>
                                        <span
                                            style={{
                                                color: item.available === undefined ? 'blue' : item.available ? 'green' : 'red',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {item.available === undefined ? 'Requested' : item.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AskedBook;
