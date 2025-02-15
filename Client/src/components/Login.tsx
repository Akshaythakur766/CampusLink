import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';


export const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const response = await axios.post('/login', { email, password });

      if (response.data && response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          email: '',
          password: ''
        });
        toast.success("Login successful");
        if(response.data.role==='student'){
        navigate('/dashboard/overview');}
        if(response.data.role==='teacher'){
          navigate('/dashboard/overviewTeacher');
        }
        if(response.data.role==='staff'){
          navigate('/dashboard/overviewSt');
        }
        if(response.data.role==='librarian'){
          navigate('/dashboard/overviewLib');
        }
       

      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="sm:m-24 max-sm:mt-14 max-sm:p-5">
      <h1 className="font-font2 text-3xl text-center mb-10">LOG-IN</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-slate-50 p-5 rounded-lg dark:bg-black">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium bg text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Campuslink@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button type="submit" className="buttonCol rounded-xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
