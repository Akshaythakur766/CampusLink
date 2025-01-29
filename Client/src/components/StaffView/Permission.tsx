import axios from "axios";
import HEader from "../HEader";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface listType {
  name: string;
  email: string;
  role: string;
  code: string;
  Used: boolean;
}
const Permission = () => {
  const [list, setList] = useState<listType[]>([]);
  const [code, setCode] = useState("Not generated");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/codeList");
        setList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, [refresh]);

  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
  });

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  };

  const generateCode = (name: string, role: string) => {
    const rolePart = role.substring(0, 4).toUpperCase();
    const namePart = name.substring(0, 4).toUpperCase();
    const otp = generateOtp();
    return `${rolePart}${namePart}${otp}`;
  };

  const handleCode = async () => {
    const { name, role, email } = data;
    const newCode = generateCode(name, role);
    try {
      const response = await axios.post("/addcode", {
        name,
        email,
        role,
        code: newCode,
      });
      if (response.data.success) {
        toast.success("Code Generated");
        setCode(newCode);
        setRefresh(!refresh);
      } else if (response.data.error) {
        toast.error(response.data.error || "Error! Please try Again");
      }
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Error generating code");
    }
  };

  return (
    <div className="divClassName">
      <HEader name={"CODE"} />
      <div className="percent">
        <p className="percent-p px-4 border-bottom">Add Member</p>
        <div className="flex">
          <div className="w-50">
            <label className="mx-5 fw-bold">Name:</label>
            <br />
            <input
              className="w-50 p-1 border-dark rounded border mx-5"
              name="name"
              type="text"
              placeholder="Rohan Kumar"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
              required
            />
            <br />
            <br />
            <label className="mx-5 fw-bold">Email:</label>
            <br />
            <input
              className="w-50 border rounded p-1 border-dark mx-5"
              placeholder="rohan@gmail.com"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
              required
            />
            <br />
            <br />
            <label className="mx-5 fw-bold">Role:</label>
            <br />
            <select
              name="role"
              className="w-50 border rounded p-1 border-dark mx-5"
              value={data.role}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
              required
            >
              <option value="">None</option>
              <option value="Teacher">Teacher</option>
              <option value="Librarian">Librarian</option>
            </select>
            <br />
            <button
              className="btn w-40 mx-5 my-4 bg-dark text-white"
              onClick={handleCode}
            >
              Generate Code
            </button>
          </div>

          <div>
            <p className="percent-p">Code:</p>
            <p className="mx-4 fw-bold">{code}</p>
          </div>
        </div>
      </div>

      <div className="percent">
        <p className="percent-p px-4 border-bottom">Code:</p>
        <table className="mx-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) &&
              list.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.code}</td>
                  <td>{item.Used ? "Registered" : "Not Registered"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permission;
