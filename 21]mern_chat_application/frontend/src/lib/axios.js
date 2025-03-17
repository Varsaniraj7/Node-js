import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:1008/api",
    withCredentials:true,
});