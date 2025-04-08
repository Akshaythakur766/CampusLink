import axios from "axios";
import { useState ,useEffect,useRef, ChangeEventHandler} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface RegistrationType {
  userType: string,
  firstName: string,
  lastName: string,
  email: string,
  phone?: string,
  birthDate?: string,
  password?: string,
  course?: string,
  semester?: string,
  rollNo?: string,
  code?: string
}

export const Registration = (props:any) => {
  const [userType, setUserType] = useState("student");
  const navigate=useNavigate();

  const registrationRef = useRef(null);
  const focusref = useRef(null);

  useEffect(() => {
    props.data(registrationRef);
    props.focus(focusref);
  }, []);

  const handleUserTypeChange = (event:React.ChangeEvent<HTMLInputElement> ) => {
    setUserType(event.target.value);
  };

  const [formData, setFormData] = useState<RegistrationType>({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    course: "",
    semester: "",
    rollNo: "",
    code: ""
  });

  const handleInputChange = (e:any ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStudentSubmit = async (e:any) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, birthDate, course, semester, rollNo, password } = formData; // Changed FormData to formData
    try {
      const response = await axios.post('/StudentRegister', {
        firstName, lastName, email, phone, birthDate, course, semester, rollNo, password, role: userType // Changed FormData to formData
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } 
      if(response.data.message) {
        setFormData({
          userType:'',
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          birthDate: "",
          course: "",
          semester: "",
          rollNo: "",
          password: ""
        });
        toast.success("Registered");
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeacherSubmit = async (e:any) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, birthDate, code, password } = formData; // Changed 'name' to 'firstName', removed 'role'
    try {
      const response = await axios.post('/TeacherRegister', {
        firstName, lastName, email, phone, birthDate, code, password, role: userType
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } 
      if(response.data.message) {
        setFormData({
          userType:'',
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          birthDate: "",
          code: "",
          password: ""
        });
        toast.success("Registered");
        navigate('/login')


      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e:any ) => {
    e.preventDefault();

    if (userType === "teacher") {
      handleTeacherSubmit(e);
    } else {
      handleStudentSubmit(e);
    }
  };

  return (
    <div className="  bg-opacity-5 lg:py-20 sm:py-10 max-sm:py-5 max-md:h-auto h-auto m-4 rounded-lg">
      <div className=" justify-center items-start" ref={registrationRef} >
        <p className=" flex justify-center font-font2 text-4xl max-sm:text-3xl max-lg:p-2 mt-5  ">
          Join CampusLInk Today!
        </p>{" "}
        <br />
        <p className="font-semibold xl:text-lg text-sm xl:px-56 sm:text-base sm:m-7  px-4 xl:flex xl:justify-center xl:mb-8  opacity-80 ">
          Unlock exclusive access to our innovative solutions by registering
          now. Stay updated with the latest news, features, and offers tailored
          just htmlFor you. Take the first step towards revolutionizing your
          educational experience. Sign up below!
        </p>
      </div>

      {/* form  */}

      <form
        id="registrationForm"
        className="max-sm:px-4 max-w-lg mx-auto max-sm:m-2 m-6 bg-slate-200 w-auto h-auto p-10 rounded-lg dark:bg-black "
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center gap-20 mb-4 ">
        
          <label className="dark:text-white">
            <input
              type="radio"
              value="student"
              checked={userType === "student"}
              onChange={handleUserTypeChange}
            />
            {"  "} Student
          </label>
          <label className="dark:text-white">
            <input
              type="radio"
              value="teacher"
              checked={userType === "teacher"}
              onChange={handleUserTypeChange}
            />
            {"  "}
            Teacher
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="firstName"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label
              ref={focusref}
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="lastName"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full  mb-5  group">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleInputChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            name="phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleInputChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="birthDate"
            id="birdth_date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleInputChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="birdth_date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
          >
            Date of birth
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInputChange}
            placeholder="•••••••••"
            required
          />
        </div>

        {userType === "student" && (
          <>
            <div>
              <label
                htmlFor="course"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white mb-3"
              >
                Select your course
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
              >
                <option>Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="rollNo"
                id="Rollno"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label
                htmlFor="rollNo"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Roll no.
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="semester"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Semester
              </label>
              <select
                id="semester"
                name="semester" // Add name attribute for identification in handleInputChange
                value={formData.semester} // Set value from state
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
              >
                <option>Semester</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
              </select>
            </div>
          </>
        )}
         {userType === "teacher" && (
          <>
           <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="code"
                id="code"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleInputChange}
                placeholder=" "
                required
              />
              <label
                htmlFor="rollNo"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Verification Code
              </label>
            </div>
          </>
          )}
        <button
          type="submit"
          className="dark:text-white btn text-background  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  rounded-xl text-base font-bold px-4 py-2 text-center mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;



