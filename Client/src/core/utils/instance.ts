import axios ,{AxiosInstance} from "axios";

export const ApiInstance:AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});
