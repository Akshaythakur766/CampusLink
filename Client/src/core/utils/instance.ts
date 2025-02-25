import axios ,{AxiosInstance} from "axios";

export const ApiInstance:AxiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
  withCredentials: true,
});
