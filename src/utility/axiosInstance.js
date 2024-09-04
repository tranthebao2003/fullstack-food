import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const baseURL = 'https://fullstack-food-backend.onrender.com'
// export const baseURL = "http://localhost:4000";


const token = localStorage?.getItem("token");
// console.log('token in axiosInstance', token)


// console.log('tokenin axiosInstance: ', token)
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
  // để sử dụng cookies cross orgin
  withCredentials: true,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(async (req) => {

  const user = token ? jwtDecode(token) : null;


  // ko interceptors nếu nó là refresh token
  // bởi vì refresh token để lấy token mới
  // và mình làm trước khi gửi request khác
  // nếu mà ko loại bỏ interceptors đối với
  // refresh token thì nó thành vòng lặp vô hạn
  if (req.url.includes("/api/refresh")) {
    return req;
  }

  if (!user) {
    return req;
  }

  /*dayjs.unix(user.exp): Tạo một đối tượng dayjs từ thời điểm exp (thời gian hết hạn) trong định
             dạng Unix timestamp (giây kể từ 1/1/1970).
            dayjs(): Tạo một đối tượng dayjs đại diện cho thời điểm hiện tại.
            .diff(dayjs()): Tính toán sự khác biệt giữa thời điểm hết hạn (user.exp) và thời điểm hiện tại, 
            trả về số mili giây.
            < 1: Kiểm tra xem sự khác biệt này có nhỏ hơn 1 mili giây không, tức là thời 
            điểm hiện tại đã vượt qua thời điểm hết hạn.
            Kết quả:
            true: Token đã hết hạn.
            false: Token chưa hết hạn. */
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

export default axiosInstance;
