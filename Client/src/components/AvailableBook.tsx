import axios from "axios";
import HEader from "./HEader";
import { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

interface ListType {
  _id: number;
  role: string;
  name: string;
  bookName: string;
  semester: string;
  author: string;
  available: boolean;
  course: string;
}

export const AvailableBook = () => {
  const [list, setList] = useState<ListType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/reqlist");
        setList(response.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAvailable = async (id: number, status: boolean) => {
    try {
      const response = await axios.post("/changeAvailable", {
        id,
        available: status,
      });
      if (response.data.message === "success") {
        toast.success("Response Sent");
        setList((prevList: any) =>
          prevList.map((item: any) =>
            item._id === id ? { ...item, available: status } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Error!");
    }
  };

  return (
    <div className="divClassName">
      <HEader name="Books" />
      <div className="percent">
        <p className="percent-p">Requested Books:</p>
        <ul>
          {list.map((item, index) => (
            <li key={index} className="mb-2 mx-4">
              {item.role === "Student" ? (
                <>
                  {item.name && item.course && item.semester && (
                    <span className="text-primary">{`${item.name}-${item.course}-${item.semester}`}</span>
                  )}
                  <span> - </span>
                  <b>{item.bookName}</b> by <b>{item.author}</b>{" "}
                  <span className="text-success">({item.role})-</span>
                </>
              ) : (
                <>
                  {item.name && (
                    <span className="text-primary">{`${item.name}`}</span>
                  )}
                  <span> - </span>
                  <b>{item.bookName}</b> by <b>{item.author}</b>{" "}
                  <span className="text-success">({item.role})-</span>
                </>
              )}
              {item.available === true ? (
                <span className="text-success fw-bold ml-2">Available</span>
              ) : item.available === false ? (
                <span className="text-danger fw-bold ml-2">Unavailable</span>
              ) : (
                <>
                  <button
                    className="btn btn-success ml-2"
                    onClick={() => handleAvailable(item._id, true)}
                  >
                    <DoneIcon />
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleAvailable(item._id, false)}
                  >
                    <CloseIcon />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableBook;
