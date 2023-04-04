import axios from "axios";
import { baseURL } from "./config";

const api = axios.create({
  baseURL,
});

api.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    return res.data;
  } else {
    return null;
  }
}, error => {
  const errObj = error.response.data
  console.log('error status code', errObj.statusCode)
});

export default api;