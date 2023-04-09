import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_SERVER_BASE_URL_AXIOS,
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