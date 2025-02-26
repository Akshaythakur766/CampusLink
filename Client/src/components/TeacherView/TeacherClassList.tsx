import { useEffect, useState, useContext } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditPopUp from "../PopUp/EditCLassname.popup";
import { UserContext } from "@CampusLink/core";
import DeletePopUp from "../PopUp/DeleteClass.popup";
import "./Teacherclass.css";
import HEader from "../HEader";
import { DataTypes } from "./TakeAttendance";
import { AddClassDrawer } from "../PopUp/AddClassDrawer";

interface PopupType {
  subname: string;
  id: number;
}

export const ClassList = () => {
  const provider = useContext(UserContext);
  const { refresh } = provider;
  const [openAddDrawer, setOpenAddDrawer] = useState(false);
  const [data, setData] = useState<DataTypes[]>([]);
  const [editPopup, setEditPopup] = useState<PopupType | null>(null);
  const [deletePopup, setDeletePopup] = useState<PopupType | null>(null);

  const openEditPopup = (subname: string, id: number) => {
    setEditPopup({ subname, id });
  };

  const openDeletePopup = (subname: string, id: number) => {
    setDeletePopup({ subname, id });
  };

  const closePopups = () => {
    setEditPopup(null);
    setDeletePopup(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/classList");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const displaydata = data.map((info, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{info.subj}</td>
      <td>{info.semester}</td>
      <td>{info.course}</td>
      <td>
        <button
          className="btn btn-outline-primary fw-bold mx-2"
          style={{ width: "50px" }}
          onClick={() => openEditPopup(info.subj, info._id)}
        >
          <EditNoteIcon />
        </button>
        {editPopup && (
          <EditPopUp
            closeModal={closePopups}
            subname={editPopup.subname}
            id={editPopup.id}
          />
        )}
        <button
          className="btn btn-outline-danger fw-bold"
          style={{ width: "50px" }}
          onClick={() => openDeletePopup(info.subj, info._id)}
        >
          <DeleteIcon />
        </button>
        {deletePopup && (
          <DeletePopUp
            closeModal={closePopups}
            subname={deletePopup.subname}
            id={deletePopup.id}
          />
        )}
      </td>
    </tr>
  ));

  return (
    <div className="divClassName">
      <HEader name={"Class List"} />

      <div className="class-flex">
        <div className="class-left">
          <div className="btn-addclass">
            <button
              className="btn buttonCol px-4 py-2 mt-2"
              onClick={() => setOpenAddDrawer(true)}
            >
              Add class
            </button>
          </div>
          <div className="in-between">List of all the classes.</div>
          <div className="table-container">
            <table className="table-custom ">
              <thead>
                <tr>6
                  <th>Sr.NO</th>
                  <th>Subject Name</th>
                  <th>Semester</th>
                  <th>Course</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{displaydata}</tbody>
            </table>
          </div>
        </div>
      </div>
      <AddClassDrawer open={openAddDrawer} setOpen={setOpenAddDrawer} />
    </div>
  );
};

export default ClassList;
