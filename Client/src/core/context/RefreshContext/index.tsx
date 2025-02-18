import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RefreshContextType } from "../types";

// Create the UserContext
const UserContext = createContext<RefreshContextType>({
  role: "",
  name: "",
  refresh: false,
  setrefresh: () => {},
  refresh1: false,
  setrefresh1: () => {},
  refresh2: false,
  setrefresh2: () => {},
  refresh3: false,
  setrefresh3: () => {},
});

// Define the UserContextProvider component
function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [refresh, setrefresh] = useState<boolean>(true);
  const [refresh1, setrefresh1] = useState<boolean>(true);
  const [refresh2, setrefresh2] = useState<boolean>(true);
  const [refresh3, setrefresh3] = useState<boolean>(true);

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/profile");
        setRole(response.data.role);
        setName(response.data.name);
      } catch (error) {
        console.log("error in useContext");
      }
    }
    fetchData();
  }, []);

  // Function to fetch user data

  return (
    <UserContext.Provider
      value={{
        role,
        refresh,
        setrefresh,
        refresh1,
        setrefresh1,
        refresh2,
        setrefresh2,
        refresh3,
        setrefresh3,
        name,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
