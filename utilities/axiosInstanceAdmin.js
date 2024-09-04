import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";


export const baseURL = 'https://fullstack-food-backend.onrender.com'
// export const baseURL = "http://localhost:4000";


let token = localStorage?.getItem("token")
// console.log('token in axiosInstance', token)


// console.log('tokenin axiosInstance: ', token)
const axiosInstanceAdmin = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
  // để sử dụng cookies cross orgin
  withCredentials: true,
  timeout: 5000,
});

axiosInstanceAdmin.interceptors.request.use(async (req) => {

  // if(!token){
  //   token = localStorage?.getItem("token") ? localStorage.getItem("token") : null
  //   req.headers.Authorization = `Bearer ${token}`;
  // }
  
  const user = jwtDecode(token)  

  if (req.url.includes("/api/refresh") || req.url.includes("/api/admin/login")) {
    return req;
  }

  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;
  else {
    try {
      // user.exp
      // console.log("isExpired else of aixosInstance", isExpired, user.exp);
      const response = await axiosInstance.get(`/api/refresh`);
      localStorage.setItem("token", response.data?.token);
      req.headers.Authorization = `Bearer ${response.data?.token}`;

      return req;
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return req;
    }
  }
});

export default axiosInstanceAdmin;
