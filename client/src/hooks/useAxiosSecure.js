import axios from "axios";
import useUsers from "./useUsers";
import { useNavigate } from "react-router-dom";
const axiosSecure = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useUsers();
  const navigate = useNavigate();
  // interceptor
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      console.log("error axios interceptor", error.response);
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error)
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
