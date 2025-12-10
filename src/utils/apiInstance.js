import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://109.73.195.51",
});

export default axiosInstance;
