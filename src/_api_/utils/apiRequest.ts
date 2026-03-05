import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  timeout: 30000,
});

export const apiRequest = async <T = unknown>(
  request: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const result: AxiosResponse<T> = await axiosInstance(request);
    return result;
  } catch (error) {
    const err = error as AxiosError;
    throw err; 
  }
};