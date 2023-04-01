import axios from "axios";

const jwtAxios = axios.create({
  baseURL: "https://toko.ox-sys.com",
  headers: {
    "Content-Type":
      "application/x-www-form-urlencoded'",
   },
});
export const setToken = (token?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
   } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
   }
};

export default jwtAxios;
