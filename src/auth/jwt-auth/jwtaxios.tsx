import axios from "axios";

const jwtAxios = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
  },
});
export const setToken = (token?: string, id?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
    id && localStorage.setItem("id", id);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
};

export default jwtAxios;
