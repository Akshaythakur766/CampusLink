import { AxiosResponse } from "axios";

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  ok: boolean;
}
import axios ,{AxiosInstance} from "axios";

export const ApiInstance:AxiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
  withCredentials: true,
});

ApiInstance.interceptors.response.use(
  (response) => {
    // Cast response to CustomAxiosResponse to include 'ok'
    const modifiedResponse = response as CustomAxiosResponse;
    modifiedResponse.ok = response.status >= 200 && response.status < 300;
    return modifiedResponse;
  },
  (error) => {
    return Promise.reject(error);
  }
);
