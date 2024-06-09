import { createContext, useEffect, useState } from "react";
import axios from 'axios';

// Create the UserContext
export const UserContext = createContext(null);

// Define the UserContextProvider component
export function UserContextProvider({ children }) {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [refresh, setrefresh] = useState(true);
    const [refresh1, setrefresh1] = useState(true);
    const [refresh2, setrefresh2] = useState(true);
    const [refresh3, setrefresh3] = useState(true);

    // Fetch data when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/profile');
                setRole(response.data.role);
                setName(response.data.name);
            } catch (error) {
                console.log("error in useContext")
            }
        }
        fetchData();
    }, []);

    // Function to fetch user data
   
    return (
        <UserContext.Provider value={{ role,  refresh, setrefresh, refresh1, setrefresh1, refresh2, setrefresh2, refresh3, setrefresh3, name,  }}>
            {children}
        </UserContext.Provider>
    );
}
